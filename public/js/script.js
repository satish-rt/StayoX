(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})();


// Lightweight 3D tilt for elements with .tilt-card
(function attachTilt() {
  const cards = document.querySelectorAll('.tilt-card');
  if (!cards.length) return;

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  cards.forEach(card => {
    let rect;
    const onMove = (e) => {
      rect = rect || card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const px = (x / rect.width) * 2 - 1; // -1 to 1
      const py = (y / rect.height) * 2 - 1;
      const rx = clamp(py * -8, -10, 10);
      const ry = clamp(px * 8, -10, 10);
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onLeave = () => {
      rect = null;
      card.style.transform = 'rotateX(0) rotateY(0)';
    };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    card.addEventListener('touchmove', (e) => {
      if (!e.touches?.[0]) return;
      const t = e.touches[0];
      onMove({ clientX: t.clientX, clientY: t.clientY });
    }, { passive: true });
    card.addEventListener('touchend', onLeave);
  });
})();

// Bootstrap validation (existing)
(function () {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();

// Lightweight 3D tilt for .tilt-card (existing)
(function(){
  const cards = document.querySelectorAll('.tilt-card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const maxTilt = 8;
    function applyTilt(x, y){
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const dx = x - cx;
      const dy = y - cy;
      const rx = Math.max(Math.min((dy/rect.height) * maxTilt, maxTilt), -maxTilt);
      const ry = Math.max(Math.min(-(dx/rect.width) * maxTilt, maxTilt), -maxTilt);
      card.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    card.addEventListener('mousemove', e => applyTilt(e.clientX, e.clientY));
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    card.addEventListener('touchmove', e => { const t=e.touches[0]; applyTilt(t.clientX, t.clientY); });
    card.addEventListener('touchend', () => { card.style.transform = ''; });
  });
})();

// Button ripple click animation
(function(){
  document.addEventListener('click', function(e){
    const btn = e.target.closest('.btn');
    if(!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  }, {capture:true});
})();

// Fade-in on scroll for cards
(function(){
  const els = document.querySelectorAll('.fade-in-up');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('animate-in'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.15});
  els.forEach(el => io.observe(el));
})();