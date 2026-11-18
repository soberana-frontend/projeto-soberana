/* Menu mobile e fechamento de detalhes */
(function () {
  var b = document.getElementById('bg');
  var n = document.getElementById('nav');
  if (b && n) {
    b.addEventListener('click', function () {
      var o = n.classList.toggle('open');
      b.setAttribute('aria-expanded', o);
    });
    n.addEventListener('click', function (e) {
      var a = e.target.closest('a');
      if (a && a.getAttribute('href').charAt(0) === '#' && a.getAttribute('href').length > 1) {
        n.classList.remove('open');
        b.setAttribute('aria-expanded', 'false');
      }
    });
  }
  document.addEventListener('click', function (e) {
    if (n) {
      n.querySelectorAll('details[open]').forEach(function (d) {
        if (!d.contains(e.target)) d.open = false;
      });
    }
  });
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();

/* Carrossel 3D de serviços */
(function () {
  var ring = document.getElementById('cRing');
  if (!ring) return;
  var faces = ring.querySelectorAll('.c-face');
  var n = faces.length;
  if (n === 0) return;
  var angle = 360 / n;
  var radius = Math.max(280, n * 42);
  var cur = 0;
  var drag = false;
  var startX = 0;
  var lastX = 0;
  var vel = 0;
  var raf = null;
  var autoTimer = null;
  var autoAngle = 0;

  faces.forEach(function (f, i) {
    f.style.transform = 'rotateY(' + (i * angle) + 'deg) translateZ(' + radius + 'px)';
  });

  function update() {
    faces.forEach(function (f, i) {
      var rel = ((i - cur) % n + n) % n;
      var fwd = rel <= n / 2 ? rel : rel - n;
      var dist = Math.abs(fwd);
      f.classList.toggle('active', dist === 0);
      f.style.opacity = dist === 0 ? '1' : dist === 1 ? '.55' : '.25';
      f.style.filter = dist === 0 ? 'none' : dist === 1 ? 'blur(.5px)' : 'blur(2px)';
      f.style.zIndex = dist === 0 ? 2 : dist === 1 ? 1 : 0;
    });
  }

  function setRot(deg, snap) {
    ring.style.transition = snap ? 'transform .4s cubic-bezier(.25,.8,.25,1)' : 'none';
    ring.style.transform = 'rotateY(' + deg + 'deg)';
    cur = Math.round(-deg / angle) % n;
    if (cur < 0) cur += n;
    update();
  }

  setRot(0, true);

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(function () {
      autoAngle -= 60;
      setRot(autoAngle, true);
    }, 3000);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  function onDown(e) {
    drag = true;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX = startX;
    vel = 0;
    ring.classList.add('dragging');
    cancelAnimationFrame(raf);
    stopAuto();
  }

  function onMove(e) {
    if (!drag) return;
    var x = e.touches ? e.touches[0].clientX : e.clientX;
    var dx = x - lastX;
    vel = dx;
    var deg = -cur * angle + dx * 0.4;
    setRot(deg, false);
    lastX = x;
  }

  function onUp() {
    if (!drag) return;
    drag = false;
    ring.classList.remove('dragging');
    var snap = Math.round((-cur * angle + vel * 8) / angle) * angle;
    autoAngle = snap;
    setRot(snap, true);
    startAuto();
  }

  ring.addEventListener('mousedown', onDown);
  ring.addEventListener('touchstart', onDown, { passive: true });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: true });
  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchend', onUp);

  faces.forEach(function (f) {
    f.addEventListener('click', function (e) {
      if (Math.abs(vel) > 3) {
        e.preventDefault();
      }
    });
  });

  update();
  startAuto();
  ring.addEventListener('mouseenter', stopAuto);
  ring.addEventListener('mouseleave', startAuto);
})();