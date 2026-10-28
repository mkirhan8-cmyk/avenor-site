# Контейнеровоз линиями (контур + штриховка), рисую сам по силуэту gemini-K1.jpg; один цвет, без серых заливок
import numpy as np, json, random
from PIL import Image, ImageDraw
random.seed(7)
BG=(0x14,0x18,0x1C);LINE=(0xE9,0xE4,0xD8)
pos=json.load(open('positions.json'));px,py,nw,nh=pos['ship_px_py_nw_nh'];WL=pos['waterline_y'];X0=pos['phone_crop_x0']
SS=4;sx=nw/1620.0;sy=nh/364.0
def P(x,y):return ((x-195)*sx*SS,(y-330)*sy*SS)
W,H=nw*SS,nh*SS
ln=Image.new('L',(W,H),0);fl=Image.new('L',(W,H),0)
dl=ImageDraw.Draw(ln);df=ImageDraw.Draw(fl)
LW=int(1.6*SS)       # линия ~1,6 px
def line(pts,w=LW,a=255):dl.line([P(*p) for p in pts],fill=a,width=w,joint='curve')
def poly(pts):df.polygon([P(*p) for p in pts],fill=255)
# корпус
hull=[(200,600),(1640,600),(1705,586),(1812,552),(1800,640),(1770,676),(1740,694),(300,694),(245,688),(210,650)]
poly(hull);line(hull[0:7]);line(hull[7:]+[hull[0]])
# штриховка борта: толщина штриха = тень (темнее у носа, кормы и ватерлинии), плавный переход
def sm(t):t=min(max(t,0),1);return t*t*(3-2*t)
for y in range(607,692,7):
    v=(y-607)/85.0
    x=215+v*30
    xend=1795-v*60
    while x<xend:
        seg=18
        xm=x+seg/2
        stern=1-sm((xm-215)/330);bow=sm((xm-1330)/430)
        dark=max(stern,bow)*0.9+0.35*v+0.1
        w=0.45+1.05*dark
        if w>0.7:
            dl.line([P(x,y),P(min(x+seg+1,xend),y)],fill=255,width=max(1,int(w*SS)))
        x+=seg
line([(205,672),(1760,672)],w=int(1.2*SS))
line([(200,595),(1650,595)],w=int(1.0*SS))   # леера
# контейнеры: (x0,x1,top)
stacks=[(205,305,455),(505,607,457),(618,720,457),(733,832,457),(848,946,457),(965,1062,481),(1080,1177,455),(1193,1295,481),(1306,1410,481),(1422,1526,505),(1530,1585,505),(1590,1645,510)]
for x0,x1,top in stacks:
    poly([(x0,top),(x1,top),(x1,592),(x0,592)])
    line([(x0,top),(x1,top),(x1,592),(x0,592),(x0,top)])
    y=top+24
    while y<590:
        line([(x0,y),(x1,y)],w=int(1.2*SS));y+=24
    x=x0+9
    while x<x1-3:
        line([(x,top+3),(x,589)],w=int(0.8*SS),a=150);x+=9
# надстройка, труба, мачты
poly([(365,478),(492,478),(492,592),(365,592)]);line([(365,478),(492,478),(492,592),(365,592),(365,478)])
poly([(388,452),(470,452),(470,478),(388,478)]);line([(388,452),(470,452),(470,478),(388,478),(388,452)])
for yy in (500,522,544,566):
    line([(365,yy),(492,yy)],w=int(1.0*SS),a=200)
    for xx in range(378,486,16):
        dl.ellipse([P(xx-2,yy+7),P(xx+2,yy+11)],fill=255)
for xx in range(396,466,14):
    dl.rectangle([P(xx,458),P(xx+8,470)],outline=255,width=int(0.9*SS))
