(function () {
    function initializeSiteNav() {
        let nav = document.querySelector('.site-nav');
        let menuButton = document.querySelector('.menu-toggle');
        let menuLinks = document.querySelectorAll('.nav-link');

        if (!nav || !menuButton || nav.dataset.initialized === 'true') {
            return;
        }

        function closeMenu() {
            nav.classList.remove('is-open');
            document.body.classList.remove('nav-menu-open');
            menuButton.setAttribute('aria-expanded', 'false');
        }

        function toggleMenu() {
            let isOpen = nav.classList.contains('is-open');

            if (isOpen) {
                closeMenu();
                return;
            }

            nav.classList.add('is-open');
            document.body.classList.add('nav-menu-open');
            menuButton.setAttribute('aria-expanded', 'true');
        }

        function handleWindowResize() {
            if (window.innerWidth > 820) {
                closeMenu();
            }
        }

        menuButton.addEventListener('click', toggleMenu);
        window.addEventListener('resize', handleWindowResize);

        for (let index = 0; index < menuLinks.length; index += 1) {
            menuLinks[index].addEventListener('click', closeMenu);
        }

        nav.dataset.initialized = 'true';
    }

    window.initializeSiteNav = initializeSiteNav;
    initializeSiteNav();
})();
