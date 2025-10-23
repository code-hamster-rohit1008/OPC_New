const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('show-password-checkbox');
showPasswordCheckbox.style.display = 'none';
passwordInput.addEventListener('input', () => {
    showPasswordCheckbox.style.display = passwordInput.value ? 'block' : 'none';
});
showPasswordCheckbox.addEventListener('click', () => {
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    showPasswordCheckbox.classList = passwordInput.type === 'password' ? 'bx  bx-eye' : 'bx  bx-eye-slash';
});

function disableAnotherPreference(selectedPreference) {
    if (selectedPreference === 'email') {
        phonePreference.checked = false;
    } else if (selectedPreference === 'phone') {
        emailPreference.checked = false;
    }
}

function makePreferenceDefault() {
    const emailPreference = document.getElementById('email-preference');
    emailPreference.checked = true;
    disableAnotherPreference('email');
    localStorage.setItem('otpTitle', 'Email');
}

const emailPreference = document.getElementById('email-preference');
const phonePreference = document.getElementById('phone-preference');

emailPreference.addEventListener('change', () => {
    disableAnotherPreference('email');
    localStorage.setItem('otpTitle', 'Email');
});

phonePreference.addEventListener('change', () => {
    disableAnotherPreference('phone');
    localStorage.setItem('otpTitle', 'Phone Number');
});

window.addEventListener('load', () => {
    const savedPreference = localStorage.getItem('otpTitle');
    makePreferenceDefault();
});

const signUpScheduleMeetBtn = document.getElementById('sign-up-schedule-a-meet-btn');
signUpScheduleMeetBtn.addEventListener('click', () => {
    window.location.href = 'schedule-a-meet.html';
});