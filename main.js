(function(){
var rd=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var $=function(i){return document.getElementById(i)};

// marquee: duplicate content for a seamless loop
var mt=$('mt');if(mt)mt.innerHTML+=mt.innerHTML;

// count-up numbers
function cu(r){if(rd)return;r.querySelectorAll('.cnt').forEach(function(c){var to=+c.dataset.to,t0=null;function st(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/1100,1);c.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(st)}c.textContent='0';requestAnimationFrame(st)})}

// reveal on scroll
var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');cu(e.target);io.unobserve(e.target)}})},{threshold:.12}):null;
document.querySelectorAll('.rv').forEach(function(e){io?io.observe(e):e.classList.add('in')});

// mobile menu
var nv=$('nv'),bg=$('bg');
bg.onclick=function(){var o=nv.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
var ids=['home','about','services','plans','contact'],lk={};
nv.querySelectorAll('a').forEach(function(a){lk[a.getAttribute('href').slice(1)]=a;a.addEventListener('click',function(){nv.classList.remove('open');bg.setAttribute('aria-expanded','false')})});

// scroll spy + progress bar
var pb=$('pb');
function spy(){var y=scrollY+120,cur='home';
ids.forEach(function(i){var e=$(i);if(e&&e.offsetTop<=y)cur=i});
if(innerHeight+scrollY>=document.body.scrollHeight-4)cur='contact';
ids.forEach(function(i){lk[i].classList.toggle('on',i===cur)});
var h=document.documentElement.scrollHeight-innerHeight;
pb.style.transform='scaleX('+(h>0?Math.min(scrollY/h,1):0)+')'}
addEventListener('scroll',spy,{passive:true});spy();

// theme toggle
$('tg').onclick=function(){var t=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',t);try{localStorage.setItem('u1-theme',t)}catch(e){}};

// contact form -> WhatsApp
$('f').addEventListener('submit',function(e){e.preventDefault();
var t='الاسم: '+this.n.value+'\nالموبايل: '+this.p.value+'\n'+this.m.value;
window.open('https://wa.me/201066685878?text='+encodeURIComponent(t),'_blank','noopener');
$('msg').textContent='تم فتح واتساب برسالتك.'});

// dumbbell: moves in place on click
document.querySelectorAll('.dbb').forEach(function(b){b.addEventListener('click',function(){b.classList.remove('go');void b.offsetWidth;b.classList.add('go')});b.addEventListener('animationend',function(){b.classList.remove('go')})});

// hero particles
var c=$('pc');
if(c&&!rd){var x=c.getContext('2d'),w,h,ps=[],n=innerWidth<700?26:56;
function rs(){w=c.width=c.offsetWidth;h=c.height=c.offsetHeight}rs();addEventListener('resize',rs);
for(var i=0;i<n;i++)ps.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.8+.4,v:Math.random()*.35+.08,a:Math.random()*.6+.2});
(function fr(){x.clearRect(0,0,w,h);ps.forEach(function(p){p.y-=p.v;p.x+=Math.sin(p.y/40)*.15;if(p.y<-4){p.y=h+4;p.x=Math.random()*w}x.beginPath();x.arc(p.x,p.y,p.r,0,6.283);x.fillStyle='rgba(200,245,30,'+p.a+')';x.fill()});requestAnimationFrame(fr)})()}
})();
