'use strict';
const menuToggle = document.querySelector('#menu-toggle');
const nav = document.querySelector('#main-nav');
if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Zamknij menu' : 'Otwórz menu');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false');
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }
  });
}
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const sections = document.querySelectorAll('.feature-card,.update-line,.pvp-tile');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
  }), {threshold: 0.12});
  sections.forEach(section => {section.classList.add('reveal-ready'); observer.observe(section);});
}


// Website 3.0: preview gallery, no data transfer or trackers.
const previewButtons = document.querySelectorAll('.preview-option');
const previewImage = document.querySelector('#preview-image');
const previewOpen = document.querySelector('#preview-open');
const previewName = document.querySelector('#preview-name');
previewButtons.forEach(btn => btn.addEventListener('click', () => {
  if (!previewImage || !previewOpen || !previewName) return;
  previewButtons.forEach(other => { other.classList.toggle('active',other===btn);other.setAttribute('aria-pressed',String(other===btn)); });
  previewImage.src=btn.dataset.image;
  previewImage.alt=btn.dataset.alt;
  previewOpen.href=btn.dataset.image;
  previewOpen.setAttribute('aria-label', 'Otwórz obraz: ' + btn.dataset.title);
  previewName.textContent=btn.dataset.title;
}));
const stepData = [
  {tag:'KROK 1 Z 3',title:'Pobierz paczkę MINEVORA 11.4',desc:'Zapisz plik ZIP na komputerze z Windows. Rozpakuj go w całości do osobnego folderu.',action:'↓ Pobierz ZIP',url:'MINEVORA_11_4_TOGETHER.zip',download:true},
  {tag:'KROK 2 Z 3',title:'Zainstaluj potrzebne biblioteki',desc:'Otwórz rozpakowany folder i uruchom INSTALUJ_ZALEZNOSCI.bat. Jeśli Windows poprosi o potwierdzenie, sprawdź zawartość pliku przed uruchomieniem.',action:'📖 Zobacz poradnik',url:'poradnik.html#instalacja'},
  {tag:'KROK 3 Z 3',title:'Uruchom launcher i zaloguj konto',desc:'Uruchom URUCHOM_MINEVORA.bat, wybierz instalację Minecraft Java i użyj oficjalnego logowania Microsoft. Jeśli pojawi się błąd, sprawdź poradnik.',action:'↗ Rozwiązania problemów',url:'poradnik.html#problemy'}
];
const stepButtons=document.querySelectorAll('.step-choice');
const stepContent=document.querySelector('#step-content');
stepButtons.forEach(btn=>btn.addEventListener('click',()=>{
  const index=Number(btn.dataset.step);const data=stepData[index];if(!data||!stepContent)return;
  stepButtons.forEach(b=>{b.classList.toggle('selected',b===btn);b.setAttribute('aria-pressed',String(b===btn));});
  stepContent.replaceChildren();
  const label=document.createElement('div');label.className='step-label';label.textContent=data.tag;
  const title=document.createElement('h3');title.textContent=data.title;
  const desc=document.createElement('p');desc.textContent=data.desc;
  const link=document.createElement('a');link.className='btn btn-primary btn-small';link.href=data.url;link.textContent=data.action;if(data.download)link.setAttribute('download','');
  stepContent.append(label,title,desc,link);
}));
const motionBtn=document.querySelector('#motion-toggle');
let motionDisabled=false;
try{motionDisabled=localStorage.getItem('minevora-site-no-motion')==='true';}catch(e){}
function setMotion(disabled){
  document.documentElement.dataset.motion=disabled?'off':'on';
  if(motionBtn){motionBtn.setAttribute('aria-pressed',String(disabled));motionBtn.textContent=disabled?'✧ Włącz animacje':'◌ Wyłącz animacje';}
}
setMotion(motionDisabled);
if(motionBtn)motionBtn.addEventListener('click',()=>{
  motionDisabled=!motionDisabled;setMotion(motionDisabled);
  try{localStorage.setItem('minevora-site-no-motion',String(motionDisabled));}catch(e){}
});
const backTop=document.querySelector('#back-to-top');
if(backTop){
  const updateBack=()=>backTop.classList.toggle('visible',window.scrollY>700);
  window.addEventListener('scroll',updateBack,{passive:true});updateBack();
  backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:(motionDisabled||window.matchMedia('(prefers-reduced-motion: reduce)').matches)?'instant':'smooth'}));
}
const mobileDownload=document.querySelector('.mobile-download');
if(mobileDownload){
  const syncMobileCTA=()=>mobileDownload.classList.toggle('show',window.scrollY>570);
  window.addEventListener('scroll',syncMobileCTA,{passive:true});syncMobileCTA();
}
