// SLIDESHOW GALLERY
(function(){
    const gallery = document.getElementById('media-gallery');
    const thumbStrip = document.getElementById('thumb-strip');
    const stripInfo = document.getElementById('strip-info');
    const stripPrev = document.getElementById('strip-prev');
    const stripNext = document.getElementById('strip-next');
    if (!gallery) return;

    const mediaFiles = [
        { type: 'image', src: 'photos/dita-compressed.webp' },
        { type: 'image', src: 'photos/isa-compressed.webp' },
        { type: 'image', src: 'photos/levi-compressed.webp' },
        { type: 'image', src: 'photos/tups-compressed.webp' },
        { type: 'image', src: 'photos/wallk-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251113_194613-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251113_232511-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251113_233918890_MFNR-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_000613433_MFNR-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_000616513_MFNR-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_013212-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_125436926_HDR-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_125448554_HDR-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_125605-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_125611-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_125617-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_125619-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_125630-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_125639-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_125659_781_HDR-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_125907197_HDR-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_130611331_HDR-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_130719833_HDR-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_131008-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_134101595_HDR-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_135842-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_135917-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_142828-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_142927-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_142934-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_171851_340_PORTRAIT-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_202847_4-compressed.webp' },
        { type: 'image', src: 'photos/IMG_20251114_202848_7-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8267-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8281(1)-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8282-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8284(1)-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8368-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8422-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8423-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8433-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8445-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8453-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8455-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8458-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8464-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8465-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8466-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8467-compressed.webp' },
        { type: 'image', src: 'photos/IMG_8503-compressed.webp' },
        { type: 'image', src: 'photos/vlcsnap-2025-11-16-02h26m12s650.png' },
        { type: 'image', src: 'photos/vlcsnap-2025-11-16-02h28m05s774.png' },
        { type: 'image', src: 'photos/vlcsnap-2025-11-16-02h29m54s537.png' }
    ];

    let currentIdx = 0;
    let autoplayInterval;

    // Build slides
    mediaFiles.forEach((m, i) => {
        const slide = document.createElement('div');
        slide.className = 'gallery-slide' + (i === 0 ? ' active' : '');
        if (m.type === 'video') slide.classList.add('video-slide');
        
        const media = m.type === 'image' ? document.createElement('img') : document.createElement('video');
        media.src = m.src;
        if (m.type === 'video') {
            media.controls = true;
            media.muted = true;
            media.loop = true;
        }
        slide.appendChild(media);
        gallery.appendChild(slide);
    });

    // Build thumbnails
    mediaFiles.forEach((m, i) => {
        const icon = document.createElement('div');
        icon.className = 'icon' + (i === 0 ? ' active' : '');
        const img = document.createElement('img');
        img.src = m.src;
        icon.appendChild(img);
        if (m.type === 'video') {
            const indicator = document.createElement('div');
            indicator.className = 'video-indicator';
            indicator.innerHTML = '▶';
            icon.appendChild(indicator);
        }
        icon.addEventListener('click', () => goToSlide(i));
        thumbStrip.appendChild(icon);
    });

    stripInfo.textContent = `1 / ${mediaFiles.length}`;

    function goToSlide(idx) {
        const slides = gallery.querySelectorAll('.gallery-slide');
        const icons = thumbStrip.querySelectorAll('.icon');
        
        slides[currentIdx].classList.remove('active');
        icons[currentIdx].classList.remove('active');
        
        currentIdx = idx;
        
        slides[currentIdx].classList.add('active');
        icons[currentIdx].classList.add('active');
        stripInfo.textContent = `${currentIdx + 1} / ${mediaFiles.length}`;
        
        icons[currentIdx].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    function nextSlide() {
        goToSlide((currentIdx + 1) % mediaFiles.length);
    }

    function prevSlide() {
        goToSlide((currentIdx - 1 + mediaFiles.length) % mediaFiles.length);
    }

    stripNext.addEventListener('click', nextSlide);
    stripPrev.addEventListener('click', prevSlide);

    // Auto-rotate every 3 seconds
    autoplayInterval = setInterval(nextSlide, 3000);

    // Pause on hover
    gallery.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    gallery.addEventListener('mouseleave', () => {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 3000);
    });
})();
