/**
 * Contact form submission via Web3Forms.
 * Web3Forms requires no backend/server - it accepts a POST request
 * directly from the browser and forwards the submission to your email.
 *
 * Setup (one-time):
 * 1. Go to https://web3forms.com and enter your email to get a free Access Key.
 * 2. Paste that key into the hidden "access_key" input in the contact form in index.html.
 */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const loadingEl = form.querySelector('.loading');
  const errorEl = form.querySelector('.error-message');
  const sentEl = form.querySelector('.sent-message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    loadingEl.style.display = 'block';
    errorEl.style.display = 'none';
    sentEl.style.display = 'none';

    const formData = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData
    })
      .then((response) => response.json())
      .then((data) => {
        loadingEl.style.display = 'none';
        if (data.success) {
          sentEl.style.display = 'block';
          form.reset();
        } else {
          errorEl.textContent = data.message || 'Something went wrong. Please try again.';
          errorEl.style.display = 'block';
        }
      })
      .catch(() => {
        loadingEl.style.display = 'none';
        errorEl.textContent = 'Something went wrong. Please check your connection and try again.';
        errorEl.style.display = 'block';
      });
  });
})();
