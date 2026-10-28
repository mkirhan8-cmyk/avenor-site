# waves-front: штрих волн сцены поверх нижней части корпуса (судно «сидит» в воде)
import numpy as np, json
from PIL import Image
BG=np.array([0x14,0x18,0x1C],float);LINE=np.array([0xE9,0xE4,0xD8],float)
pos=json.load(open('positions.json'));px,py,nw,nh=pos['ship_px_py_nw_nh'];WL=pos['waterline_y'];X0=pos['phone_crop_x0']
sc=np.array(Image.open('scene-no-ship-2560x1400.png').convert('RGB'),float)
t=np.clip(((sc-BG)@(LINE-BG))/((LINE-BG)@(LINE-BG)),0,1)      # штрих сцены (0..1)
rng=np.random.default_rng(3)
H,W=t.shape
x=np.arange(W)
# неровная верхняя кромка полосы: волна вокруг WL-8, амплитуда 4 px
edge=WL-9+3.5*np.sin(x/37.0)+2.5*np.sin(x/13.0+1.3)+rng.normal(0,0.6,W)
y=np.arange(H)[:,None]
band=np.clip((y-edge[None,:])/3.0,0,1)                          # плавный верх
band*=np.clip((WL+7-y)/3.0,0,1)                                # низ: под ватерлинией сцена и так лежит
xm=np.clip((x-(px-30))/30.0,0,1)*np.clip(((px+nw+30)-x)/30.0,0,1)
a=t*band*xm[None,:]
# добавочные штрихи волн в полосе корпуса (того же вида: тонкие волнистые, 2 px)
from PIL import ImageDraw
S=Image.new('L',(W,H),0);d=ImageDraw.Draw(S)
for row in range(WL-13,WL+2,3):
    xx=px-25+rng.integers(0,30)
    while xx<px+nw+25:
        l=int(rng.integers(40,110));ph=rng.uniform(0,6.28);amp=rng.uniform(1.2,2.6)
        pts=[(xx+i,row+amp*np.sin(i/22.0+ph)) for i in range(0,l,4)]
        d.line(pts,fill=int(rng.integers(200,256)),width=2)
        xx+=l+int(rng.integers(10,40))
S=np.array(S,float)/255
a=np.clip(a+0.7*S*np.clip((y-(WL-14))/3.0,0,1)*xm[None,:],0,1)
out=np.zeros((H,W,4),np.uint8);out[...,:3]=LINE.astype('uint8');out[...,3]=(a*255).astype('uint8')
im=Image.fromarray(out,'RGBA');im.save('waves-front-2560x1400.png');im.crop((X0,0,X0+1170,1400)).save('waves-front-phone-1170x1400.png')
base=Image.open('scene-no-ship-2560x1400.png').convert('RGBA')
for n in ('ship-2560x1400.png','waves-front-2560x1400.png','lamp-glow-2560x1400.png'):base.alpha_composite(Image.open(n))
rgb=base.convert('RGB');rgb.save('preview-composite-2560x1400.png');rgb.crop((X0,0,X0+1170,1400)).save('preview-composite-phone-1170x1400.png')
rgb.crop((1100,1000,2000,1330)).resize((1800,660),Image.LANCZOS).save('/tmp/claude-99/-home-claude--claude-telegram-artdir/3b42c4e5-efc4-4997-8dd4-40069ba50c30/scratchpad/shipzoom.png')
