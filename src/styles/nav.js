(function () {
    function initializeSiteNav() {
        let nav = document.querySelector('.site-nav');
        let menuButton = document.querySelector('.menu-toggle');
        let menuLinks = document.querySelectorAll('.nav-link');
        let submenuLinks = document.querySelectorAll('.nav-submenu-link');
        let submenuItems = document.querySelectorAll('.has-submenu');
        let submenuToggles = document.querySelectorAll('.nav-parent-toggle');

        if (!nav || !menuButton || nav.dataset.initialized === 'true') {
            return;
        }

        function closeAllSubmenus() {
            for (let index = 0; index < submenuItems.length; index += 1) {
                submenuItems[index].classList.remove('is-submenu-open');
            }

            for (let index = 0; index < submenuToggles.length; index += 1) {
                submenuToggles[index].setAttribute('aria-expanded', 'false');
            }
        }

        function toggleSubmenu(toggleButton) {
            let parentItem = toggleButton.closest('.has-submenu');

            if (!parentItem) {
                return;
            }

            let isOpen = parentItem.classList.contains('is-submenu-open');

            closeAllSubmenus();

            if (isOpen) {
                return;
            }

            parentItem.classList.add('is-submenu-open');
            toggleButton.setAttribute('aria-expanded', 'true');
        }

        function closeMenu() {
            nav.classList.remove('is-open');
            document.body.classList.remove('nav-menu-open');
            menuButton.setAttribute('aria-expanded', 'false');
            closeAllSubmenus();
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
                closeAllSubmenus();
            }
        }

        menuButton.addEventListener('click', toggleMenu);
        window.addEventListener('resize', handleWindowResize);

        for (let index = 0; index < submenuToggles.length; index += 1) {
            submenuToggles[index].addEventListener('click', function () {
                if (window.innerWidth <= 820) {
                    toggleSubmenu(submenuToggles[index]);
                }
            });
        }

        for (let index = 0; index < menuLinks.length; index += 1) {
            menuLinks[index].addEventListener('click', closeMenu);
        }

        for (let index = 0; index < submenuLinks.length; index += 1) {
            submenuLinks[index].addEventListener('click', closeMenu);
        }

        nav.dataset.initialized = 'true';
    }

    window.initializeSiteNav = initializeSiteNav;
    initializeSiteNav();
})();
