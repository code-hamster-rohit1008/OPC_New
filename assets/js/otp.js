const otpTitle = document.querySelectorAll('.otp-title');
otpTitle.forEach(title => {
    title.textContent = localStorage.getItem('otpTitle') || 'email';
});

// function for auto focus next input box
const inputs = document.querySelectorAll('#otp-form input[type="text"]');
inputs.forEach((input, index) => {
    input.addEventListener('input', () => {
        if (input.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });
});

// delete input box value on backspace
inputs.forEach((input, index) => {
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace' && input.value.length === 0 && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

const otpScheduleBtn = document.getElementById('otp-schedule-a-meet-btn');
otpScheduleBtn.addEventListener('click', () => {
    window.location.href = 'schedule-a-meet.html';
});