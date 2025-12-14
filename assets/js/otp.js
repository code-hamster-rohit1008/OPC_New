import { showBtnPreLoader } from "./pre-loader.js";

const isProduction = window.location.hostname.includes("theowncollab.com");
const domainAttribute = isProduction ? "domain=.theowncollab.com;" : "";
const cookieOptions = `${domainAttribute} path=/; max-age=604800; Secure; SameSite=Lax`;

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

function otpFormData() {
    let otp = '';
    inputs.forEach((input) => {
        otp += input.value;
    });
    if (otp.length < 6) {
        alert('Please enter the complete OTP.');
        return;
    }
    return {
        otp: otp
    };
}

async function sendOtpToServer(otp) {
    try {
        showBtnPreLoader(verifyOtpButton, true, '');
        const response = await fetch('https://opc-backend-828246651523.europe-west1.run.app/auth/verify-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(otp)
        })
            .then(res => res.json())
            .then(data => {
                if (data.status_code == 200) {
                    alert(data.message);
                    document.cookie = `accessToken=${data.access_token}; ${cookieOptions}`;
                    document.cookie = `refreshToken=${data.refresh_token}; ${cookieOptions}`;
                    document.cookie = `tokenType=${data.token_type}; ${cookieOptions}`;
                    window.location.href = 'http://127.0.0.1:5000/';
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
            });
    } catch (error) { }
    finally {
        showBtnPreLoader(verifyOtpButton, false, 'VERIFY OTP <i class="bx bx-arrow-right-stroke"></i>');
    }
}

const verifyOtpButton = document.getElementById('verify-otp-button');
verifyOtpButton.addEventListener('click', (e) => {
    e.preventDefault();
    const formData = otpFormData();
    if (!formData) {
        return;
    }
    sendOtpToServer(formData);
});