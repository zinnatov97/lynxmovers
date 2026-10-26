(() => {
'use strict';
const PRICES = {2:105,3:145};
const LOCAL_TRUCK_FEE = 85;
const OFFER_END = new Date('2027-01-01T08:00:00Z'); // Midnight on Jan 1, 2027 in Sacramento (PST)
const phone = '+12797865352';
const $ = (selector) => document.querySelector(selector);
const money = (value) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:value % 1 === 0 ? 0 : 2}).format(value);

$('#year').textContent = String(new Date().getFullYear());
const menuButton = $('#menu-toggle');
const menu = $('#mobile-nav');
function closeMenu(){menu.hidden = true;menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open menu')}
menuButton.addEventListener('click',()=>{const open=menu.hidden;menu.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu')});
menu.addEventListener('click',(e)=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',(e)=>{if(e.key==='Escape')closeMenu()});
document.addEventListener('click',(e)=>{if(!menu.hidden&&!menu.contains(e.target)&&!menuButton.contains(e.target))closeMenu()});

const expired = Date.now()>=OFFER_END.getTime();
if(expired){document.querySelectorAll('[data-offer]').forEach(el=>el.hidden=true);$('[data-pricing]').hidden=true;$('[data-calculator]').hidden=true;$('.calculator-expired').hidden=false;$('.pricing-disclaimer').textContent='The 2026 special offer has ended. Please call Lynx Movers for current rates.'}

const range = $('#hours');
let movers = 2;
function updateEstimate(){
const hours=Number(range.value);
const sacramento=$('input[name="service-area"]:checked').value==='sacramento';
const packing=$('#packing').checked;
const labor=hours*PRICES[movers];
const grandTotal=labor+(sacramento?LOCAL_TRUCK_FEE:0);
const hoursText=Number.isInteger(hours)?`${hours} hours`:`${hours.toFixed(1)} hours`;
$('#hours-value').textContent=hoursText;
range.style.background=`linear-gradient(to right,var(--purple) 0 ${(hours-3)/9*100}%,#ebe8ed ${(hours-3)/9*100}% 100%)`;
$('.estimate-kicker').textContent=sacramento?'YOUR ESTIMATED COST':'ESTIMATED LABOR ONLY';
$('#estimate-labor').textContent=money(labor);
$('#estimate-truck').textContent=sacramento?money(LOCAL_TRUCK_FEE):'To be confirmed';
$('#packing-line').hidden=!packing;
$('#estimate-total').innerHTML=`${money(grandTotal)}<span>*</span>`;
$('#estimate-subtitle').textContent=`${movers} movers · ${hoursText} · ${sacramento?'within Sacramento':'outside Sacramento'}`;
$('#estimate-note').textContent=sacramento?'* Starting estimate, not a final binding quote. Additional services or charges may apply.': '* Labor subtotal only. Truck fee outside Sacramento will be quoted separately; total cost is not yet known.';
const estimateText=`Hello Lynx Movers! I'd like a moving quote.\nCrew: ${movers} movers (${money(PRICES[movers])}/hr)\nEstimated time: ${hoursText}\nArea: ${sacramento?'Within Sacramento':'Outside Sacramento'}\nEstimated labor: ${money(labor)}\nTruck fee: ${sacramento?'$85':'Please quote'}\n${sacramento?'Starting estimate: '+money(grandTotal):'Total: pending truck fee'}\nPacking help: ${packing?'Yes, please quote':'Not needed'}\nPlease confirm availability and final pricing. Thank you!`;
$('#estimate-text').href=`sms:${phone}?body=${encodeURIComponent(estimateText)}`;
$('#estimate-text').setAttribute('aria-label',`Text Lynx Movers about ${sacramento?'an estimated cost':'estimated labor'} of ${money(grandTotal)}${sacramento?'':' plus an individually quoted truck fee'}`);
}
document.querySelectorAll('[data-movers]').forEach(button=>button.addEventListener('click',()=>{
movers=Number(button.dataset.movers);
document.querySelectorAll('[data-movers]').forEach(b=>{const active=b===button;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
updateEstimate();
}));
range.addEventListener('input',updateEstimate);
document.querySelectorAll('input[name="service-area"]').forEach(el=>el.addEventListener('change',updateEstimate));
$('#packing').addEventListener('change',updateEstimate);
updateEstimate();

const stickyCall = $('.mobile-sticky-cta');
if('IntersectionObserver' in window){
const callObserver = new IntersectionObserver(([entry])=>{
stickyCall.classList.toggle('is-visible',!entry.isIntersecting && entry.boundingClientRect.bottom<0);
},{threshold:0});
callObserver.observe($('.hero-buttons'));
}else{
window.addEventListener('scroll',()=>stickyCall.classList.toggle('is-visible',window.scrollY>550),{passive:true});
}

if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
const reveals=document.querySelectorAll('.section-intro,.service-card,.price-card,.values-list>div,.photo-card,.review-card');
const observer=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target)}})},{threshold:.06,rootMargin:'0px 0px 50px 0px'});
reveals.forEach(el=>{el.classList.add('reveal-on-scroll');observer.observe(el)});
}
})();
