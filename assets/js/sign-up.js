import { showBtnPreLoader } from "./pre-loader.js";

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

const signUpScheduleMeetBtn = document.getElementById('sign-up-schedule-a-meet-btn');
signUpScheduleMeetBtn.addEventListener('click', () => {
    window.location.href = 'schedule-a-meet.html';
});

function signUpFormData() {
    const userType = document.getElementById('user-type').value;
    if (!userType) {
        alert('Please select user type.');
        return;
    }
    
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Please enter your username.');
        return;
    }
    const email = document.getElementById('email').value;
    if (!email) {
        alert('Please enter your email.');
        return;
    }
    const phoneNumber = document.getElementById('phone-number').value;
    if (!phoneNumber) {
        alert('Please enter your phone number.');
        return;
    }
    const password = document.getElementById('password').value;
    if (!password) {
        alert('Please enter your password.');
        return;
    }

    return {
        user_type: userType,
        user_name: username,
        email: email,
        phone_number: phoneNumber,
        password: password
    };
}

async function sendDataToServer(formData) {
    try {
        showBtnPreLoader(signUpBtn, true, '');
        const response = await fetch('https://opc-backend-i4tf.onrender.com/auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const data = await response.json();
        if (data.status_code == 200) {
            alert(data.message);
            window.location.href = 'otp-validation.html';
        }
        else if (data.status_code == 400) {
            alert(data.message);
        }
        else if (data.status_code == 500) {
            alert(data.message);
        }
        else {
            alert('An unexpected error occurred. Please try again later.');
        }
    } 
    catch (error) {}
    finally {
        showBtnPreLoader(signUpBtn, false, 'SIGN UP <i class="bx  bx-arrow-right-stroke"  ></i>');
    }
}

const signUpBtn = document.getElementById('sign-up-btn');
signUpBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = signUpFormData();
    if (!formData) {
        return;
    }
    sendDataToServer(formData);
});