// ===========================
// RETRO PORTFOLIO WITH DINO INTRO
// ===========================

// ===========================
// DINO GAME INTRO SEQUENCE
// ===========================
let introActive = true;
let dinoGame = null;

document.addEventListener('DOMContentLoaded', function () {

    // Start with intro sequence
    startIntroSequence();

    // ===========================
    // INTRO SEQUENCE CONTROLLER
    // ===========================
    function startIntroSequence() {
        const errorScreen = document.getElementById('error-screen');
        const dinoCanvas = document.getElementById('dino-canvas');
        const speedLines = document.getElementById('speed-lines');
        const glitchOverlay = document.getElementById('glitch-overlay');
        const introOverlay = document.getElementById('intro-overlay');

        // Function to start the intro game
        function startIntroGame() {
            if (!introActive) return;

            introActive = false; // Prevent multiple triggers

            // Hide error screen
            errorScreen.classList.add('hidden');

            // Show and start dino game
            setTimeout(() => {
                dinoCanvas.classList.add('active');
                dinoGame = new DinoGame(dinoCanvas);
                dinoGame.start();

                // Add jump controls for the game
                document.addEventListener('keydown', function jumpHandler(e) {
                    if ((e.code === 'Space' || e.code === 'ArrowUp')) {
                        e.preventDefault();
                        dinoGame.jump();
                    }
                });

                // Add click/touch controls for jumping
                document.addEventListener('click', function clickJumpHandler() {
                    if (dinoGame) {
                        dinoGame.jump();
                    }
                });

                document.addEventListener('touchstart', function touchJumpHandler() {
                    if (dinoGame) {
                        dinoGame.jump();
                    }
                });

                // After 2.5 seconds, speed up dramatically
                setTimeout(() => {
                    dinoGame.speedUp();
                    speedLines.classList.add('active');
                    createSpeedLines(speedLines);

                    // After 1.5 more seconds, glitch and transition
                    setTimeout(() => {
                        glitchOverlay.classList.add('active');

                        // Complete transition after glitch
                        setTimeout(() => {
                            introOverlay.classList.add('hidden');

                            // Scroll to top of portfolio
                            window.scrollTo(0, 0);

                            // Remove overlay completely after fade
                            setTimeout(() => {
                                introOverlay.remove();
                            }, 500);
                        }, 1000);
                    }, 1500);
                }, 2500);
            }, 500);
        }

        // Listen for spacebar to start
        document.addEventListener('keydown', function spaceHandler(e) {
            if (e.code === 'Space' && introActive) {
                e.preventDefault();
                document.removeEventListener('keydown', spaceHandler);
                startIntroGame();
            }
        });

        // Listen for click/touch to start
        function clickTouchHandler(e) {
            if (introActive) {
                e.preventDefault();
                document.removeEventListener('click', clickTouchHandler);
                document.removeEventListener('touchstart', clickTouchHandler);
                startIntroGame();
            }
        }

        document.addEventListener('click', clickTouchHandler);
        document.addEventListener('touchstart', clickTouchHandler);
    }

    // ===========================
    // DINO GAME CLASS
    // ===========================
    class DinoGame {
        constructor(canvas) {
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;

            this.dino = {
                x: 100,
                y: this.canvas.height - 150,
                width: 50,
                height: 50,
                velocityY: 0,
                jumping: false
            };

            this.obstacles = [];
            this.clouds = [];
            this.ground = this.canvas.height - 100;
            this.score = 0;
            this.speed = 5;
            this.gameRunning = false;
            this.frameCount = 0;

            this.initClouds();
        }

        initClouds() {
            for (let i = 0; i < 5; i++) {
                this.clouds.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * (this.canvas.height / 2),
                    width: 80,
                    height: 30
                });
            }
        }

        start() {
            this.gameRunning = true;
            this.gameLoop();
        }

        jump() {
            // Only jump if on the ground
            if (!this.dino.jumping) {
                this.dino.jumping = true;
                this.dino.velocityY = -15; // Jump strength
            }
        }

        speedUp() {
            // Dramatically increase speed
            const speedInterval = setInterval(() => {
                this.speed += 2;
                if (this.speed > 30) {
                    clearInterval(speedInterval);
                }
            }, 100);
        }

        gameLoop() {
            if (!this.gameRunning) return;

            this.update();
            this.draw();
            this.frameCount++;

            requestAnimationFrame(() => this.gameLoop());
        }

        update() {
            // Update dino
            if (this.dino.jumping) {
                this.dino.velocityY += 0.8;
                this.dino.y += this.dino.velocityY;

                if (this.dino.y >= this.ground - this.dino.height) {
                    this.dino.y = this.ground - this.dino.height;
                    this.dino.jumping = false;
                    this.dino.velocityY = 0;
                }
            }

            // Update obstacles
            this.obstacles.forEach((obstacle, index) => {
                obstacle.x -= this.speed;
                if (obstacle.x + obstacle.width < 0) {
                    this.obstacles.splice(index, 1);
                    this.score++;
                }
            });

            // Spawn obstacles
            if (this.frameCount % 100 === 0) {
                this.obstacles.push({
                    x: this.canvas.width,
                    y: this.ground - 40,
                    width: 30,
                    height: 40
                });
            }

            // Update clouds
            this.clouds.forEach(cloud => {
                cloud.x -= this.speed * 0.3;
                if (cloud.x + cloud.width < 0) {
                    cloud.x = this.canvas.width;
                    cloud.y = Math.random() * (this.canvas.height / 2);
                }
            });
        }

        draw() {
            // Clear canvas
            this.ctx.fillStyle = '#0a0e27';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            // Draw clouds
            this.ctx.fillStyle = '#1a1f3a';
            this.clouds.forEach(cloud => {
                this.ctx.fillRect(cloud.x, cloud.y, cloud.width, cloud.height);
            });

            // Draw ground
            this.ctx.strokeStyle = '#00ff9f';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.moveTo(0, this.ground);
            this.ctx.lineTo(this.canvas.width, this.ground);
            this.ctx.stroke();

            // Draw dino (pixel art style)
            this.drawDino();

            // Draw obstacles
            this.ctx.fillStyle = '#ff00ff';
            this.obstacles.forEach(obstacle => {
                this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            });

            // Draw score
            this.ctx.fillStyle = '#00ff9f';
            this.ctx.font = '20px "Press Start 2P"';
            this.ctx.fillText(`HI ${String(this.score).padStart(5, '0')}`, this.canvas.width - 200, 50);
        }

        drawDino() {
            const x = this.dino.x;
            const y = this.dino.y;
            const size = 10;

            this.ctx.fillStyle = '#00ff9f';

            // Dino body (simplified pixel art)
            // Head
            this.ctx.fillRect(x + size * 3, y, size, size);
            this.ctx.fillRect(x + size * 4, y, size, size);

            // Eye
            this.ctx.fillStyle = '#0a0e27';
            this.ctx.fillRect(x + size * 4, y, size / 2, size / 2);
            this.ctx.fillStyle = '#00ff9f';

            // Body
            this.ctx.fillRect(x + size * 2, y + size, size * 3, size);
            this.ctx.fillRect(x + size, y + size * 2, size * 4, size);
            this.ctx.fillRect(x, y + size * 3, size * 4, size);

            // Legs (animated)
            const legOffset = Math.floor(this.frameCount / 5) % 2;
            if (legOffset === 0) {
                this.ctx.fillRect(x + size, y + size * 4, size, size);
                this.ctx.fillRect(x + size * 3, y + size * 4, size, size);
            } else {
                this.ctx.fillRect(x, y + size * 4, size, size);
                this.ctx.fillRect(x + size * 2, y + size * 4, size, size);
            }

            // Tail
            this.ctx.fillRect(x, y + size * 2, size, size);
        }
    }

    // ===========================
    // SPEED LINES CREATOR
    // ===========================
    function createSpeedLines(container) {
        const lineCount = 20;

        for (let i = 0; i < lineCount; i++) {
            const line = document.createElement('div');
            line.className = 'speed-line';
            line.style.top = Math.random() * 100 + '%';
            line.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(line);
        }
    }

    // ===========================
    // THREE.JS 3D BACKGROUND (only loads after intro)
    // ===========================
    let scene, camera, renderer, particles;
    let mouseX = 0, mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    function init3D() {
        // Wait for intro to finish
        const checkIntro = setInterval(() => {
            if (!introActive) {
                clearInterval(checkIntro);
                setup3D();
            }
        }, 100);
    }

    function setup3D() {
        const container = document.getElementById('three-container');

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0a0e27, 0.0008);

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
        camera.position.z = 1000;

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];

        const particleCount = 1000;
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * 2000 - 1000;
            const y = Math.random() * 2000 - 1000;
            const z = Math.random() * 2000 - 1000;
            vertices.push(x, y, z);

            const colorChoice = Math.random();
            if (colorChoice < 0.25) {
                colors.push(0, 1, 0.62);
            } else if (colorChoice < 0.5) {
                colors.push(1, 0, 1);
            } else if (colorChoice < 0.75) {
                colors.push(0, 0.83, 1);
            } else {
                colors.push(1, 1, 0);
            }
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 3,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        particles = new THREE.Points(geometry, material);
        scene.add(particles);

        addFloatingShapes();

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        window.addEventListener('resize', onWindowResize, false);

        animate3D();
    }

    function addFloatingShapes() {
        const torusGeometry = new THREE.TorusGeometry(100, 30, 16, 100);
        const torusMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff9f,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const torus = new THREE.Mesh(torusGeometry, torusMaterial);
        torus.position.set(-200, 200, -500);
        torus.name = 'torus';
        scene.add(torus);

        const icoGeometry = new THREE.IcosahedronGeometry(80, 0);
        const icoMaterial = new THREE.MeshBasicMaterial({
            color: 0xff00ff,
            wireframe: true,
            transparent: true,
            opacity: 0.4
        });
        const icosahedron = new THREE.Mesh(icoGeometry, icoMaterial);
        icosahedron.position.set(300, -150, -600);
        icosahedron.name = 'icosahedron';
        scene.add(icosahedron);

        const octaGeometry = new THREE.OctahedronGeometry(70, 0);
        const octaMaterial = new THREE.MeshBasicMaterial({
            color: 0x00d4ff,
            wireframe: true,
            transparent: true,
            opacity: 0.35
        });
        const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
        octahedron.position.set(0, 100, -700);
        octahedron.name = 'octahedron';
        scene.add(octahedron);
    }

    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) * 0.5;
        mouseY = (event.clientY - windowHalfY) * 0.5;
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function animate3D() {
        requestAnimationFrame(animate3D);

        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0005;

        const torus = scene.getObjectByName('torus');
        const icosahedron = scene.getObjectByName('icosahedron');
        const octahedron = scene.getObjectByName('octahedron');

        if (torus) {
            torus.rotation.x += 0.01;
            torus.rotation.y += 0.01;
        }

        if (icosahedron) {
            icosahedron.rotation.x += 0.008;
            icosahedron.rotation.z += 0.008;
        }

        if (octahedron) {
            octahedron.rotation.y += 0.012;
            octahedron.rotation.z += 0.006;
        }

        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    if (typeof THREE !== 'undefined') {
        init3D();
    }

    // ===========================
    // PROGRESS BAR
    // ===========================
    const progressBar = document.getElementById('progressBar');
    const progressCatIcon = document.querySelector('.progress-cat-icon');

    window.addEventListener('scroll', function () {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

        progressBar.style.width = scrollPercentage + '%';
        progressCatIcon.style.left = scrollPercentage + '%';
    });

    // ===========================
    // SMOOTH SCROLL NAVIGATION
    // ===========================
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const headerOffset = 80;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===========================
    // COUNTER ANIMATIONS
    // ===========================
    const counters = document.querySelectorAll('.counter');
    let counterAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };

            updateCounter();
        });
    }

    const achievementsSection = document.getElementById('achievements');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counterAnimated) {
                animateCounters();
                counterAnimated = true;
            }
        });
    }, observerOptions);

    if (achievementsSection) {
        observer.observe(achievementsSection);
    }

    // ===========================
    // CARD HOVER EFFECTS
    // ===========================
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.borderColor = 'var(--accent)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.borderColor = 'var(--border-color)';
        });
    });

    // ===========================
    // TYPING EFFECT FOR SUBTITLE
    // ===========================
    setTimeout(() => {
        const typingText = document.querySelector('.typing-text');
        if (typingText) {
            const text = typingText.textContent;
            typingText.textContent = '';
            let charIndex = 0;

            function typeWriter() {
                if (charIndex < text.length) {
                    typingText.textContent += text.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, 50);
                }
            }

            typeWriter();
        }
    }, 8500); // Start after intro completes

    // ===========================
    // ACTIVE NAVIGATION HIGHLIGHT
    // ===========================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavigation() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (navLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // ===========================
    // PARALLAX EFFECT
    // ===========================
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');

        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // ===========================
    // RANDOM GLITCH EFFECT
    // ===========================
    const glitchText = document.querySelector('.glitch-text');

    if (glitchText) {
        setInterval(() => {
            if (Math.random() > 0.95) {
                glitchText.style.textShadow = `
                    ${Math.random() * 5 - 2}px ${Math.random() * 5 - 2}px 0 var(--secondary),
                    ${Math.random() * 5 - 2}px ${Math.random() * 5 - 2}px 0 var(--accent)
                `;

                setTimeout(() => {
                    glitchText.style.textShadow = `
                        2px 2px 0 var(--secondary),
                        4px 4px 0 var(--accent)
                    `;
                }, 100);
            }
        }, 2000);
    }

    // ===========================
    // CONSOLE MESSAGE
    // ===========================
    console.log('%c🎮 RETRO PORTFOLIO LOADED! 🎮', 'font-size: 20px; color: #00ff9f; font-weight: bold;');
    console.log('%cDino intro sequence activated!', 'font-size: 14px; color: #00d4ff;');
    console.log('%cPress SPACE to start the journey!', 'font-size: 12px; color: #ff00ff;');

    // ===========================
    // PARTICLE CURSOR TRAIL
    // ===========================
    const cursorCanvas = document.getElementById('cursor-canvas');
    const cursorCtx = cursorCanvas.getContext('2d');
    cursorCanvas.width = window.innerWidth;
    cursorCanvas.height = window.innerHeight;

    const cursorParticles = [];
    const particleCount = 50;

    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.life = 100;
            const colors = ['#00ff9f', '#ff00ff', '#00d4ff', '#ffff00'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.life -= 2;
            if (this.size > 0.2) this.size -= 0.05;
        }

        draw() {
            cursorCtx.fillStyle = this.color;
            cursorCtx.globalAlpha = this.life / 100;
            cursorCtx.beginPath();
            cursorCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            cursorCtx.fill();
        }
    }

    let cursorMouseX = 0;
    let cursorMouseY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorMouseX = e.clientX;
        cursorMouseY = e.clientY;

        for (let i = 0; i < 3; i++) {
            cursorParticles.push(new Particle(cursorMouseX, cursorMouseY));
        }
    });

    function animateParticles() {
        cursorCtx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);

        for (let i = cursorParticles.length - 1; i >= 0; i--) {
            cursorParticles[i].update();
            cursorParticles[i].draw();

            if (cursorParticles[i].life <= 0) {
                cursorParticles.splice(i, 1);
            }
        }

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
        cursorCanvas.width = window.innerWidth;
        cursorCanvas.height = window.innerHeight;
    });

    // ===========================
    // THEME SWITCHER
    // ===========================
    const themeButtons = document.querySelectorAll('.theme-btn');
    const savedTheme = localStorage.getItem('portfolio-theme') || 'retro';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeButtons.forEach(btn => {
        if (btn.dataset.theme === savedTheme) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('portfolio-theme', theme);

            themeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            playSound('theme');
            showAchievement('Theme Master', `Switched to ${theme} theme!`, 'assets/icons/palette.svg');
        });
    });

    // ===========================
    // SOUND EFFECTS SYSTEM
    // ===========================
    let soundEnabled = localStorage.getItem('sound-enabled') !== 'false';
    const soundToggle = document.getElementById('soundToggle');
    const soundOn = soundToggle.querySelector('.sound-on');
    const soundOff = soundToggle.querySelector('.sound-off');

    function updateSoundUI() {
        if (soundEnabled) {
            soundOn.style.display = 'inline';
            soundOff.style.display = 'none';
        } else {
            soundOn.style.display = 'none';
            soundOff.style.display = 'inline';
        }
    }

    updateSoundUI();

    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem('sound-enabled', soundEnabled);
        updateSoundUI();
        if (soundEnabled) {
            playSound('click');
        }
    });

    // Sound effect generator using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    function playSound(type) {
        if (!soundEnabled) return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        switch (type) {
            case 'click':
                oscillator.frequency.value = 800;
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'achievement':
                oscillator.frequency.value = 523.25;
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                oscillator.start(audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(1046.5, audioContext.currentTime + 0.2);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
            case 'theme':
                oscillator.frequency.value = 440;
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                oscillator.start(audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.15);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.stop(audioContext.currentTime + 0.2);
                break;
        }
    }

    // ===========================
    // ACHIEVEMENT SYSTEM
    // ===========================
    // ===========================
    // ACHIEVEMENT SYSTEM
    // ===========================
    const achievements = {
        firstVisit: { icon: 'assets/icons/hand.svg', title: 'Welcome!', desc: 'First visit to the portfolio' },
        explorer: { icon: 'assets/icons/map.svg', title: 'Explorer', desc: 'Visited all sections' },
        projectViewer: { icon: 'assets/icons/rocket.svg', title: 'Project Enthusiast', desc: 'Viewed projects section' },
        skillsViewer: { icon: 'assets/icons/tools.svg', title: 'Skills Scout', desc: 'Checked out skills' },
        contactViewer: { icon: 'assets/icons/mailbox.svg', title: 'Networker', desc: 'Visited contact section' },
        terminalUser: { icon: 'assets/icons/laptop.svg', title: 'Terminal Master', desc: 'Used the interactive terminal' },
        themeChanger: { icon: 'assets/icons/palette.svg', title: 'Theme Master', desc: 'Changed the theme' },
        scrollMaster: { icon: 'assets/icons/scroll.svg', title: 'Scroll Master', desc: 'Scrolled to the bottom' }
    };

    const unlockedAchievements = JSON.parse(localStorage.getItem('achievements') || '[]');

    function showAchievement(title, description, iconPath = null) {
        const container = document.getElementById('achievement-container');
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';

        // Check if iconPath is provided, otherwise try to extract or default
        // If the title contains an image tag (passed as string), we need to handle it.
        // But better to separate logic.

        let iconHTML = '';
        if (iconPath) {
            iconHTML = `<img src="${iconPath}" class="emoji-icon" alt="achievement">`;
        } else if (title.includes('<img')) {
            // If title has image tag, just use it (legacy/compatibility)
            // But we should try to avoid this.
        }

        notification.innerHTML = `
            <div class="achievement-icon-notif">${iconHTML}</div>
            <div class="achievement-text">
                <h4>${title.replace(/<img[^>]*>/g, '')}</h4>
                <p>${description}</p>
            </div>
        `;

        container.appendChild(notification);
        playSound('achievement');

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    function unlockAchievement(key) {
        if (!unlockedAchievements.includes(key)) {
            unlockedAchievements.push(key);
            localStorage.setItem('achievements', JSON.stringify(unlockedAchievements));
            const achievement = achievements[key];
            showAchievement(achievement.title, achievement.desc, achievement.icon);
        }
    }

    // Track section visits
    const visitedSections = new Set();
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                visitedSections.add(sectionId);

                if (sectionId === 'projects') unlockAchievement('projectViewer');
                if (sectionId === 'skills') unlockAchievement('skillsViewer');
                if (sectionId === 'contact') unlockAchievement('contactViewer');

                if (visitedSections.size >= 6) {
                    unlockAchievement('explorer');
                }
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => sectionObserver.observe(section));

    // First visit achievement
    if (!unlockedAchievements.includes('firstVisit')) {
        setTimeout(() => unlockAchievement('firstVisit'), 2000);
    }

    // Scroll to bottom achievement
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercentage > 95) {
            unlockAchievement('scrollMaster');
        }
    });

    // ===========================
    // INTERACTIVE TERMINAL
    // ===========================
    const terminalModal = document.getElementById('terminal-modal');
    const terminalTrigger = document.getElementById('terminalTrigger');
    const closeTerminal = document.getElementById('closeTerminal');
    const terminalInput = document.getElementById('terminalInput');
    const terminalOutput = document.getElementById('terminalOutput');

    const commands = {
        help: () => `
            <p class="success">Available Commands:</p>
            <p>• help - Show this help message</p>
            <p>• about - Learn about Ankit</p>
            <p>• skills - View technical skills</p>
            <p>• projects - List all projects</p>
            <p>• contact - Get contact information</p>
            <p>• github - Open GitHub profile</p>
            <p>• geeksforgeeks - Open GeeksforGeeks profile</p>
            <p>• clear - Clear terminal</p>
            <p>• theme [name] - Change theme (retro, cyberpunk, vaporwave, matrix, gameboy)</p>
            <p>• achievements - Show unlocked achievements</p>
        `,
        about: () => `
            <p class="success">About Ankit Mahadani:</p>
            <p>Computer Science student at VIT Bhopal</p>
            <p>Specializing in AI, ML, and Full-Stack Development</p>
            <p>Technical Co-Lead at Stats-O-Locked Club</p>
            <p>500+ DSA problems solved</p>
        `,
        skills: () => `
            <p class="success">Technical Skills:</p>
            <p>• Languages: Python, C++, Java, JavaScript</p>
            <p>• AI/ML: Machine Learning, Deep Learning, NLP, Computer Vision</p>
            <p>• Tools: React.js, n8n, Git, Firebase, REST APIs</p>
        `,
        projects: () => `
            <p class="success">Featured Projects:</p>
            <p>1. AI Health Symptom Intelligence System</p>
            <p>2. AI CRM Automation Agents</p>
            <p>3. Voice AI Bot Workflow System</p>
            <p>4. Cancer Detection using Deep Learning</p>
            <p>5. Handwriting Improvement App</p>
        `,
        contact: () => `
            <p class="success">Contact Information:</p>
            <p>• GitHub: github.com/Ankit-Mahadani</p>
            <p>• GeeksforGeeks: geeksforgeeks.org/profile/ankitmahadani</p>
            <p>• Codeforces: codeforces.com/profile/ankitmahadani181</p>
        `,
        github: () => {
            window.open('https://github.com/Ankit-Mahadani', '_blank');
            return '<p class="success">Opening GitHub profile...</p>';
        },
        geeksforgeeks: () => {
            window.open('https://www.geeksforgeeks.org/user/ankitmahadani/', '_blank');
            return '<p class="success">Opening GeeksforGeeks profile...</p>';
        },
        clear: () => {
            terminalOutput.innerHTML = '<p><span class="prompt">$</span> Terminal cleared</p>';
            return '';
        },
        achievements: () => {
            let output = '<p class="success">Unlocked Achievements:</p>';
            unlockedAchievements.forEach(key => {
                const ach = achievements[key];
                if (ach) {
                    output += `<p><img src="${ach.icon}" class="emoji-icon" style="vertical-align: text-bottom;"> ${ach.title} - ${ach.desc}</p>`;
                }
            });
            return output || '<p>No achievements unlocked yet!</p>';
        }
    };

    function executeCommand(cmd) {
        const parts = cmd.trim().toLowerCase().split(' ');
        const command = parts[0];
        const args = parts.slice(1);

        if (command === 'theme' && args.length > 0) {
            const theme = args[0];
            const validThemes = ['retro', 'cyberpunk', 'vaporwave', 'matrix', 'gameboy'];
            if (validThemes.includes(theme)) {
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('portfolio-theme', theme);
                themeButtons.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.theme === theme);
                });
                return `<p class="success">Theme changed to ${theme}!</p>`;
            } else {
                return `<p class="error">Invalid theme. Available: ${validThemes.join(', ')}</p>`;
            }
        }

        if (commands[command]) {
            return commands[command]();
        } else {
            return `<p class="error">Command not found: ${command}. Type 'help' for available commands.</p>`;
        }
    }

    terminalTrigger.addEventListener('click', () => {
        terminalModal.classList.add('active');
        terminalInput.focus();
        playSound('click');
        unlockAchievement('terminalUser');
    });

    closeTerminal.addEventListener('click', () => {
        terminalModal.classList.remove('active');
        playSound('click');
    });

    terminalModal.addEventListener('click', (e) => {
        if (e.target === terminalModal) {
            terminalModal.classList.remove('active');
        }
    });

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim();
            if (command) {
                terminalOutput.innerHTML += `<p><span class="prompt">$</span> ${command}</p>`;
                const result = executeCommand(command);
                if (result) {
                    terminalOutput.innerHTML += result;
                }
                terminalInput.value = '';
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                playSound('click');
            }
        }
    });

    // Keyboard shortcut: Ctrl + `
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '`') {
            e.preventDefault();
            terminalModal.classList.toggle('active');
            if (terminalModal.classList.contains('active')) {
                terminalInput.focus();
                unlockAchievement('terminalUser');
            }
        }
    });

    // Add sound effects to existing interactions
    navLinks.forEach(link => {
        link.addEventListener('click', () => playSound('click'));
    });

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => playSound('click'));
    });

    // ===========================
    // GEEKSFORGEEKS STATS
    // ===========================

    // GeeksforGeeks stats data (hardcoded based on your profile)
    const gfgStats = {
        fundamentals: {
            total: 33,
            gfg: 33
        },
        dsa: {
            total: 214,
            easy: 99,
            medium: 95,
            hard: 20
        },
        competitive: {
            total: 67,
            codechef: 30,
            codeforces: 37
        }
    };

    // Display GFG stats if container exists
    function displayGFGStats() {
        const container = document.getElementById('gfg-stats');
        if (!container) {
            console.log('GFG stats container not found');
            return;
        }

        container.innerHTML = `
            <div class="gfg-stats-container">
                <h3 class="gfg-main-title">Problems Solved</h3>
                
                <!-- Fundamentals Card -->
                <div class="gfg-card">
                    <h4 class="gfg-card-title">Fundamentals</h4>
                    <div class="gfg-stats-list">
                        <div class="gfg-stat-row">
                            <span class="gfg-stat-label">GFG</span>
                            <span class="gfg-stat-number">${gfgStats.fundamentals.gfg}</span>
                        </div>
                    </div>
                    <div class="gfg-total">Total: ${gfgStats.fundamentals.total}</div>
                </div>

                <!-- DSA Card -->
                <div class="gfg-card">
                    <h4 class="gfg-card-title">DSA</h4>
                    <div class="gfg-stats-list">
                        <div class="gfg-stat-row">
                            <span class="gfg-stat-label easy">Easy</span>
                            <span class="gfg-stat-number">${gfgStats.dsa.easy}</span>
                        </div>
                        <div class="gfg-stat-row">
                            <span class="gfg-stat-label medium">Medium</span>
                            <span class="gfg-stat-number">${gfgStats.dsa.medium}</span>
                        </div>
                        <div class="gfg-stat-row">
                            <span class="gfg-stat-label hard">Hard</span>
                            <span class="gfg-stat-number">${gfgStats.dsa.hard}</span>
                        </div>
                    </div>
                    <div class="gfg-total">Total: ${gfgStats.dsa.total}</div>
                </div>

                <!-- Competitive Programming Card -->
                <div class="gfg-card">
                    <h4 class="gfg-card-title">Competitive Programming</h4>
                    <div class="gfg-stats-list">
                        <div class="gfg-stat-row">
                            <span class="gfg-stat-label codechef">Codechef</span>
                            <span class="gfg-stat-number">${gfgStats.competitive.codechef}</span>
                        </div>
                        <div class="gfg-stat-row">
                            <span class="gfg-stat-label codeforces">Codeforces</span>
                            <span class="gfg-stat-number">${gfgStats.competitive.codeforces}</span>
                        </div>
                    </div>
                    <div class="gfg-total">Total: ${gfgStats.competitive.total}</div>
                </div>
            </div>
        `;
    }

    // Initialize GFG stats on page load
    displayGFGStats();


});
