/**
 * AURA ONE — Interactive Product Showcase Logic
 * Implements:
 * 1. Synchronized Product Display Variants & Swatches
 * 2. Interactive Feature Hotspots & Tooltips
 * 3. Scroll Transforms & Staggered View Transitions
 */

document.addEventListener('DOMContentLoaded', () => {
  initVariantSwitcher();
  initHotspots();
  initScrollEffects();
});

/* ==========================================================================
   1. Variant & Color Swatch System
   ========================================================================== */
function initVariantSwitcher() {
  const swatchButtons = document.querySelectorAll('.swatch-btn');
  const colorLabel = document.getElementById('selectedColorLabel');
  const images = {
    black: document.getElementById('img-black'),
    silver: document.getElementById('img-silver'),
    green: document.getElementById('img-green'),
  };
  const ambientGlow = document.getElementById('ambientGlow');

  const glowStyles = {
    black: 'radial-gradient(circle, rgba(184, 243, 107, 0.24) 0%, rgba(245, 244, 240, 0) 70%)',
    silver: 'radial-gradient(circle, rgba(160, 210, 255, 0.32) 0%, rgba(245, 244, 240, 0) 70%)',
    green: 'radial-gradient(circle, rgba(101, 194, 134, 0.28) 0%, rgba(245, 244, 240, 0) 70%)',
  };

  swatchButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const colorKey = btn.dataset.color;
      const colorName = btn.dataset.name;

      // Update Swatches UI State
      swatchButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-checked', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-checked', 'true');

      // Update Text Label (Simulates Framer String Variable binding)
      if (colorLabel) {
        colorLabel.style.opacity = '0';
        setTimeout(() => {
          colorLabel.textContent = colorName;
          colorLabel.style.opacity = '1';
        }, 150);
      }

      // Transition Product Image (Smart crossfade 320ms)
      Object.keys(images).forEach((key) => {
        const img = images[key];
        if (key === colorKey) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });

      // Update Ambient Glow Accent
      if (ambientGlow && glowStyles[colorKey]) {
        ambientGlow.style.background = glowStyles[colorKey];
      }
    });
  });
}

/* ==========================================================================
   2. Interactive Hotspots System
   ========================================================================== */
function initHotspots() {
  const hotspotContainers = document.querySelectorAll('.hotspot-container');

  hotspotContainers.forEach((container) => {
    const pin = container.querySelector('.hotspot-pin');
    const closeBtn = container.querySelector('.card-close-btn');

    // Click on pin toggles active state
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = container.classList.contains('active');

      // Close other active hotspots to maintain focus
      hotspotContainers.forEach((other) => {
        if (other !== container) {
          other.classList.remove('active');
          other.querySelector('.hotspot-pin').setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        container.classList.remove('active');
        pin.setAttribute('aria-expanded', 'false');
      } else {
        container.classList.add('active');
        pin.setAttribute('aria-expanded', 'true');
      }
    });

    // Close button inside card
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        container.classList.remove('active');
        pin.setAttribute('aria-expanded', 'false');
      });
    }

    // Stop propagation inside the card so clicks don't close it
    const card = container.querySelector('.hotspot-card');
    if (card) {
      card.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });

  // Clicking outside any hotspot closes all open cards
  document.addEventListener('click', () => {
    hotspotContainers.forEach((container) => {
      container.classList.remove('active');
      const pin = container.querySelector('.hotspot-pin');
      if (pin) pin.setAttribute('aria-expanded', 'false');
    });
  });

  // Pressing Escape key closes open cards
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hotspotContainers.forEach((container) => {
        container.classList.remove('active');
        const pin = container.querySelector('.hotspot-pin');
        if (pin) pin.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* ==========================================================================
   3. Scroll Transform & Staggered Reveal
   ========================================================================== */
function initScrollEffects() {
  const imageWrapper = document.getElementById('imageWrapper');
  const scrollHeader = document.querySelector('.scroll-header');
  const featureCards = document.querySelectorAll('.feature-card');
  const showcaseSection = document.getElementById('showcase-section');

  // Parallax & Subtle Scale Scroll Transform
  window.addEventListener('scroll', () => {
    if (!imageWrapper || !showcaseSection) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const showcaseRect = showcaseSection.getBoundingClientRect();

    // Check if showcase is in or leaving viewport
    if (showcaseRect.bottom > 0) {
      const scrollRatio = Math.min(Math.max(scrollY / windowHeight, 0), 1);
      
      // Move up 0 -> -32px, scale 1.0 -> 1.04
      const translateY = -scrollRatio * 32;
      const scale = 1.0 + (scrollRatio * 0.04);

      imageWrapper.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    }
  }, { passive: true });

  // IntersectionObserver for Section C Reveal
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -60px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target); // Trigger once
      }
    });
  }, observerOptions);

  if (scrollHeader) observer.observe(scrollHeader);
  featureCards.forEach((card) => observer.observe(card));

  // CTA button interaction feedback
  const exploreBtn = document.getElementById('exploreBtn');
  if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
      const featuresSec = document.getElementById('features-section');
      if (featuresSec) {
        featuresSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
