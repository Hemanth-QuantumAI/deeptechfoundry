/* Deep Tech Foundry — main.js */

(function () {
  'use strict';

  // ── Mobile nav toggle ──────────────────────────────────────
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close when a nav link is clicked
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close when clicking outside the nav
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav')) {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Contact modal ─────────────────────────────────────────
  var modal      = document.getElementById('contact-modal');
  var modalForm  = document.getElementById('contact-form');
  var modalClose = modal ? modal.querySelector('.modal-close') : null;
  var modalSuccess = document.getElementById('cf-success');

  function openModal() {
    if (!modal) return;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    var firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]');
    if (firstFocusable) firstFocusable.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    // Reset form on close
    if (modalForm) modalForm.reset();
    if (modalSuccess) modalSuccess.setAttribute('hidden', '');
    if (modalForm) modalForm.removeAttribute('hidden');
  }

  // Intercept all contact.html links
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href="contact.html"]');
    if (link) {
      e.preventDefault();
      openModal();
    }
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Close on overlay click
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
  }

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && !modal.hasAttribute('hidden')) {
      closeModal();
    }
  });

  // Form submission
  if (modalForm) {
    modalForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      ['cf-name', 'cf-email', 'cf-message'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el && !el.value.trim()) {
          el.style.borderColor = 'rgba(191,30,46,0.7)';
          valid = false;
        } else if (el) {
          el.style.borderColor = '';
        }
      });
      if (!valid) return;

      // Show success state
      modalForm.setAttribute('hidden', '');
      if (modalSuccess) modalSuccess.removeAttribute('hidden');
    });

    // Clear red border on input
    modalForm.querySelectorAll('.cf-input').forEach(function (el) {
      el.addEventListener('input', function () {
        el.style.borderColor = '';
      });
    });
  }

  // ── Scroll indicator fade ─────────────────────────────────
  var scrollIndicator = document.querySelector('.hero-scroll');
  if (scrollIndicator) {
    window.addEventListener('scroll', function () {
      var opacity = Math.max(0, 0.35 - window.scrollY / 200);
      scrollIndicator.style.opacity = opacity;
    }, { passive: true });
  }

})();
