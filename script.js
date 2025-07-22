// ============================================
// INICIALIZACIÓN DE SWIPER JS PARA HABILIDADES
// Configuración óptima con loop, autoplay y responsive
// ============================================

// Navegación y efectos de scroll
class PortfolioController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.contactForm = document.getElementById('contact-form');
        this.skillsSwiper = null; // Instancia de Swiper para habilidades
        
        this.init();
    }
    
    init() {
        this.setupScrollEffects();
        this.setupNavigation();
        this.setupAnimations();
        this.setupContactForm();
        this.setupSmoothScrolling();
        this.initSkillsCarousel(); // ¡Inicializar el carrusel de habilidades!
    }
    
    // ============================================
    // CONFIGURACIÓN DEL CARRUSEL DE HABILIDADES
    // ============================================
    initSkillsCarousel() {
        // Verificar que Swiper esté disponible
        if (typeof Swiper === 'undefined') {
            console.error('Swiper no está cargado');
            return;
        }

        // Inicializar Swiper con la configuración más brutal
        this.skillsSwiper = new Swiper('.skills-swiper', {
            // Configuración básica
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            
            // Loop infinito y autoplay suave
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            
            // Velocidad de transición suave
            speed: 800,
            
            // Efecto de transición elegante
            effect: 'slide',
            
            // Navegación
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // Paginación
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            
            // Configuración responsive (1-3 slides según pantalla)
            breakpoints: {
                // Móvil: 1 slide
                320: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    centeredSlides: true,
                },
                // Tablet: 2 slides
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                    centeredSlides: false,
                },
                // Desktop: 3 slides
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                    centeredSlides: false,
                }
            },
            
            // Eventos para interacciones mejoradas
            on: {
                init: function() {
                    console.log('🎯 Carrusel de habilidades inicializado correctamente');
                },
                slideChange: function() {
                    // Añadir efecto de pulso a la slide activa
                    const activeSlide = this.slides[this.activeIndex];
                    if (activeSlide) {
                        const skillCard = activeSlide.querySelector('.skill-card');
                        if (skillCard) {
                            skillCard.style.transform = 'scale(1.05)';
                            setTimeout(() => {
                                skillCard.style.transform = '';
                            }, 300);
                        }
                    }
                },
                touchStart: function() {
                    // Pausar autoplay al tocar
                    this.autoplay.stop();
                },
                touchEnd: function() {
                    // Reanudar autoplay después de tocar
                    setTimeout(() => {
                        this.autoplay.start();
                    }, 3000);
                }
            }
        });

        // Mejorar la interacción con las tarjetas de habilidades
        this.setupSkillCardInteractions();
    }
    
    // Configurar interacciones mejoradas con las tarjetas
    setupSkillCardInteractions() {
        document.querySelectorAll('.skill-card').forEach(card => {
            // Efecto hover mejorado
            card.addEventListener('mouseenter', () => {
                // Pausar autoplay al hacer hover
                if (this.skillsSwiper && this.skillsSwiper.autoplay) {
                    this.skillsSwiper.autoplay.stop();
                }
            });
            
            card.addEventListener('mouseleave', () => {
                // Reanudar autoplay al salir del hover
                if (this.skillsSwiper && this.skillsSwiper.autoplay) {
                    setTimeout(() => {
                        this.skillsSwiper.autoplay.start();
                    }, 1000);
                }
            });
            
            // Click para mostrar información adicional
            card.addEventListener('click', () => {
                const skillName = card.dataset.skill;
                this.showSkillInfo(skillName, card);
            });
        });
    }
    
    // Mostrar información detallada de la habilidad
    showSkillInfo(skillName, element) {
        const skillDetails = {
            'HTML/CSS': {
                title: 'Frontend Fundamentals',
                description: 'HTML5 semántico, CSS3 moderno con Flexbox y Grid. Animaciones, responsive design y arquitectura CSS escalable.',
                level: '95%',
                experience: '+3 años'
            },
            'JavaScript': {
                title: 'JavaScript Moderno',
                description: 'ES6+, manipulación del DOM, APIs REST, programación asíncrona y patrones de diseño modernos.',
                level: '90%',
                experience: '+3 años'
            },
            'Java': {
                title: 'Backend Development',
                description: 'Programación orientada a objetos, JDBC, desarrollo de aplicaciones CLI y estructuras de datos.',
                level: '85%',
                experience: '+2 años'
            },
            'SQL': {
                title: 'Database Management',
                description: 'Consultas complejas, JOINs, optimización de bases de datos relacionales y diseño de esquemas.',
                level: '80%',
                experience: '+2 años'
            },
            'Tailwind': {
                title: 'CSS Framework',
                description: 'Framework utility-first para desarrollo rápido, responsive design y sistemas de diseño escalables.',
                level: '88%',
                experience: '+1 año'
            },
            'APIs': {
                title: 'API Integration',
                description: 'Integración con APIs REST, manejo de datos asíncronos, autenticación y optimización de requests.',
                level: '85%',
                experience: '+2 años'
            },
            'Git': {
                title: 'Version Control',
                description: 'Control de versiones, trabajo colaborativo, branching strategies y flujo de trabajo con GitHub.',
                level: '90%',
                experience: '+3 años'
            },
            'Tools': {
                title: 'Development Tools',
                description: 'VS Code, herramientas de build modernas, debugging, testing y optimización de workflow.',
                level: '92%',
                experience: '+3 años'
            }
        };
        
        const skill = skillDetails[skillName];
        if (!skill) return;
        
        // Crear modal informativo brutal
        const modal = document.createElement('div');
        modal.className = 'skill-modal';
        modal.innerHTML = `
            <div class="skill-modal-content">
                <button class="skill-modal-close">&times;</button>
                <div class="skill-modal-header">
                    <h3>${skill.title}</h3>
                    <div class="skill-level-bar">
                        <div class="skill-level-fill" style="width: ${skill.level}"></div>
                        <span class="skill-level-text">${skill.level}</span>
                    </div>
                </div>
                <p class="skill-modal-description">${skill.description}</p>
                <div class="skill-modal-meta">
                    <span class="skill-experience">Experiencia: ${skill.experience}</span>
                </div>
            </div>
        `;
        
        // Estilos del modal
        Object.assign(modal.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '9999',
            opacity: '0',
            transition: 'opacity 0.3s ease'
        });
        
        document.body.appendChild(modal);
        
        // Animar entrada
        setTimeout(() => modal.style.opacity = '1', 10);
        
        // Cerrar modal
        const closeModal = () => {
            modal.style.opacity = '0';
            setTimeout(() => document.body.removeChild(modal), 300);
        };
        
        modal.querySelector('.skill-modal-close').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        
        // Cerrar con Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }
    
    // Efectos de scroll en la navegación
    setupScrollEffects() {
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Agregar clase scrolled al navbar
            if (currentScrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
            
            // Actualizar enlace activo en la navegación
            this.updateActiveNavLink();
            
            lastScrollY = currentScrollY;
        });
    }
    
    // Configurar navegación mobile
    setupNavigation() {
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', (e) => {
            if (!this.navMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            }
        });
    }
    
    // Actualizar enlace activo en la navegación
    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Configurar animaciones de entrada
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observar elementos para animaciones (actualizado para el nuevo carrusel)
        document.querySelectorAll('.skill-card, .project-card, .service-card').forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
        
        // Animaciones específicas por sección
        document.querySelectorAll('.about-content .about-text').forEach(el => {
            el.classList.add('slide-in-left');
            observer.observe(el);
        });
        
        document.querySelectorAll('.skills-grid').forEach(el => {
            el.classList.add('slide-in-right');
            observer.observe(el);
        });
    }
    
    // Configurar formulario de contacto
    setupContactForm() {
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(e.target);
        });
        
        // Efectos en inputs
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
    
    // Manejar envío del formulario
    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Mostrar mensaje de carga
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simular envío (aquí integrarías con tu backend)
        setTimeout(() => {
            this.showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
        
        console.log('Datos del formulario:', data);
    }
    
    // Mostrar notificaciones
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Estilos para la notificación
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '9999',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
        });
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    // Configurar scroll suave
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const targetPosition = target.offsetTop - 80; // Ajustar por navbar
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Efectos adicionales para mejorar la interactividad
class PortfolioEffects {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupProjectHovers();
        this.setupSkillInteractions();
        this.setupParallaxEffects();
        this.setupTypewriterEffect();
    }
    
    // Efectos hover en proyectos
    setupProjectHovers() {
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) rotateX(5deg)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0deg)';
            });
        });
    }
    
    // Interacciones con skills
    setupSkillInteractions() {
        document.querySelectorAll('.skill-item').forEach(skill => {
            skill.addEventListener('click', () => {
                const skillName = skill.dataset.skill;
                this.showSkillInfo(skillName, skill);
            });
        });
    }
    
    // Mostrar información de skill
    showSkillInfo(skillName, element) {
        const info = {
            'JavaScript': 'Experiencia con ES6+, DOM manipulation, APIs REST, y desarrollo frontend moderno.',
            'HTML/CSS': 'HTML5 semántico, CSS3 moderno, Flexbox, Grid, animaciones y responsive design.',
            'Tailwind': 'Framework CSS utility-first para desarrollo rápido y mantenible.',
            'APIs': 'Integración con APIs REST, manejo de datos asíncronos con Fetch y AJAX.',
            'Git': 'Control de versiones, colaboración en equipo, workflow con GitHub.',
            'Tools': 'Herramientas de desarrollo modernas: Webpack, Vite, NPM, DevTools.'
        };
        
        if (info[skillName]) {
            // Crear tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'skill-tooltip';
            tooltip.textContent = info[skillName];
            
            Object.assign(tooltip.style, {
                position: 'absolute',
                background: 'var(--bg-dark)',
                color: 'white',
                padding: '1rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                maxWidth: '250px',
                zIndex: '1000',
                transform: 'translateX(-50%)',
                opacity: '0',
                transition: 'opacity 0.3s ease'
            });
            
            document.body.appendChild(tooltip);
            
            const rect = element.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = rect.bottom + 10 + 'px';
            
            setTimeout(() => tooltip.style.opacity = '1', 100);
            
            // Remover tooltip después de 3 segundos
            setTimeout(() => {
                tooltip.style.opacity = '0';
                setTimeout(() => document.body.removeChild(tooltip), 300);
            }, 3000);
        }
    }
    
    // Efectos parallax sutiles
    setupParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-card');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px) rotate(5deg)`;
            });
        });
    }
    
    // Efecto typewriter en el hero
    setupTypewriterEffect() {
        const roles = ['Frontend Developer', 'Web Designer', 'JavaScript Expert', 'UI/UX Enthusiast'];
        const roleElement = document.querySelector('.hero-role');
        
        if (roleElement) {
            let currentRole = 0;
            let currentChar = 0;
            let isDeleting = false;
            
            const typeWriter = () => {
                const currentText = roles[currentRole];
                
                if (isDeleting) {
                    roleElement.textContent = currentText.substring(0, currentChar - 1);
                    currentChar--;
                } else {
                    roleElement.textContent = currentText.substring(0, currentChar + 1);
                    currentChar++;
                }
                
                let speed = isDeleting ? 50 : 100;
                
                if (!isDeleting && currentChar === currentText.length) {
                    speed = 2000; // Pausa al completar
                    isDeleting = true;
                } else if (isDeleting && currentChar === 0) {
                    isDeleting = false;
                    currentRole = (currentRole + 1) % roles.length;
                    speed = 500;
                }
                
                setTimeout(typeWriter, speed);
            };
            
            // Iniciar después de 2 segundos
            setTimeout(typeWriter, 2000);
        }
    }
}

