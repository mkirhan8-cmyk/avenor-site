/* запасной вариант для браузеров без animation-timeline; ставит .mv-on один раз */
(function(){if(CSS.supports('animation-timeline:view()')||matchMedia('(prefers-reduced-motion:reduce)').matches||!window.IntersectionObserver)return;
var d=document.documentElement;d.classList.add('mv-js');
var o=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('mv-on');o.unobserve(x.target)}})},{threshold:.2});
document.querySelectorAll('.mv-in,.mv-route').forEach(function(n){o.observe(n)})})();
