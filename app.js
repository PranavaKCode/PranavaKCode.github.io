@@ -0,0 +1,533 @@
// DOM elements
const loading = document.getElementById('loading');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.getElementById('scrollTop');
const contactForm = document.querySelector('.contact-form');
const sections = document.querySelectorAll('.section');
const typewriterElement = document.getElementById('typewriter');

// Typewriter effect configuration
const typewriterWords = ['engineer', 'designer', 'creative thinker', 'student', 'architect'];
let currentWordIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typewriterTimeout;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Hide loading screen after a short delay
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1500);

    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initContactForm();
    initTypewriter();
});

// Typewriter effect functionality
function initTypewriter() {
    if (!typewriterElement) return;
    
    // Start the typewriter effect after a brief delay
    setTimeout(() => {
        typewriterEffect();
    }, 2000);
}

function typewriterEffect() {
    const currentWord = typewriterWords[currentWordIndex];
    
    if (isDeleting) {
        // Remove character
        typewriterElement.textContent = currentWord.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        // If word is completely deleted
        if (currentCharIndex === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % typewriterWords.length;
            // Pause before typing next word
            typewriterTimeout = setTimeout(typewriterEffect, 500);
            return;
        }
        
        // Continue deleting with faster speed
        typewriterTimeout = setTimeout(typewriterEffect, 50);
        
    } else {
        // Add character
        typewriterElement.textContent = currentWord.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        // If word is completely typed
        if (currentCharIndex === currentWord.length) {
            isDeleting = true;
            // Pause before starting to delete
            typewriterTimeout = setTimeout(typewriterEffect, 2000);
            return;
        }
        
        // Continue typing with realistic speed
        typewriterTimeout = setTimeout(typewriterEffect, 100);
    }
}

// Navigation functionality
function initNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Update active link
                updateActiveNavLink(link);
            }
        });
    });

    // Handle hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const href = button.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Update active navigation link based on scroll position
    window.addEventListener('scroll', updateActiveNavOnScroll);
}

// Update active navigation link
function updateActiveNavLink(activeLink) {
    navLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

// Update active navigation link based on scroll position
function updateActiveNavOnScroll() {
    const scrollPos = window.scrollY + 100; // Offset for nav height
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                updateActiveNavLink(activeLink);
            }
        }
    });
}

// Scroll effects functionality
function initScrollEffects() {
    // Scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Navbar background on scroll
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(31, 33, 33, 0.98)';
        } else {
            nav.style.background = 'rgba(31, 33, 33, 0.95)';
        }
    });
}

