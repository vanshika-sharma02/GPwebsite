// Scroll Animation System
class ScrollAnimations {
  constructor() {
    this.elements = [];
    this.threshold = 0.1;
    this.rootMargin = '0px 0px -100px 0px';
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }

  setup() {
    // Find all elements with animation classes
    this.elements = document.querySelectorAll(
      '.fade-in-section, .fade-in-left, .fade-in-right, .fade-in-scale, .slide-in-up, .text-fade-in, .btn-animate, .card-animate, .image-animate'
    );

    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      {
        threshold: this.threshold,
        rootMargin: this.rootMargin
      }
    );

    // Observe all elements
    this.elements.forEach(el => {
      this.observer.observe(el);
    });

    // Add smooth scrolling enhancement
    this.enhanceSmoothScrolling();
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        
        // Add staggered animation delay for multiple elements
        const siblings = Array.from(entry.target.parentNode.children);
        const index = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = `${index * 0.1}s`;
        
        // Unobserve after animation to improve performance
        this.observer.unobserve(entry.target);
      }
    });
  }

  enhanceSmoothScrolling() {
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Add momentum scrolling for mobile
    if ('ontouchstart' in window) {
      document.body.style.webkitOverflowScrolling = 'touch';
    }
  }

  // Method to manually trigger animations (useful for dynamic content)
  triggerAnimation(element) {
    if (element && !element.classList.contains('animate')) {
      element.classList.add('animate');
    }
  }

  // Method to reset animations (useful for page transitions)
  resetAnimations() {
    this.elements.forEach(el => {
      el.classList.remove('animate');
      el.style.transitionDelay = '';
    });
  }

  // Method to add new elements to observe
  observeNewElements() {
    const newElements = document.querySelectorAll(
      '.fade-in-section:not([data-observed]), .fade-in-left:not([data-observed]), .fade-in-right:not([data-observed]), .fade-in-scale:not([data-observed]), .slide-in-up:not([data-observed]), .text-fade-in:not([data-observed]), .btn-animate:not([data-observed]), .card-animate:not([data-observed]), .image-animate:not([data-observed])'
    );
    
    newElements.forEach(el => {
      el.setAttribute('data-observed', 'true');
      this.observer.observe(el);
    });
  }
}

// Initialize scroll animations
const scrollAnimations = new ScrollAnimations();

// Export for use in other files
export default scrollAnimations;
