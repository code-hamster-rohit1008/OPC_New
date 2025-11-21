import { showBtnPreLoader } from "./pre-loader.js";

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
        const response = await fetch('https://opc-backend-i4tf.onrender.com/auth/verify-otp', {
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
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                localStorage.setItem('token_type', data.token_type);
                window.location.href = 'index.html';
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
    } catch (error) {}
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