// HubSpot Form Integration with Custom Styling
// This submits to HubSpot using their Forms API while keeping your custom design

const HUBSPOT_PORTAL_ID = '243258302';
const HUBSPOT_FORM_ID = '91424096-18db-48e0-b0c0-805295212834';

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('form-message');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitButton = contactForm.querySelector('.button-submit');
      const originalButtonText = submitButton.textContent;
      
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      const formData = {
        fields: [
          {
            name: 'firstname',
            value: document.getElementById('firstname').value
          },
          {
            name: 'lastname',
            value: document.getElementById('lastname').value
          },
          {
            name: 'company',
            value: document.getElementById('company').value
          },
          {
            name: 'email',
            value: document.getElementById('email').value
          },
          {
            name: 'message',
            value: document.getElementById('message').value
          }
        ],
        context: {
          pageUri: window.location.href,
          pageName: document.title
        }
      };
      
      const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;
      
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(data => {
        formMessage.textContent = 'Thank you! We\'ll be in touch soon.';
        formMessage.className = 'form-message form-message-success';
        contactForm.reset();
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.className = 'form-message';
        }, 5000);
      })
      .catch(error => {
        console.error('Error:', error);
        formMessage.textContent = 'Something went wrong. Please try again.';
        formMessage.className = 'form-message form-message-error';
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        setTimeout(() => {
          formMessage.textContent = '';
          formMessage.className = 'form-message';
        }, 5000);
      });
    });
  }
});