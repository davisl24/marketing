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