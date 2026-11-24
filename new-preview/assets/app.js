
/* Never leave a broken image icon: try a distinct source, then a local textile illustration. */
function imageRecovery(img){
  if(!img||img.tagName!=='IMG')return;
  if(!img.dataset.imageStage&&img.dataset.backup&&img.src!==img.dataset.backup){
    img.dataset.imageStage='backup';img.src=img.dataset.backup;return;
  }
  if(img.dataset.imageStage==='local')return;
  img.dataset.imageStage='local';img.dataset.imageFallback='true';
  img.src='./assets/textile-fallback.svg';
}
document.addEventListener('error',e=>{if(e.target?.tagName==='IMG')imageRecovery(e.target)},true);
document.querySelectorAll('img').forEach(img=>{if(img.complete&&!img.naturalWidth)imageRecovery(img)});


(()=>{const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];const toastEl=$('#toast');let toastTimer;
const toast=m=>{toastEl.textContent=m;toastEl.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toastEl.classList.remove('show'),3500)};
const scrim=$('#menu-backdrop'),drawer=$('#mobile-menu'),opener=$('#menu-open'),closer=$('#menu-close');
function openMenu(){drawer.classList.add('open');scrim.classList.add('open');document.body.style.overflow='hidden';opener.setAttribute('aria-expanded','true');closer.focus()}
function closeMenu(){drawer.classList.remove('open');scrim.classList.remove('open');document.body.style.overflow='';opener.setAttribute('aria-expanded','false')}
opener?.addEventListener('click',openMenu);closer?.addEventListener('click',closeMenu);scrim?.addEventListener('click',closeMenu);$$('#mobile-menu a').forEach(a=>a.addEventListener('click',closeMenu));
const slides=$('.hero-slide'),dots=$('.hero-dots button'),navButtons=$('[data-hero-index]'),counter=$('#hero-count'),pauseButton=$('#hero-pause');let active=0,autoplay,userPaused=false;
const showSlide=(i,manual=false)=>{active=(i+slides.length)%slides.length;slides.forEach((s,k)=>{const on=k===active;s.classList.toggle('is-active',on);s.setAttribute('aria-hidden',String(!on));s.querySelectorAll('a,button').forEach(a=>a.tabIndex=on?0:-1)});dots.forEach((d,k)=>{d.classList.toggle('active',k===active);d.setAttribute('aria-current',String(k===active))});navButtons.forEach((d,k)=>{d.classList.toggle('active',k===active);d.setAttribute('aria-current',String(k===active))});counter.textContent=String(active+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');const b=navButtons[active],nav=b?.parentElement;if(nav&&nav.scrollWidth>nav.clientWidth){nav.scrollTo({left:Math.max(0,b.offsetLeft-nav.offsetLeft-(nav.clientWidth-b.offsetWidth)/2),behavior:manual?'smooth':'auto'})}};
const pause=()=>clearInterval(autoplay),play=()=>{pause();if(!userPaused&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&!document.hidden)autoplay=setInterval(()=>showSlide(active+1),6500)};
const select=i=>{showSlide(i,true);play()};
dots.forEach((d,i)=>d.addEventListener('click',()=>select(i)));navButtons.forEach((d,i)=>d.addEventListener('click',()=>select(i)));
$('#hero-prev').onclick=()=>select(active-1);$('#hero-next').onclick=()=>select(active+1);
pauseButton.onclick=()=>{userPaused=!userPaused;pauseButton.setAttribute('aria-pressed',String(userPaused));pauseButton.setAttribute('aria-label',userPaused?'Resume autoplay':'Pause autoplay');pauseButton.textContent=userPaused?'▶':'Ⅱ';userPaused?pause():play()};
let swipeX=null;$('#hero').addEventListener('touchstart',e=>swipeX=e.changedTouches[0].screenX,{passive:true});$('#hero').addEventListener('touchend',e=>{if(swipeX===null)return;const diff=e.changedTouches[0].screenX-swipeX;if(Math.abs(diff)>48)select(active+(diff<0?1:-1));swipeX=null},{passive:true});
$('#hero').addEventListener('mouseenter',pause);$('#hero').addEventListener('mouseleave',play);$('#hero').addEventListener('focusin',pause);$('#hero').addEventListener('focusout',play);document.addEventListener('visibilitychange',()=>document.hidden?pause():play());showSlide(0);play();
const flyout=$('#nav-flyout'),flyimg=$('#nav-flyout-img'),flyname=$('#nav-flyout-title'),flydesc=$('#nav-flyout-desc');
$$('.desktop-nav .navlink').forEach(link=>{const show=()=>{flyimg.dataset.backup=link.dataset.previewBackup||'';flyimg.dataset.fallback=link.dataset.previewFallback||'fashion';delete flyimg.dataset.imageStage;delete flyimg.dataset.imageFallback;flyimg.src=link.dataset.previewImg||'';flyimg.alt=link.textContent.trim();flyname.textContent=link.textContent.trim();flydesc.textContent=link.dataset.previewText||'Explore Made in Alipur.';flyout.classList.add('show')};link.addEventListener('mouseenter',show);link.addEventListener('focus',show);link.addEventListener('mouseleave',()=>flyout.classList.remove('show'));link.addEventListener('blur',()=>flyout.classList.remove('show'))});
const overlay=$('#modal-overlay'),modalTitle=$('#modal-title'),modalBody=$('#modal-body'),modalClose=$('#modal-close');
function openModal(t,body){modalTitle.textContent=t;modalBody.innerHTML=body;overlay.classList.add('open');document.body.style.overflow='hidden';modalClose.focus()}function closeModal(){overlay.classList.remove('open');document.body.style.overflow=''}
modalClose.onclick=closeModal;overlay.addEventListener('click',e=>{if(e.target===overlay)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();closeModal()}});document.addEventListener('click',e=>{if(e.target.closest('[data-close-modal]'))closeModal()});
$$('[data-collab]').forEach(b=>b.addEventListener('click',()=>openModal('Collaborate with us','<p>We welcome conversations with designers, artists, independent labels and craft advocates. This first-phase visual concept does not yet have a connected enquiry system.</p><p><strong>Planned enquiry:</strong> name, brand, collaboration type and short introduction.</p><button class="cta" type="button" data-close-modal>Back to preview →</button>')));
const articles={craft:['The language of a single stitch','A journal direction exploring embroidery motifs, textile techniques, thread and the care that gives handcrafted garments character. This is concept editorial copy.'],women:['The women behind the work','Made in Alipur can document the work and opportunities of skilled embroiderers using real images and stories provided with consent.'],outlets:['From the workshop to our outlets','The journal can describe the connection between garments, workshop processes and the physical factory outlets, with locations and services confirmed before launch.']};
$$('[data-article]').forEach(b=>b.addEventListener('click',()=>{const a=articles[b.dataset.article];if(a)openModal(a[0],'<p>'+a[1]+'</p><button class="cta" type="button" data-close-modal>Close article →</button>')}));
let bagCount=0;$$('[data-quick-add]').forEach(b=>b.addEventListener('click',()=>{bagCount++;$('#bag-count').textContent=bagCount;toast('Added to the preview basket. Checkout is not connected.')}));$$('[data-bag]').forEach(b=>b.addEventListener('click',()=>openModal('Your preview basket','<p>'+(bagCount?bagCount+' style(s) selected for this preview.':'Your basket is empty.')+'</p><p>Shopify checkout and payment will be connected in the implementation phase. No transaction is possible here.</p><button class="cta" type="button" data-close-modal>Continue exploring →</button>')));
$$('.favourite').forEach(b=>b.addEventListener('click',()=>{const liked=b.classList.toggle('liked');b.textContent=liked?'♥':'♡';b.setAttribute('aria-pressed',String(liked))}));
const summaries={casual:'Considered everyday pieces with elevated embroidery and easy silhouettes.',semi:'Embellished details and graceful separates for gatherings and special evenings.',wedding:'A premium occasion edit for celebrations, wedding events and memorable moments.'};const tabNames={casual:'Elevated casual',semi:'Semi-formal',wedding:'Wedding & festive'};
$$('.tabs button').forEach(b=>b.addEventListener('click',()=>{$$('.tabs button').forEach(t=>{t.classList.toggle('active',t===b);t.setAttribute('aria-selected',String(t===b))});$('#premium-description').textContent=summaries[b.dataset.tab];$$('[data-premium-kind]').forEach((x,i)=>x.textContent=tabNames[b.dataset.tab]+(i===0?' · Edit 01':i===1?' · Edit 02':' · Detail'))}));
$('#newsletter')?.addEventListener('submit',e=>{e.preventDefault();toast('Newsletter signup is not connected in this design preview.');e.target.reset()});
$$('[data-search]').forEach(b=>b.addEventListener('click',()=>openModal('Explore Made in Alipur','<p>Browse the visual concept:</p><p><a href="#new-arrivals" data-close-modal>New Arrivals ↗</a> · <a href="#meet-artisans" data-close-modal>Premium Edit ↗</a> · <a href="#berry-bows" data-close-modal>Berry and Bows ↗</a></p>')));
})();