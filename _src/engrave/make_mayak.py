import numpy as np,os
from PIL import Image
from PIL import ImageFilter,ImageDraw
class ndi:
    @staticmethod
    def maximum_filter(a,size):
        im=Image.fromarray(np.clip(a,0,255).astype('uint8'));return np.array(im.filter(ImageFilter.MaxFilter(size|1)),float)
    @staticmethod
    def gaussian_filter(a,sigma):
        if a.max()<=1.0001 and a.dtype!=np.uint8:
            im=Image.fromarray((np.clip(a,0,1)*255).astype('uint8')).filter(ImageFilter.GaussianBlur(sigma));return np.array(im,float)/255
        im=Image.fromarray(np.clip(a,0,255).astype('uint8')).filter(ImageFilter.GaussianBlur(sigma));return np.array(im,float)
    @staticmethod
    def binary_dilation(b,iterations=1):
        im=Image.fromarray((b*255).astype('uint8')).filter(ImageFilter.MaxFilter(2*iterations+1));return np.array(im)>0
    @staticmethod
    def binary_opening(b,iterations=1):
        im=Image.fromarray((b*255).astype('uint8')).filter(ImageFilter.MinFilter(2*iterations+1)).filter(ImageFilter.MaxFilter(2*iterations+1));return np.array(im)>0
    @staticmethod
    def binary_fill_holes(b):
        im=Image.fromarray((b*255).astype('uint8'));h,w=b.shape
        pad=Image.new('L',(w+2,h+2),0);pad.paste(im,(1,1))
        ImageDraw.floodfill(pad,(0,0),128,thresh=0)
        a=np.array(pad)[1:-1,1:-1];return a!=128

import json
BG=np.array([0x14,0x18,0x1C],float);LINE=np.array([0xE9,0xE4,0xD8],float);FIRE=np.array([0xD9,0xA4,0x41],float)
def alpha(src,gamma=0.95):
    a=np.array(Image.open(src).convert('L'),float)
    paper=ndi.gaussian_filter(ndi.maximum_filter(a,size=41),25)
    ink=np.percentile(a,0.5)
    al=np.clip((paper-a)/np.maximum(paper-ink,30),0,1)
    al=np.where(al<0.06,0,al)**gamma
    return al
K=1.376   # display 2000 -> original 2752
# --- scene
a=alpha('gemini-M4.jpg');h,w=a.shape;ch=int(round(w*1400/2560));top=h-ch
a[int(307*K):int(325*K),int(773*K):int(793*K)]=0   # иллюминатор на стволе (белая точка)

# мол: убрать псевдо-буквы нейросети, заменить чистой каменной штриховкой (координаты — кроп 900..1360 x 690..830 дисплея, ×3)
from PIL import ImageDraw as _ID
def _o(cx,cy):return ((900+cx/3.0)*K,(690+cy/3.0)*K)
_poly=[_o(112,232),_o(1322,112),_o(1337,152),_o(205,322),_o(118,272)]
_m=Image.new('L',(a.shape[1],a.shape[0]),0);_ID.Draw(_m).polygon(_poly,fill=255)
_mm=np.array(_m)>0;a[_mm]=0
_hl=Image.new('L',(a.shape[1],a.shape[0]),0);_dh=_ID.Draw(_hl)
_r=np.random.default_rng(5)
(x0_,y0_),(x1_,y1_)=_o(105,230),_o(1330,108)
for k in range(0,26):
    off=k*7.5/3.0*K
    xa,ya=x0_,y0_+off+2;xb,yb=x1_,y1_+off+2
    n=int(abs(xb-xa)/40)
    xs_=np.linspace(xa,xb,n+1)
    for i in range(n):
        if _r.random()<0.12+0.02*k:continue
        t0,t1=xs_[i],xs_[i+1]-_r.uniform(2,8)
        ya0=ya+(yb-ya)*(t0-xa)/(xb-xa);ya1=ya+(yb-ya)*(t1-xa)/(xb-xa)
        _dh.line([(t0,ya0),(t1,ya1)],fill=int(255*_r.uniform(0.55,0.9)),width=2)
for row in range(0,8):
    yoff=(row*21/3.0)*K+6
    for sx in np.arange(110+(row%2)*35,1320,70):
        xa_=(900+sx/3.0)*K;ya_=(690+(232-(sx-112)*0.0992+row*21+4)/3.0)*K
        _dh.line([(xa_,ya_),(xa_,ya_+17*K/3.0*1.0)],fill=170,width=2)
