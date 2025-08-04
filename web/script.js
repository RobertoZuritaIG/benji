// Modal Términos y Condiciones
document.addEventListener('DOMContentLoaded', function() {
  // Modal Política de Privacidad
  var privacidadLink = document.getElementById('privacidadLink');
  var modalPrivacidad = document.getElementById('modalPrivacidad');
  var closePrivacidad = document.getElementById('closePrivacidad');

  if (privacidadLink && modalPrivacidad && closePrivacidad) {
    privacidadLink.addEventListener('click', function(e) {
      e.preventDefault();
      modalPrivacidad.style.display = 'block';
      setTimeout(function() {
        modalPrivacidad.classList.add('active');
      }, 10);
    });
    closePrivacidad.addEventListener('click', function() {
      modalPrivacidad.classList.remove('active');
      setTimeout(function() {
        modalPrivacidad.style.display = 'none';
      }, 300);
    });
    window.addEventListener('click', function(e) {
      if (e.target === modalPrivacidad) {
        modalPrivacidad.classList.remove('active');
        setTimeout(function() {
          modalPrivacidad.style.display = 'none';
        }, 300);
      }
    });
  }
  var terminosLink = document.getElementById('terminosLink');
  var modal = document.getElementById('modalTerminos');
  var closeBtn = document.getElementById('closeTerminos');

  if (terminosLink && modal && closeBtn) {
    terminosLink.addEventListener('click', function(e) {
      e.preventDefault();
      modal.classList.add('active');
    });
    closeBtn.addEventListener('click', function() {
      modal.classList.remove('active');
    });
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
});
// Professional JavaScript for Mudanzas Benji Website
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVIGATION FUNCTIONALITY =====
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Mobile menu toggle with enhanced animation
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Enhanced header scroll effect
    if (header) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class for styling
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // ===== SMOOTH SCROLLING FOR NAVIGATION LINKS =====
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // ===== INTERSECTION OBSERVER FOR ACTIVE NAVIGATION =====
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (activeLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // ===== TRUCK GALLERY FUNCTIONALITY =====
    const mainImage = document.querySelector('#mainTruckImage');
    const thumbnails = document.querySelectorAll('.thumbnail');

    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const newImageSrc = this.getAttribute('data-image');
                
                if (newImageSrc && mainImage.src !== newImageSrc) {
                    // Remove active class from all thumbnails
                    thumbnails.forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked thumbnail
                    this.classList.add('active');
                    
                    // Fade out current image
                    mainImage.style.opacity = '0.5';
                    
                    // Change image after fade
                    setTimeout(() => {
                        mainImage.src = newImageSrc;
                        mainImage.style.opacity = '1';
                        
                        // Add a subtle scale animation
                        mainImage.style.transform = 'scale(1.02)';
                        setTimeout(() => {
                            mainImage.style.transform = 'scale(1)';
                        }, 200);
                    }, 150);
                }
            });
        });

        // Keyboard navigation for gallery
        document.addEventListener('keydown', function(e) {
            const activeThumbnail = document.querySelector('.thumbnail.active');
            let nextThumbnail = null;
            
            if (e.key === 'ArrowLeft') {
                nextThumbnail = activeThumbnail.previousElementSibling;
            } else if (e.key === 'ArrowRight') {
                nextThumbnail = activeThumbnail.nextElementSibling;
            }
            
            if (nextThumbnail && nextThumbnail.classList.contains('thumbnail')) {
                nextThumbnail.click();
            }
        });
    }

    // ===== ENHANCED FORM FUNCTIONALITY =====
    const cotizacionForm = document.querySelector('#cotizacionForm');
    const mensajeConfirmacion = document.querySelector('#mensajeConfirmacion');

    if (cotizacionForm) {
        // Real-time form validation
        const formInputs = cotizacionForm.querySelectorAll('input[required], select[required]');
        
        formInputs.forEach(input => {
            // Validation on blur
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Clear validation on focus
            input.addEventListener('focus', function() {
                clearFieldValidation(this);
            });
            
            // Real-time validation for specific fields
            if (input.type === 'email') {
                input.addEventListener('input', function() {
                    if (this.value.length > 0) {
                        validateEmail(this);
                    }
                });
            }
            
            if (input.type === 'tel') {
                input.addEventListener('input', function() {
                    // Format phone number as user types
                    formatPhoneNumber(this);
                });
            }
        });

        // Enhanced form submission
        cotizacionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Show loading state
                const submitBtn = cotizacionForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual submission)
                setTimeout(() => {
                    // Submit form data
                    const formData = new FormData(cotizacionForm);
                    
                    // Here you would normally send to your backend
                    // For now, we'll show the confirmation message
                    showConfirmationMessage();
                    
                    // Reset form
                    cotizacionForm.reset();
                    
                    // Restore button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                // Scroll to first error
                const firstError = cotizacionForm.querySelector('.form-group.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    // ===== FORM VALIDATION FUNCTIONS =====
    function validateField(field) {
        const fieldGroup = field.closest('.form-group');
        const errorSpan = fieldGroup.querySelector('.error-message');
        
        // Remove existing errors
        fieldGroup.classList.remove('error');
        if (errorSpan) errorSpan.textContent = '';
        
        let isValid = true;
        let errorMessage = '';
        
        // Required field validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }
        
        // Specific validations
        if (field.value.trim() && field.type === 'email') {
            if (!isValidEmail(field.value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un email válido';
            }
        }
        
        if (field.value.trim() && field.type === 'tel') {
            if (!isValidPhone(field.value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un teléfono válido';
            }
        }
        
        if (field.type === 'date' && field.value) {
            const selectedDate = new Date(field.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                isValid = false;
                errorMessage = 'La fecha debe ser igual o posterior a hoy';
            }
        }
        
        // Show error if validation failed
        if (!isValid) {
            fieldGroup.classList.add('error');
            if (errorSpan) errorSpan.textContent = errorMessage;
        }
        
        return isValid;
    }

    function clearFieldValidation(field) {
        const fieldGroup = field.closest('.form-group');
        fieldGroup.classList.remove('error');
        const errorSpan = fieldGroup.querySelector('.error-message');
        if (errorSpan) errorSpan.textContent = '';
    }

    function validateEmail(field) {
        if (isValidEmail(field.value)) {
            clearFieldValidation(field);
            return true;
        }
        return false;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    function formatPhoneNumber(input) {
        let value = input.value.replace(/\D/g, '');
        
        if (value.startsWith('56')) {
            // Chilean format
            if (value.length <= 11) {
                value = value.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '+$1 $2 $3 $4');
            }
        } else if (value.length <= 9) {
            // Local format
            value = value.replace(/(\d{1})(\d{4})(\d{4})/, '$1 $2 $3');
        }
        
        input.value = value;
    }

    // ===== CONFIRMATION MESSAGE FUNCTIONALITY =====
    function showConfirmationMessage() {
        if (mensajeConfirmacion) {
            mensajeConfirmacion.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Add entrance animation
            setTimeout(() => {
                mensajeConfirmacion.classList.add('show');
            }, 10);
        }
    }

    function cerrarMensaje() {
        if (mensajeConfirmacion) {
            mensajeConfirmacion.classList.remove('show');
            setTimeout(() => {
                mensajeConfirmacion.style.display = 'none';
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // Make cerrarMensaje globally available
    window.cerrarMensaje = cerrarMensaje;

    // ===== SCROLL ANIMATIONS =====
    const animatedElements = document.querySelectorAll('.servicio-card, .ventaja-card, .testimonio-card, .spec-item');
    
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });

    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Preload critical images
    const criticalImages = [
        'images/Screenshot_1.png',
        'images/Screenshot_3.png',
        'images/Screenshot_4.jpeg'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });

    // ===== ACCESSIBILITY ENHANCEMENTS =====
    
    // Skip to main content functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#inicio';
    skipLink.textContent = 'Saltar al contenido principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Focus management for mobile menu
    if (navMenu) {
        navMenu.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navToggle.click();
                navToggle.focus();
            }
        });
    }

    // ===== WHATSAPP BUTTON ENHANCEMENT =====
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    if (whatsappBtn) {
        // Add click tracking
        whatsappBtn.addEventListener('click', function() {
            // Track WhatsApp click (for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    event_category: 'Contact',
                    event_label: 'WhatsApp Button'
                });
            }
        });

        // Show/hide based on scroll position
        let whatsappVisible = true;
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Hide when near footer
            if (scrollPosition + windowHeight > documentHeight - 200) {
                if (whatsappVisible) {
                    whatsappBtn.style.transform = 'translateY(100px)';
                    whatsappVisible = false;
                }
            } else {
                if (!whatsappVisible) {
                    whatsappBtn.style.transform = 'translateY(0)';
                    whatsappVisible = true;
                }
            }
        });
    }

    // ===== CONSOLE WELCOME MESSAGE =====
    console.log('%c🚛 Mudanzas Benji - Professional Website', 'color: #2563eb; font-size: 16px; font-weight: bold;');
    console.log('%cWebsite developed with modern technologies for optimal performance', 'color: #64748b; font-size: 12px;');
});

// ===== CSS ANIMATIONS (Added dynamically) =====
const animationStyles = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }

    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .form-group.error input,
    .form-group.error select,
    .form-group.error textarea {
        border-color: #ef4444;
        box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
    }

    .error-message {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    }

    .skip-link:focus {
        top: 6px !important;
    }

    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }

    .lazy.loaded {
        opacity: 1;
    }

    .mensaje-confirmacion.show {
        animation: fadeInModal 0.3s ease-out;
    }

    @keyframes fadeInModal {
        from {
            opacity: 0;
            backdrop-filter: blur(0px);
        }
        to {
            opacity: 1;
            backdrop-filter: blur(8px);
        }
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
