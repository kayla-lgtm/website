// Floating Calendly Button - Opens Calendly as a popup overlay

document.addEventListener('DOMContentLoaded', function() {
  const floatingButton = document.getElementById('floatingButton');
  
  if (floatingButton) {
    floatingButton.addEventListener('click', function() {
 
      Calendly.initPopupWidget({
        url: 'https://calendly.com/secondfoundationai/30min'
      });
      return false;
    });
  }
});