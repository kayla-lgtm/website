(() => {
    const mount = document.getElementById('navMount');
    if (!mount) return;

    fetch('/src/pages/nav.html')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Nav load failed: ${response.status}`);
            }
            return response.text();
        })
        .then((html) => {
            mount.innerHTML = html;
            if (typeof window.initializeSiteNav === 'function') {
                window.initializeSiteNav();
            }
        })
        .catch((error) => {
            console.error(error);
        });
})();