// Animation functionality using Intersection Observer
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation classes based on element type
                if (element.classList.contains('section')) {
                    element.classList.add('fade-in');
                }
                
                // Animate cards with staggered effect
                const cards = element.querySelectorAll('.card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        if (index % 2 === 0) {
                            card.classList.add('slide-in-left');
                        } else {
                            card.classList.add('slide-in-right');
                        }
                    }, index * 100);
                });

                // Animate skill tags
                const skillTags = element.querySelectorAll('.skill-tag');
                skillTags.forEach((tag, index) => {
                    setTimeout(() => {
                        tag.style.opacity = '0';
                        tag.style.transform = 'translateY(20px)';
                        tag.style.transition = 'all 0.5s ease';
                        
                        setTimeout(() => {
                            tag.style.opacity = '1';
                            tag.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 50);
                });

                // Stop observing once animated
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe hero section separately
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }
}

// Contact form functionality
function initContactForm() {
    if (contactForm) {
        const form = contactForm.querySelector('form') || contactForm;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Create mailto link as fallback
                const mailtoLink = `mailto:PranavaKCode@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Show success message
                showNotification('Message prepared! Your email client should open shortly.', 'success');
                
                // Reset form
                form.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification status status--${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '10000';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = 'var(--radius-base)';
    notification.style.boxShadow = 'var(--shadow-lg)';
    notification.style.maxWidth = '400px';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'all 0.3s ease';
    
    // Add to document
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Smooth scrolling for browsers that don't support scroll-behavior: smooth
function smoothScrollTo(element, duration = 1000) {
    const targetPosition = element.offsetTop - 70; // Account for fixed nav
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    // Easing function
    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Handle external links
document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && link.href.startsWith('http') && !link.href.includes(window.location.hostname)) {
        // External link - ensure it opens in new tab
        if (!link.hasAttribute('target')) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    }
});

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Enter or Space on scroll-to-top button
    if ((e.key === 'Enter' || e.key === ' ') && e.target === scrollTopBtn) {
        e.preventDefault();
        scrollTopBtn.click();
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateActiveNavOnScroll();
}, 16); // ~60fps

window.removeEventListener('scroll', updateActiveNavOnScroll);
window.addEventListener('scroll', throttledScrollHandler);

// Handle resize events for responsive adjustments
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Preload animations
function preloadAnimations() {
    // Ensure CSS animations are ready
    document.body.style.visibility = 'visible';
}

// Initialize preload
preloadAnimations();

// Add loading states to buttons
function addLoadingState(button, originalText = 'Loading...') {
    button.disabled = true;
    button.style.opacity = '0.7';
    button.textContent = originalText;
}

function removeLoadingState(button, originalText) {
    button.disabled = false;
    button.style.opacity = '1';
    button.textContent = originalText;
}

// Enhanced error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // Could show user-friendly error message in production
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page became visible - restart typewriter if it was paused
        if (typewriterElement && !typewriterTimeout) {
            initTypewriter();
        }
    } else {
        // Page became hidden - could pause typewriter
        if (typewriterTimeout) {
            clearTimeout(typewriterTimeout);
            typewriterTimeout = null;
        }
    }
});

// Initialize accessibility features
function initAccessibility() {
    // Add skip link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.background = 'var(--color-primary)';
    skipLink.style.color = 'white';
    skipLink.style.padding = '8px';
    skipLink.style.textDecoration = 'none';
    skipLink.style.borderRadius = '4px';
    skipLink.style.zIndex = '10000';
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.setAttribute('id', 'main');
        heroSection.setAttribute('role', 'main');
    }
}

// Initialize accessibility features
initAccessibility();

// Cleanup function for typewriter effect
function cleanupTypewriter() {
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
        typewriterTimeout = null;
    }
}

// Handle page unload
window.addEventListener('beforeunload', () => {
    cleanupTypewriter();
});

console.log('Portfolio website with typewriter effect initialized successfully!');

// ============================= 
// PARTICLE NETWORK ANIMATION
// =============================

class ParticleNetwork {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    
    // Use the site's teal color scheme
    this.particleColor = 'rgba(33, 128, 141, 0.8)'; // --color-teal-500
    this.lineColor = 'rgba(50, 184, 198, 0.15)'; // --color-teal-300 with low opacity
    
    this.resize();
    this.init();
    this.animate();
    
    // Event listeners
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    window.addEventListener('mouseout', () => this.handleMouseOut());
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    
    // Recalculate particle count based on screen size
    this.particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    
    // Reinitialize particles on resize
    if (this.particles.length > 0) {
      this.init();
    }
  }
  
  init() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(new Particle(this.canvas.width, this.canvas.height));
    }
  }
  
  handleMouseMove(e) {
    this.mouse.x = e.x;
    this.mouse.y = e.y;
  }
  
  handleMouseOut() {
    this.mouse.x = null;
    this.mouse.y = null;
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update(this.canvas.width, this.canvas.height, this.mouse);
      this.particles[i].draw(this.ctx, this.particleColor);
    }
    
    // Connect particles with lines
    this.connectParticles();
    
    requestAnimationFrame(() => this.animate());
  }
  
  connectParticles() {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Draw line if particles are close enough
        if (distance < 120) {
          const opacity = 1 - (distance / 120);
          this.ctx.strokeStyle = this.lineColor.replace('0.15', String(opacity * 0.15));
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }
}

class Particle {
  constructor(canvasWidth, canvasHeight) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
  }
  
  update(canvasWidth, canvasHeight, mouse) {
    // Bounce off edges
    if (this.x < 0 || this.x > canvasWidth) this.vx = -this.vx;
    if (this.y < 0 || this.y > canvasHeight) this.vy = -this.vy;
    
    // Mouse interaction - particles move away from cursor
    if (mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (mouse.radius - distance) / mouse.radius;
        this.vx += Math.cos(angle) * force * 0.2;
        this.vy += Math.sin(angle) * force * 0.2;
      }
    }
    
    // Apply friction
    this.vx *= 0.99;
    this.vy *= 0.99;
    
    // Update position
    this.x += this.vx;
    this.y += this.vy;
  }
  
  draw(ctx, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Initialize particle network after DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initParticleNetwork);
} else {
  initParticleNetwork();
}

function initParticleNetwork() {
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    new ParticleNetwork(canvas);
    console.log('Particle network initialized!');
  }
}

