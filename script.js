const observer=new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function animateNumber(el,target,decimals=0,suffix=""){
  if(reduceMotion){el.textContent=target.toFixed(decimals)+suffix;return}
  const start=performance.now(),duration=950;
  const tick=(now)=>{
    const p=Math.min((now-start)/duration,1);
    const eased=1-Math.pow(1-p,4);
    el.textContent=(target*eased).toFixed(decimals)+suffix;
    if(p<1)requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
window.addEventListener("load",()=>{
  document.querySelectorAll(".stat strong").forEach((el,i)=>{
    const target=Number(el.dataset.value);
    const suffix=el.dataset.suffix||"";
    setTimeout(()=>animateNumber(el,target,0,suffix),380+i*100);
  });
});

// MSOCIALS exact staircase alignment
function alignMSocialsHero(){
  const title=document.querySelector(".ms-hero-title");
  const line2=document.querySelector(".ms-line-2");
  const line3=document.querySelector(".ms-line-3");
  const anchor1=document.querySelector(".ms-anchor-1");
  const anchor2=document.querySelector(".ms-anchor-2");

  if(!title||!line2||!line3||!anchor1||!anchor2) return;

  line2.style.marginLeft="";
  line3.style.marginLeft="";

  const titleRect=title.getBoundingClientRect();

  if(window.innerWidth<=620){
    line2.style.marginLeft="13vw";
    line3.style.marginLeft="25vw";
    return;
  }

  const anchor1Rect=anchor1.getBoundingClientRect();
  line2.style.marginLeft=`${Math.max(0,anchor1Rect.left-titleRect.left)}px`;

  requestAnimationFrame(()=>{
    const refreshedTitleRect=title.getBoundingClientRect();
    const anchor2Rect=anchor2.getBoundingClientRect();
    line3.style.marginLeft=`${Math.max(0,anchor2Rect.left-refreshedTitleRect.left)}px`;
  });
}

window.addEventListener("load",()=>{
  if(document.fonts&&document.fonts.ready){
    document.fonts.ready.then(()=>requestAnimationFrame(alignMSocialsHero));
  }else{
    requestAnimationFrame(alignMSocialsHero);
  }
});

window.addEventListener("resize",alignMSocialsHero);