// Utilidades adicionales
class PortfolioUtils {
    static detectDevice() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
        const isDesktop = window.innerWidth > 1024;
        
        document.body.classList.toggle('mobile', isMobile);
        document.body.classList.toggle('tablet', isTablet);
        document.body.classList.toggle('desktop', isDesktop);
    }
    
    static setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    static setupPerformanceOptimizations() {
        // Preload critical resources
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.href = 'styles.css';
        preloadLink.as = 'style';
        document.head.appendChild(preloadLink);
        
        // Lazy load non-critical CSS
        const loadCSS = (href) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            link.media = 'print';
            link.onload = () => { link.media = 'all'; };
            document.head.appendChild(link);
        };
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Detectar dispositivo
    PortfolioUtils.detectDevice();
    window.addEventListener('resize', PortfolioUtils.detectDevice);
    
    // Inicializar clases principales
    new PortfolioController();
    new PortfolioEffects();
    
    // Configurar optimizaciones
    PortfolioUtils.setupLazyLoading();
    PortfolioUtils.setupPerformanceOptimizations();
    
    // Scroll al inicio en refresh
    window.scrollTo(0, 0);
    
    console.log('🚀 Portfolio cargado correctamente');
});

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Manejo de errores globales
window.addEventListener('error', (e) => {
    console.error('Error capturado:', e.error);
});

// Eventos de teclado para accesibilidad
document.addEventListener('keydown', (e) => {
    // Navegación con Tab más fluida
    if (e.key === 'Tab') {
        document.body.classList.add('using-keyboard');
    }
    
    // Cerrar modales con Escape
    if (e.key === 'Escape') {
        // Cerrar menú mobile si está abierto
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('using-keyboard');
});

// Analytics (Google Analytics, etc.)
// gtag('config', 'GA_TRACKING_ID');

export { PortfolioController, PortfolioEffects, PortfolioUtils };