(function () {
    const section = document.querySelector('.ds360-rise-section');

    if (!section) {
        return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        section.style.setProperty('--ds360-rise-progress', '1');
        return;
    }

    function clamp(value, min, max) {
        if (value < min) {
            return min;
        }

        if (value > max) {
            return max;
        }

        return value;
    }

    function updateProgress() {
        const viewport = window.innerHeight || document.documentElement.clientHeight;
        const start = section.offsetTop;
        const distance = section.offsetHeight - viewport;
        const scrollY = window.scrollY || window.pageYOffset;

        if (distance <= 0) {
            section.style.setProperty('--ds360-rise-progress', '1');
            return;
        }

        const raw = (scrollY - start) / distance;
        const progress = clamp(raw, 0, 1);
        const logoProgress = clamp(progress, 0, 0.88);
        section.style.setProperty('--ds360-rise-progress', progress.toFixed(4));
        section.style.setProperty('--ds360-rise-logo-progress', logoProgress.toFixed(4));
    }

    let ticking = false;

    function onScroll() {
        if (ticking) {
            return;
        }

        ticking = true;
        window.requestAnimationFrame(function () {
            updateProgress();
            ticking = false;
        });
    }

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
})();
