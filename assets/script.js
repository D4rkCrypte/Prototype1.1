document.addEventListener('DOMContentLoaded', function () {
  var joinButtons = document.querySelectorAll('.btn-join');
  joinButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      window.location.href = 'contact.html';
    });
  });

  var programCards = document.querySelectorAll('[data-link]');
  programCards.forEach(function (card) {
    card.addEventListener('click', function () {
      var target = card.getAttribute('data-link');
      if (target) window.location.href = target;
    });
  });

  var contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Merci ! Nous vous répondrons rapidement.');
      contactForm.reset();
    });
  }

  var newsletterForm = document.querySelector('[data-newsletter]');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = newsletterForm.querySelector('input[type="email"]');
      var email = emailInput ? emailInput.value.trim() : '';
      if (!email) { alert('Veuillez saisir un email valide.'); return; }
      alert("Merci de votre inscription à la newsletter CyberGuard4All !");
      newsletterForm.reset();
    });
  }

  // Mobile nav toggle
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on link click (mobile)
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Active nav state
  var current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(function (a) {
    var href = a.getAttribute('href');
    var isDisabled = a.getAttribute('aria-disabled') === 'true';
    if (isDisabled) {
      a.addEventListener('click', function (e) { e.preventDefault(); });
      return;
    }
    if (href === current) {
      a.classList.add('active');
    }
  });
});


