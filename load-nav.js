// Load navigation from nav.html
var navRequest = new XMLHttpRequest();
navRequest.open('GET', 'nav.html', true);
navRequest.onload = function() {
  if (navRequest.status === 200) {
    document.getElementById('nav-placeholder').innerHTML = navRequest.responseText;
    
    // Hamburger menu toggle
    var hamburger = document.querySelector('.hamburger');
    var navLinks = document.getElementById('navLinks');
    
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
      });
    }
  }
};
navRequest.send();