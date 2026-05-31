document.addEventListener('DOMContentLoaded', () => {
    // 1. Splash Preloader Loading
    const preloader = document.querySelector('.preloader');
    const loaderBarFill = document.querySelector('.loader-bar-fill');
    const loaderNumber = document.querySelector('.loader-number');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 8) + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('fade-out');
                // Trigger scroll animations (AOS) if loaded
                if (typeof AOS !== 'undefined') {
                    AOS.refresh();
                }
            }, 500);
        }
        loaderBarFill.style.width = `${progress}%`;
        loaderNumber.textContent = `${progress}%`;
    }, 40);

    // 2. Custom Cursor Trail
    const cursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.custom-cursor-trail');
    
    if (cursor && cursorTrail) {
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            // Instantly move the core dot
            cursor.style.left = `${posX}px`;
            cursor.style.top = `${posY}px`;
            
            // Move outer ring with transition/lag
            cursorTrail.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards" });
        });

        // Expand cursor on hover
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .theme-toggle, [role="button"]');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('hover-active');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('hover-active');
            });
        });
    }

    // 3. Dark/Light Theme Switching
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    
    // Check local storage or system preference
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'light') {
            themeIcon.className = 'fas fa-moon text-lg';
        } else {
            themeIcon.className = 'fas fa-sun text-lg';
        }
    }

    // 4. Elegant Custom Typing Effect
    const typingSpan = document.getElementById('typing-text');
    if (typingSpan) {
        const words = ["Web Designing & Development Student", "Frontend Developer", "UI/UX Design Enthusiast", "Creative Designer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingSpan.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingSpan.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 1500; // Delay when word is completed
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Delay before starting next word
            }

            setTimeout(type, typeSpeed);
        }
        
        setTimeout(type, 1000);
    }

    // 5. Mouse Reactive Glow Cards Hover Spotlight
    const glowCards = document.querySelectorAll('.glow-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 6. Sticky Navbar glass blur & Scroll-To-Top button reveal
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('py-4', 'shadow-2xl');
            navbar.classList.remove('py-6');
            navbar.style.background = 'var(--nav-bg)';
            navbar.style.backdropFilter = 'blur(14px)';
        } else {
            navbar.classList.add('py-6');
            navbar.classList.remove('py-4', 'shadow-2xl');
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
        }

        if (window.scrollY > 600) {
            backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
            backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
        }
    });

    // 7. Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            document.body.classList.toggle('mobile-menu-active');
            
            // Toggle hamburger icon animation
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.className = 'fas fa-times text-2xl';
            } else {
                icon.className = 'fas fa-bars text-2xl';
            }
        });

        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                document.body.classList.remove('mobile-menu-active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars text-2xl';
            });
        });
    }

    // 8. Skill progress bar filling and counter animations
    const skillsSection = document.getElementById('about'); // Trigger counters early in about
    let statAnimationTriggered = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate progress bars
                const progressBars = document.querySelectorAll('.skill-bar-fill');
                progressBars.forEach(bar => {
                    const widthVal = bar.getAttribute('data-width');
                    bar.style.width = `${widthVal}%`;
                });

                // Animate Counters
                if (!statAnimationTriggered) {
                    const counters = document.querySelectorAll('.counter-val');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const speed = target > 100 ? 30 : 1;
                        let count = 0;
                        
                        const updateCount = () => {
                            const increment = target / 50;
                            if (count < target) {
                                count += increment;
                                counter.textContent = Math.ceil(count);
                                setTimeout(updateCount, speed);
                            } else {
                                counter.textContent = target;
                            }
                        };
                        updateCount();
                    });
                    statAnimationTriggered = true;
                }
            }
        });
    }, { threshold: 0.15 });

    if (skillsSection) {
        observer.observe(skillsSection);
    }



    // 10. Contact Form Submit Banner Validation
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');
    
    if (contactForm && formFeedback) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const submitText = submitBtn.querySelector('.submit-text');
            const submitIcon = submitBtn.querySelector('i');
            
            // Show loading animation on button
            submitText.textContent = "Sending Message...";
            submitIcon.className = "fas fa-spinner fa-spin text-sm";
            submitBtn.disabled = true;
            
            // Simulate form submission delay
            setTimeout(() => {
                contactForm.reset();
                submitText.textContent = "Send Message";
                submitIcon.className = "fas fa-paper-plane text-sm";
                submitBtn.disabled = false;
                
                // Show floating feedback banner
                formFeedback.innerHTML = `
                    <div class="flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl backdrop-blur-md shadow-lg animate-bounce duration-700">
                        <i class="fas fa-check-circle text-lg"></i>
                        <span>Thank you! Your message has been sent successfully. Aliza will contact you soon.</span>
                    </div>
                `;
                
                // Hide banner after 5 seconds
                setTimeout(() => {
                    formFeedback.innerHTML = '';
                }, 5000);
            }, 1800);
        });
    }

    // 11. Navigation Scroll Spy (Highlighting current section link)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    // 12. Skills Marquee - Clone items for infinite seamless loop
    document.querySelectorAll('.skills-marquee-inner').forEach(track => {
        const items = [...track.children];
        items.forEach(item => {
            const clone = item.cloneNode(true);
            track.appendChild(clone);
        });
    });
});