poly([(305,425),(352,425),(352,592),(305,592)]);line([(305,425),(352,425),(352,592),(305,592),(305,425)])
line([(300,420),(357,420),(352,430)]);line([(305,450),(352,450)],w=int(1.0*SS))
line([(412,452),(412,355)]);line([(400,382),(436,382)]);line([(436,378),(436,452)],w=int(1.0*SS))
line([(412,392),(480,452)],w=int(0.9*SS));line([(1720,550),(1720,465)]);line([(1720,470),(1805,553)],w=int(0.9*SS));line([(1711,478),(1729,478)])
# в масштаб, подготовка слоёв
ln=ln.resize((nw,nh),Image.LANCZOS);fl=fl.resize((nw,nh),Image.LANCZOS)
L=np.zeros((1400,2560));F=np.zeros((1400,2560))
L[py:py+nh,px:px+nw]=0.82*np.array(ln,float)/255;F[py:py+nh,px:px+nw]=np.array(fl,float)/255
# отражение штрихами: по строкам, штрихи внутри силуэта, без размытия
R=Image.new('L',(2560,1400),0);dr=ImageDraw.Draw(R);depth=70
sil=(F>0.5)
for k in range(3,depth,4):
    src=WL-1-int(k*1.0)
    cols=np.where(sil[src])[0]
    if len(cols)==0:continue
    a=int(255*(1-k/depth)**1.2*0.85);x=cols.min()+random.randint(0,8)
    while x<cols.max():
        l=random.randint(14,46)
        if sil[src,min(x+l//2,2559)]:dr.line([(x,WL+k),(min(x+l,cols.max()),WL+k)],fill=a,width=2)
        x+=l+random.randint(8,22)
# осадка: тень штрихом под ватерлинией по длине корпуса, плотнее у носа и кормы
xs_=np.where(sil[WL-3])[0]
for k in range(0,9,2):
    x=xs_.min()-6;a_=int(255*(0.75-k*0.06))
    while x<xs_.max()+6:
        l=int(random.randint(10,26));
        t=(x-xs_.min())/max(1,xs_.max()-xs_.min());dens=0.35+0.65*max(abs(t-0.5)*2,0.0)**1.5
        if random.random()<dens:dr.line([(x,WL+k),(x+l,WL+k)],fill=a_,width=2)
        x+=l+random.randint(3,10)
# кильватер за кормой (слева): расходящиеся короткие штрихи
for i,k in enumerate(range(2,22,3)):
    spread=i*2.2;x=xs_.min()-10-random.randint(0,12)
    a_=int(255*max(0.15,0.8-i*0.1));n_=int(max(2,4-i//3))
    for j in range(n_):
        l=random.randint(26,70)
        dr.line([(x-l,WL+k+spread*0.3),(x,WL+k+spread*0.3)],fill=a_,width=2);x-=l+random.randint(14,40)
# бурун у носа: расходящиеся короткие штрихи впереди форштевня (справа)
xb=xs_.max()
for i,k in enumerate(range(-3,13,2)):
    l=random.randint(18,40)-i;a_=int(255*max(0.25,0.85-i*0.07))
    dr.line([(xb-4+i*3,WL+k),(xb-4+i*3+l,WL+k)],fill=a_,width=2)
Ra=np.array(R,float)/255
la=np.clip(1-(1-L)*(1-Ra),0,1);fm=np.clip(F,0,1)
fa=np.maximum(fm,la)
rgb=np.array(BG,float)*(fm[...,None]*(1-la[...,None]))+np.array(LINE,float)*la[...,None]
col=np.where(fa[...,None]>0,rgb/np.maximum(fa[...,None],1e-6),0)
out=np.zeros((1400,2560,4),np.uint8);out[...,:3]=np.clip(col,0,255).astype('uint8');out[...,3]=(fa*255).astype('uint8')
im=Image.fromarray(out,'RGBA');im.save('ship-2560x1400.png');im.crop((X0,0,X0+1170,1400)).save('ship-phone-1170x1400.png')
sc=Image.open('scene-no-ship-2560x1400.png').convert('RGBA');sc.alpha_composite(im);sc.alpha_composite(Image.open('lamp-glow-2560x1400.png'))
sc.convert('RGB').save('preview-composite-2560x1400.png');sc.convert('RGB').crop((X0,0,X0+1170,1400)).save('preview-composite-phone-1170x1400.png')
sc.convert('RGB').crop((1150,1000,1950,1330)).resize((1600,660),Image.LANCZOS).save('/tmp/claude-99/-home-claude--claude-telegram-artdir/3b42c4e5-efc4-4997-8dd4-40069ba50c30/scratchpad/shipzoom.png')