_hl=np.array(_hl,float)/255
a=np.maximum(a,_hl*_mm)
a=a[top:,:];SC=2560/w
scene=np.array(Image.fromarray((a*255).astype('uint8')).resize((2560,1400),Image.LANCZOS),float)/255
def dispx(x):return x*K*SC
def dispy(y):return (y*K-top)*SC
y=np.linspace(0,1,1400)[:,None];m=np.clip(y/0.03,0,1);m=m*m*(3-2*m)
xs=np.linspace(0,1,2560)[None,:];hx=np.clip(np.minimum(xs,1-xs)/0.04,0,1);hx=hx*hx*(3-2*hx)
D=m*hx
# приглушить яркое поле волн внизу слева (мягкий эллипс до ~55% яркости)
gx=np.clip(1-xs/0.40,0,1);gy=np.clip((y-0.62)/0.30,0,1)
bl=(gx*gy);bl=bl*bl*(3-2*bl)
D=D*(1-0.45*bl)
scene_d=scene*D
# --- ship
sh=alpha('gemini-K1.jpg');sh[int(580*K):int(625*K),int(1735*K):int(1790*K)]=0
x0,x1=int(195*K),int(1815*K);y0,y1=int(330*K),int(694*K)
c=sh[y0:y1,x0:x1]
ink=c>0.25
fill=ndi.binary_fill_holes(ndi.binary_dilation(ink,iterations=3))
fill=ndi.gaussian_filter(fill.astype(float),1.0)
scale=600*K*SC/ (x1-x0) *1.0   # ship display-width 600 on scene -> px
scale=(560*K*SC)/(x1-x0)
nw,nh=int(c.shape[1]*scale),int(c.shape[0]*scale)
rs=lambda z:np.array(Image.fromarray((np.clip(z,0,1)*255).astype('uint8')).resize((nw,nh),Image.LANCZOS),float)/255
S=rs(c);M=rs(fill)
cx=1200*K*SC;wly_target=dispy(985)
px=int(cx-nw/2);py=int(wly_target-nh)
L=np.zeros((1400,2560));LM=np.zeros((1400,2560))
L[py:py+nh,px:px+nw]=S;LM[py:py+nh,px:px+nw]=M
# reflection of the hull/containers, striped and faded
wl=py+nh;depth=int(0.45*nh)
src=L[py+nh-depth:wl,:][::-1]
rows=np.arange(depth);fade=(1-rows/depth)[:,None]**1.3;mod=((rows%3)==0)[:,None]
R=np.zeros_like(L);R[wl+3:wl+3+depth,:]=src*fade*mod*0.75
Rm=ndi.gaussian_filter(R,0.8)
la=np.clip(1-(1-L)*(1-R),0,1)*D;fm=np.clip(LM,0,1)*D
fillA=np.maximum(fm,la)
rgb=BG*(fm[...,None]*(1-la[...,None]))+LINE*la[...,None]
col=np.where(fillA[...,None]>0,rgb/np.maximum(fillA[...,None],1e-6),0)
rgba=np.zeros((1400,2560,4),np.uint8);rgba[...,:3]=np.clip(col,0,255).astype('uint8');rgba[...,3]=(fillA*255).astype('uint8')
# --- lamp glow (lantern at display ~ (1003,228))
lx,ly=dispx(775),dispy(207)
yy,xx=np.mgrid[0:1400,0:2560].astype(float)
d2=((xx-lx)**2+(yy-ly)**2)
core=np.exp(-(((xx-lx)/10.0)**2+((yy-ly)/15.0)**2)/2);halo=np.exp(-d2/(2*38**2));wide=np.exp(-d2/(2*120**2))
g=np.clip(1.0*core+0.38*halo+0.12*wide,0,1)
hot=np.clip(core**2,0,1)[...,None]
GOLD=np.array([0xD9,0xA4,0x41],float);HOT=np.array([0xFF,0xE9,0xA8],float)
col=GOLD*(1-hot)+HOT*hot
glow=np.zeros((1400,2560,4),np.uint8);glow[...,:3]=np.clip(col,0,255).astype('uint8');glow[...,3]=(g*255).astype('uint8')
# --- save
def solid(al):
    rgbs=BG*(1-al[...,None])+LINE*al[...,None];return Image.fromarray(np.clip(rgbs,0,255).astype('uint8'))
solid(scene_d).save('scene-no-ship-2560x1400.png')
Image.fromarray(rgba,'RGBA').save('ship-2560x1400.png')
Image.fromarray(glow,'RGBA').save('lamp-glow-2560x1400.png')
# composite preview
comp=solid(scene_d).convert('RGBA');comp.alpha_composite(Image.fromarray(rgba,'RGBA'));comp.alpha_composite(Image.fromarray(glow,'RGBA'))
comp.convert('RGB').save('preview-composite-2560x1400.png')
X0=755;box=(X0,0,X0+1170,1400)
for n,im in [('scene-no-ship',Image.open('scene-no-ship-2560x1400.png')),('ship',Image.open('ship-2560x1400.png')),('lamp-glow',Image.open('lamp-glow-2560x1400.png')),('preview-composite',comp.convert('RGB'))]:
    im.crop(box).save(f'{n}-phone-1170x1400.png')
json.dump({'lamp_xy_2560':[lx,ly],'ship_px_py_nw_nh':[px,py,nw,nh],'waterline_y':wl,'phone_crop_x0':X0},open('positions.json','w'))
print(lx,ly,px,py,nw,nh,wl)
