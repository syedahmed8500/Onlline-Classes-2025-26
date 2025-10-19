document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const registrationForm = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const submitButton = registrationForm.querySelector('.btn--primary');
    
    // Form validation rules
    const validationRules = {
        fullName: {
            required: true,
            minLength: 2,
            message: 'Please enter your full name (minimum 2 characters)'
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            required: true,
            pattern: /^[0-9]{10}$/,
            message: 'Please enter a valid 10-digit phone number'
        },
        grade: {
            required: true,
            message: 'Please select your grade/class'
        }
    };

    // Create and style error message element
    function createErrorMessage(message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: var(--color-error);
            font-size: var(--font-size-sm);
            margin-top: var(--space-4);
            display: block;
        `;
        return errorElement;
    }

    // Remove existing error messages
    function removeErrorMessages(fieldName) {
        const field = document.getElementById(fieldName);
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }

    // Show error message for a field
    function showError(fieldName, message) {
        const field = document.getElementById(fieldName);
        removeErrorMessages(fieldName);
        
        field.style.borderColor = 'var(--color-error)';
        const errorElement = createErrorMessage(message);
        field.parentNode.appendChild(errorElement);
    }

    // Validate individual field
    function validateField(fieldName, value) {
        const rule = validationRules[fieldName];
        if (!rule) return true;

        // Check if required field is empty
        if (rule.required && (!value || value.trim() === '')) {
            showError(fieldName, rule.message);
            return false;
        }

        // Check minimum length
        if (rule.minLength && value.length < rule.minLength) {
            showError(fieldName, rule.message);
            return false;
        }

        // Check pattern matching
        if (rule.pattern && !rule.pattern.test(value)) {
            showError(fieldName, rule.message);
            return false;
        }

        // If validation passes, remove any existing error messages
        removeErrorMessages(fieldName);
        return true;
    }

    // Validate entire form
    function validateForm() {
        let isValid = true;
        const formData = new FormData(registrationForm);

        for (const [fieldName, rule] of Object.entries(validationRules)) {
            const value = formData.get(fieldName);
            if (!validateField(fieldName, value)) {
                isValid = false;
            }
        }

        return isValid;
    }

    // Add real-time validation on blur
    Object.keys(validationRules).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', function() {
                validateField(fieldName, this.value);
            });

            // Remove error styling on focus
            field.addEventListener('focus', function() {
                this.style.borderColor = '';
            });
        }
    });

    // Phone number formatting
    const phoneField = document.getElementById('phone');
    phoneField.addEventListener('input', function() {
        // Remove non-numeric characters
        let value = this.value.replace(/\D/g, '');
        
        // Limit to 10 digits
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        
        this.value = value;
    });

    // Form submission handler
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form
        if (!validateForm()) {
            // Scroll to first error
            const firstError = document.querySelector('.error-message');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Show loading state
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
        submitButton.disabled = true;
        registrationForm.classList.add('form-submitting');

        // Simulate form submission delay
        const scriptURL = 'https://script.google.com/macros/s/AKfycbweDDTipTxEjpylRQhNYHVNeQ-hkDSrwy6IFS7KRAvIXCZOgZUbYyc4RbWF4qF7xxNo/exec'; // Paste your Apps Script Web App URL
const formData = new FormData(registrationForm);

fetch(scriptURL, { method: 'POST', body: formData })
  .then(response => response.json())
  .then(result => {
      registrationForm.style.display = 'none';
      successMessage.classList.remove('hidden');
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  })
  .catch(error => {
      alert('Error submitting form: ' + error);
      submitButton.disabled = false;
      submitButton.innerHTML = '<i class="fas fa-user-plus"></i> Register Now';
  });

            // Hide form and show success message
            registrationForm.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Reset form state
            submitButton.innerHTML = '<i class="fas fa-user-plus"></i> Register Now';
            submitButton.disabled = false;
            registrationForm.classList.remove('form-submitting');
        }, 2000);
    });

    // Smooth scrolling for anchor links
    function smoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    // Initialize smooth scrolling
    smoothScroll();

    // Add loading states to social media buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.style.opacity = '0.7';
            
            setTimeout(() => {
                this.style.opacity = '1';
            }, 500);
        });
    });

    // Registration deadline countdown (optional enhancement)
    function updateDeadlineStatus() {
        const deadlineDate = new Date('2025-10-25');
        const currentDate = new Date();
        const deadlineCard = document.querySelector('.deadline-card');
        
        if (currentDate > deadlineDate) {
            deadlineCard.style.background = 'var(--color-bg-4)';
            deadlineCard.querySelector('.icon-wrapper').style.background = 'var(--color-error)';
            deadlineCard.querySelector('p').innerHTML = '25th October 2025<br><small style="color: var(--color-error); font-weight: bold;">Registration Closed</small>';
            
            // Disable form submission
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-times"></i> Registration Closed';
            submitButton.style.background = 'var(--color-error)';
        }
    }

    // Check deadline status
    updateDeadlineStatus();

    // Form field enhancements
    const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
    textInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentNode.style.transform = 'scale(1.01)';
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.style.transform = 'scale(1)';
        });
    });

    // Add character counter for textarea fields
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const maxLength = 500;
        textarea.setAttribute('maxlength', maxLength);
        
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
            text-align: right;
            margin-top: var(--space-4);
        `;
        
        function updateCounter() {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            
            if (remaining < 50) {
                counter.style.color = 'var(--color-warning)';
            } else {
                counter.style.color = 'var(--color-text-secondary)';
            }
        }
        
        textarea.addEventListener('input', updateCounter);
        textarea.parentNode.appendChild(counter);
        updateCounter();
    });

    // Success message auto-hide after 10 seconds (optional)
    function autoHideSuccess() {
        if (!successMessage.classList.contains('hidden')) {
            setTimeout(() => {
                const resetButton = document.createElement('button');
                resetButton.className = 'btn btn--secondary';
                resetButton.innerHTML = '<i class="fas fa-plus"></i> Register Another Student';
                resetButton.style.marginTop = 'var(--space-16)';
                
                resetButton.addEventListener('click', function() {
                    registrationForm.style.display = 'block';
                    registrationForm.reset();
                    successMessage.classList.add('hidden');
                    
                    // Remove all error messages
                    document.querySelectorAll('.error-message').forEach(error => error.remove());
                    
                    // Reset form field styles
                    document.querySelectorAll('.form-control').forEach(field => {
                        field.style.borderColor = '';
                    });
                    
                    // Scroll back to form
                    registrationForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                });
                
                successMessage.querySelector('.success-content').appendChild(resetButton);
            }, 3000);
        }
    }

    // Monitor for success message display
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (!successMessage.classList.contains('hidden')) {
                    autoHideSuccess();
                }
            }
        });
    });

    observer.observe(successMessage, { attributes: true });
});
