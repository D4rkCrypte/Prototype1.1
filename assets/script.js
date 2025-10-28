// ===== MAIN SITE FUNCTIONALITY =====
// Initialize all site functionality when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  
  // ===== SMOOTH SCROLLING =====
  // Add smooth scrolling behavior to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      // Skip if link is disabled or points to nothing
      if (href === '#' || this.hasAttribute('aria-disabled')) {
        if (this.hasAttribute('aria-disabled')) e.preventDefault();
        return;
      }
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== SCROLL TO TOP BUTTON =====
  // Create and append scroll-to-top button
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.className = 'scroll-to-top';
  scrollToTopBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>';
  scrollToTopBtn.setAttribute('aria-label', 'Retour en haut');
  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll-to-top button based on scroll position
  let lastScrollTop = 0;
  const toggleScrollBtn = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show button when scrolled down
    if (scrollTop > 300) {
      scrollToTopBtn.classList.add('visible');
      
      // Hide when scrolling up from bottom
      if (scrollTop < lastScrollTop && scrollTop > 300) {
        scrollToTopBtn.style.opacity = '1';
      }
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  };

  window.addEventListener('scroll', toggleScrollBtn, { passive: true });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ===== BUTTON EVENT HANDLERS =====
  // Handle "Join Us" button clicks - redirect to contact page
  var joinButtons = document.querySelectorAll('.btn-join');
  joinButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      addRippleEffect(e, this);
      setTimeout(() => {
        window.location.href = 'contact.html';
      }, 300);
    });
  });

  // Handle program card clicks - navigate to specific program pages
  var programCards = document.querySelectorAll('[data-link]');
  programCards.forEach(function (card) {
    card.addEventListener('click', function (e) {
      var target = card.getAttribute('data-link');
      if (target) {
        setTimeout(() => {
          window.location.href = target;
        }, 400);
      }
    });
  });

  // ===== RIPPLE EFFECT FUNCTION =====
  // Create modern ripple effect on click
  function addRippleEffect(e, element) {
    // Check if element already has a ripple to avoid duplicates
    if (element.querySelector('.ripple')) return;
    
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Add ripple effect to all buttons and clickable elements
  document.querySelectorAll('button, .btn, a.btn, [data-link], .team-member, .course').forEach(element => {
    element.addEventListener('click', function(e) {
      // Skip ripple for data-link elements (program cards handle their own navigation)
      if (element.hasAttribute('data-link') && element.tagName === 'DIV') {
        return;
      }
      addRippleEffect(e, this);
    });
  });

  // ===== FORM HANDLERS =====
  // Handle contact form submission
  var contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) addRippleEffect(e, submitBtn);
      
      alert('Merci ! Nous vous répondrons rapidement.');
      contactForm.reset();
    });
  }

  // Handle newsletter subscription form
  var newsletterForm = document.querySelector('[data-newsletter]');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      if (submitBtn) addRippleEffect(e, submitBtn);
      
      var emailInput = newsletterForm.querySelector('input[type="email"]');
      var email = emailInput ? emailInput.value.trim() : '';
      if (!email) { alert('Veuillez saisir un email valide.'); return; }
      alert("Merci de votre inscription à la newsletter CyberGuard4All !");
      newsletterForm.reset();
    });
  }

  // ===== MOBILE NAVIGATION =====
  // Handle mobile navigation toggle functionality
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function (e) {
      addRippleEffect(e, this);
      var isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile menu when navigation links are clicked
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (navMenu.classList.contains('open')) {
          addRippleEffect(e, this);
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ===== NAVIGATION STATE MANAGEMENT =====
  // Set active state for current page navigation link
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

  // ===== HEADER SCROLL BEHAVIOR =====
  // Change header background from transparent to solid when scrolling
  var headerEl = document.querySelector('header');
  var bannerEl = document.querySelector('.banner');
  function updateHeaderBg() {
    if (!headerEl) return;
    var threshold = 10; // small scroll to switch
    if (bannerEl) {
      if (window.scrollY > threshold) {
        headerEl.classList.add('scrolled');
      } else {
        headerEl.classList.remove('scrolled');
      }
    } else {
      // No banner: keep solid header
      headerEl.classList.add('scrolled');
    }
  }
  updateHeaderBg();
  window.addEventListener('scroll', updateHeaderBg, { passive: true });

  // ===== SCROLL ANIMATIONS SYSTEM =====
  // Initialize scroll-triggered animations using Intersection Observer
  const initScrollAnimations = () => {
    // Animation configuration for intersection observer
    const animationConfig = {
      threshold: 0.1, // Trigger when 10% of element is visible
      rootMargin: '0px 0px -50px 0px' // Start animation 50px before element enters viewport
    };

    // Create intersection observer to detect when elements enter viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Keep observing to allow repeat animations on scroll
        } else {
          // Remove animation class when element leaves viewport
          entry.target.classList.remove('animate-in');
        }
      });
    }, animationConfig);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
      observer.observe(element);
    });

    // ===== STAGGERED ANIMATIONS =====
    // Note: Animation classes are now directly applied in HTML
    // This ensures consistent behavior and prevents conflicts
    // All elements with .animate-on-scroll class will be observed automatically
  };

  // Initialize scroll animations system
  initScrollAnimations();
});


