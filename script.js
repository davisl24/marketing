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
function animateNumber(el,target,decimals=0,prefix="",suffix=""){
  if(reduceMotion){el.textContent=prefix+target.toFixed(decimals)+suffix;return}
  const start=performance.now(),duration=950;
  const tick=(now)=>{
    const p=Math.min((now-start)/duration,1);
    const eased=1-Math.pow(1-p,4);
    el.textContent=prefix+(target*eased).toFixed(decimals)+suffix;
    if(p<1)requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
window.addEventListener("load",()=>{
  document.querySelectorAll(".metric strong").forEach((el,i)=>{
    const target=Number(el.dataset.value);
    const decimals=Number(el.dataset.decimals||0);
    setTimeout(()=>animateNumber(el,target,decimals,el.dataset.prefix||"",el.dataset.suffix||""),380+i*90);
  });
});