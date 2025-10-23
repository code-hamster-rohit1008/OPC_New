const CLIENT_ID = '828246651523-ulnokv5h94loanmj3pd8t8ud6kc72ov5.apps.googleusercontent.com';

function parseJwt(token) {
    // lightweight JWT decode (no verification) — ok for display in dev only
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
}

function handleCredentialResponse(response) {
    // response.credential is the ID token (JWT)
    const idToken = response.credential;
    const payload = parseJwt(idToken);

    // Show some info (for dev). In prod, POST this idToken to your backend and verify it server-side.
    console.log(`ID token payload:\n${JSON.stringify(payload, null, 2)}`);
}

window.onload = () => {

    // Initialize Google Sign-In
    google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: handleCredentialResponse
    });
    // Render the button
    google.accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        { type: 'standard' }  // customization
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

const signInScheduleMeetBtn = document.getElementById('sign-in-schedule-meet-btn');
signInScheduleMeetBtn.addEventListener('click', () => {
    window.location.href = 'schedule-a-meet.html';
});