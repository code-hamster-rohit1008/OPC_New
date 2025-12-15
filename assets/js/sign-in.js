import { showBtnPreLoader } from "./pre-loader.js";

const isProduction = window.location.hostname.includes("theowncollab.com");
const domainAttribute = isProduction ? "domain=.theowncollab.com;" : "";
const cookieOptions = `${domainAttribute} path=/; max-age=604800; Secure; SameSite=Lax`;

const OUR_CLIENT_ID = '828246651523-ulnokv5h94loanmj3pd8t8ud6kc72ov5.apps.googleusercontent.com';

function handleCredentialResponse(response) {
    const idToken = response.credential;
    fetch('https://opc-backend-828246651523.europe-west1.run.app/auth/google-sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            google_id_token: idToken
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.status_code == 200) {
                alert(data.message);
                document.cookie = `accessToken=${data.access_token}; ${cookieOptions}`;
                document.cookie = `refreshToken=${data.refresh_token}; ${cookieOptions}`;
                document.cookie = `tokenType=${data.token_type}; ${cookieOptions}`;
                window.location.href = 'https://www.dashboard.theowncollab.com/';
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
        })
}

window.onload = () => {

    google.accounts.id.initialize({
        client_id: OUR_CLIENT_ID,
        callback: handleCredentialResponse
    });

    google.accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        { type: 'standard' }
    );

};

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

const signInScheduleMeetBtn = document.getElementById('sign-in-schedule-a-meet-btn');
signInScheduleMeetBtn.addEventListener('click', () => {
    window.location.href = 'schedule-a-meet.html';
});

function signInFormData() {
    const emailInput = document.getElementById('email').value;
    if (!emailInput) {
        alert('Please enter your email.');
        return;
    }
    const passwordInput = document.getElementById('password').value;
    if (!passwordInput) {
        alert('Please enter your password.');
        return;
    }

    return {
        email: emailInput,
        password: passwordInput
    };
}

async function sendDataToServer(formData) {
    try {
        showBtnPreLoader(signInBtn, true, '');
        const response = await fetch('https://opc-backend-828246651523.europe-west1.run.app/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
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
    } catch (error) { }
    finally {
        showBtnPreLoader(signInBtn, false, 'SIGN IN <i class="bx  bx-arrow-right-stroke"  ></i>');
    }
}

function forgotPasswordFormData() {
    const emailInput = document.getElementById('email').value;
    if (!emailInput) {
        alert('Please enter your email.');
        return;
    }
    const passwordInput = document.getElementById('password').value;
    if (!passwordInput) {
        alert('Please enter your password.');
        return;
    }
    return {
        email: emailInput,
        new_password: passwordInput
    };
}

async function sendForgotPasswordDataToServer(formData) {
    try {
        showBtnPreLoader(signInBtn, true, '');
        const response = await fetch('https://opc-backend-828246651523.europe-west1.run.app/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.status_code == 200) {
            alert(data.message);
            window.location.href = 'otp-validation.html';
        }
        else if (data.status_code == 404) {
            alert(data.message);
        }
        else if (data.status_code == 500) {
            alert(data.message);
        }
        else {
            alert('An unexpected error occurred. Please try again later.');
        }
    } catch (error) { }
    finally {
        showBtnPreLoader(signInBtn, false, 'RESET PASSWORD <i class="bx  bx-arrow-right-stroke"></i>');
    }
}

let trail = 0;

const signInBtn = document.getElementById('sign-in-btn');
signInBtn.addEventListener('click', (e) => {
    if (trail == 1) {
        const formData = forgotPasswordFormData();
        if (!formData) {
            return;
        }
        sendForgotPasswordDataToServer(formData);
    }
    else {
        e.preventDefault();
        const formData = signInFormData();
        if (!formData) {
            return;
        }
        sendDataToServer(formData);
    }
});

async function changeLabel(labelElement, newText) {
    labelElement.textContent = newText;
}

const forgotPasswordBtn = document.getElementById('forgot-password-btn');
forgotPasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (trail == 0) {
        const emailLabel = document.getElementById('email-label');
        const passwordLabel = document.getElementById('password-label');
        changeLabel(emailLabel, 'Enter registered email *');
        changeLabel(passwordLabel, 'Enter new password *');
        // change forgot password button text
        document.getElementById('forgot-password-btn').textContent = 'Back to Sign In';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        signInBtn.innerHTML = 'RESET PASSWORD <i class="bx  bx-arrow-right-stroke"></i>';
        trail += 1;
        return;
    } else {
        const emailLabel = document.getElementById('email-label');
        const passwordLabel = document.getElementById('password-label');
        changeLabel(emailLabel, 'Email');
        changeLabel(passwordLabel, 'Password');
        document.getElementById('forgot-password-btn').textContent = 'Forgot Password?';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        signInBtn.innerHTML = 'SIGN IN <i class="bx  bx-arrow-right-stroke"></i>';
        trail = 0;
        return;
    }
});