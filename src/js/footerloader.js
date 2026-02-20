(() => {
    const mount = document.getElementById("footerMount");
    if (!mount) return;

    fetch(window.location.pathname.includes('/src/pages/') ? './footer.html' : 'src/pages/footer.html')
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Footer load failed: ${response.status}`);
            }
            return response.text();
        })
        .then((html) => {
            mount.innerHTML = html;
        })
        .catch((error) => {
            console.error(error);
        });
})();

