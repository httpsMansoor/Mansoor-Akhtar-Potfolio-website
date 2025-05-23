/**
 * Main JavaScript file for portfolio website
 */

document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navmenu .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header');
    let offset = header.offsetHeight;

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header');
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled');
      } else {
        selectHeader.classList.remove('header-scrolled');
      }
    };
    window.addEventListener('load', headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Back to top button
   */
  let backtotop = select('.scroll-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#header').classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navmenu .dropdown > a', function(e) {
    if (select('#header').classList.contains('mobile-nav-active')) {
      e.preventDefault();
      this.nextElementSibling.classList.toggle('dropdown-active');
    }
  }, true);

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    const targetHash = this.hash;
    const targetElement = select(targetHash);

    if (targetElement) {
      e.preventDefault();

      let header = select('#header');
      let offset = header ? header.offsetHeight : 0; // Account for non-existent header

      // Adjust offset for fixed header, but ensure it doesn't go above the top of the page
      const elementPos = targetElement.offsetTop;
      const scrollToPosition = elementPos - offset;

      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
    }
  }, true);

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Initiate AOS
   */
  AOS.init({
    duration: 1000,
    easing: "ease-in-out",
    once: false,
    mirror: true
  });

  /**
   * Initialize Pure Counter
   */
  new PureCounter({
    selector: ".purecounter",
    start: 0,
    duration: 2,
    once: true,
    pulse: false,
    decimals: 0,
    legacy: false,
    filesizing: false,
    currency: false,
    separator: false
  });

  /**
   * 'Gravity Pull' effect for Get Started button
   */
  const heroSection = select('#hero');
  const getStartedButton = select('.hero .btn-get-started');

  if (heroSection && getStartedButton) {
    const sensitivity = 0.05; // Controls how much the button moves

    heroSection.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { top, left, width, height } = getStartedButton.getBoundingClientRect();
      const buttonCenterX = left + width / 2;
      const buttonCenterY = top + height / 2;

      // Calculate distance and direction vector from button center to cursor
      const deltaX = clientX - buttonCenterX;
      const deltaY = clientY - buttonCenterY;

      // Apply transform based on the direction, scaled by sensitivity
      const translateX = deltaX * sensitivity;
      const translateY = deltaY * sensitivity;

      getStartedButton.style.transform = `translate(-50%, -50%) translate(${translateX}px, ${translateY}px)`;
    });

    heroSection.addEventListener('mouseleave', () => {
      // Reset transform when cursor leaves the hero section
      getStartedButton.style.transform = 'translate(-50%, -50%)';
    });

    // Initially position the button using transform for consistent centering
    getStartedButton.style.position = 'absolute';
    getStartedButton.style.top = '50%';
    getStartedButton.style.left = '50%';
    getStartedButton.style.transform = 'translate(-50%, -50%)';
    getStartedButton.style.transition = 'transform 0.3s ease-out'; // Smooth transition
  }

});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', () => {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navbar = document.querySelector('#navmenu');
  
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', (e) => {
      navbar.classList.toggle('navbar-mobile');
      navbar.classList.toggle('active');
      mobileNavToggle.classList.toggle('active');
      mobileNavToggle.classList.toggle('bi-list');
      mobileNavToggle.classList.toggle('bi-x');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && !mobileNavToggle.contains(e.target)) {
        navbar.classList.remove('navbar-mobile', 'active');
        mobileNavToggle.classList.remove('active');
        mobileNavToggle.classList.add('bi-list');
        mobileNavToggle.classList.remove('bi-x');
      }
    });

    // Close menu when clicking nav links
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navbar.classList.remove('navbar-mobile', 'active');
        mobileNavToggle.classList.remove('active');
        mobileNavToggle.classList.add('bi-list');
        mobileNavToggle.classList.remove('bi-x');
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const getStartedBtn = document.querySelector('.hero .btn-get-started');
  
  if (getStartedBtn) {
    // Keep only click handler if needed
    getStartedBtn.addEventListener('click', function() {
      // Handle smooth scroll to about section
      document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
    });
  }
});