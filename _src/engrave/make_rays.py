# rays: гравированные лучи из линзы фонаря: тонкие штрихи веером, золото + цвет гравюры; не пересекают шпиль и ванты (маска по линиям сцены)
import numpy as np, json
from PIL import Image, ImageDraw, ImageFilter
BG=np.array([0x14,0x18,0x1C],float);LINE=np.array([0xE9,0xE4,0xD8],float);GOLD=(0xD9,0xA4,0x41)
pos=json.load(open('positions.json'));lx,ly=pos['lamp_xy_2560'];X0=pos['phone_crop_x0']
SS=3;W,H=2560,1400
sc=np.array(Image.open('scene-no-ship-2560x1400.png').convert('RGB'),float)
t=np.clip(((sc-BG)@(LINE-BG))/((LINE-BG)@(LINE-BG)),0,1)
block=Image.fromarray((t>0.12).astype('uint8')*255).filter(ImageFilter.MaxFilter(9))   # линии башни, шпиля, вант + запас 4 px
block=np.array(block)>0
rng=np.random.default_rng(11)
img=Image.new('RGBA',(W*SS,H*SS),(0,0,0,0));d=ImageDraw.Draw(img)
MAXLEN=0.40*W    # ≤40% ширины кадра
def ray(side,ang,length,col,wid,a0):
    ca,sa=np.cos(np.radians(ang)),np.sin(np.radians(ang))
    r=12.0;seg=int(rng.integers(16,30));gap=int(rng.integers(5,12))
    while r<length:
        r2=min(r+seg,length);k=1-r/length
        a=int(255*a0*(0.15+0.85*k**1.3))
        p=[(lx+side*r*ca,ly+r*sa),(lx+side*r2*ca,ly+r2*sa)]
        d.line([(p[0][0]*SS,p[0][1]*SS),(p[1][0]*SS,p[1][1]*SS)],fill=col+(a,),width=max(1,int(wid*SS*(0.35+0.9*k))))
        r=r2+gap;seg=int(rng.integers(16,30));gap=int(rng.integers(5,12))
for side in (-1,1):
    angs=np.linspace(-11,11,13)
    for i,ang in enumerate(angs):
        c=abs(ang)/11.0
        length=MAXLEN*(1.0-0.55*c)*rng.uniform(0.88,1.0)
        gold=c<0.5
        ray(side,ang,length,GOLD if gold else tuple(LINE.astype(int)),2.4 if gold else 1.6,0.95 if gold else 0.55)
im=img.resize((W,H),Image.LANCZOS);a=np.array(im)
al=a[...,3].astype(float)/255;al[block]=0                                      # не пересекать линии сцены
a[...,3]=(al*255).astype('uint8');a[al==0,:3]=0
out=Image.fromarray(a,'RGBA');out.save('rays-2560x1400.png');out.crop((X0,0,X0+1170,1400)).save('rays-phone-1170x1400.png')
base=Image.open('scene-no-ship-2560x1400.png').convert('RGBA')
for n in ('ship-2560x1400.png','waves-front-2560x1400.png','lamp-glow-2560x1400.png','rays-2560x1400.png'):base.alpha_composite(Image.open(n))
rgb=base.convert('RGB');rgb.save('preview-composite-2560x1400.png');rgb.crop((X0,0,X0+1170,1400)).save('preview-composite-phone-1170x1400.png')
rgb.crop((400,0,1800,700)).save('/tmp/claude-99/-home-claude--claude-telegram-artdir/3b42c4e5-efc4-4997-8dd4-40069ba50c30/scratchpad/rayszoom.png')
print('ok',lx,ly)
