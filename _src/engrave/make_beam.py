# beam-cone: вращающийся луч, один слой. Центр вращения = центр картинки (R,R); конус направлен вправо (+x).
import numpy as np
from PIL import Image, ImageDraw
R=1400;SS=2;N=2*R
GOLD=(0xD9,0xA4,0x41);CREAM=(0xE9,0xE4,0xD8)
rng=np.random.default_rng(21)
img=Image.new('RGBA',(N*SS,N*SS),(0,0,0,0));d=ImageDraw.Draw(img)
HALF=9.0;LEN=1370
def ray(ang,length,col,wid,a0):
    ca,sa=np.cos(np.radians(ang)),np.sin(np.radians(ang))
    r=14.0
    while r<length:
        seg=rng.integers(18,36);gap=rng.integers(5,12);r2=min(r+seg,length);k=1-r/length
        a=int(255*a0*(0.32+0.68*k**1.1))
        wd=max(1,int(wid*SS*(0.35+0.9*k)))
        d.line([((R+r*ca)*SS,(R+r*sa)*SS),((R+r2*ca)*SS,(R+r2*sa)*SS)],fill=col+(a,),width=wd)
        r=r2+gap
for ang in np.linspace(-HALF,HALF,21):
    c=abs(ang)/HALF
    ray(ang+rng.uniform(-0.15,0.15),LEN*(1.0-0.30*c)*rng.uniform(0.92,1.0),GOLD if c<0.62 else CREAM,2.4 if c<0.62 else 1.5,0.95 if c<0.62 else 0.5)
out=img.resize((N,N),Image.LANCZOS)
out.save('beam-cone.png');out.save('/home/claude/dev/avenor-site/onepage-foot/assets/beam-cone.webp',lossless=True,quality=100,method=6)
print(out.size)
