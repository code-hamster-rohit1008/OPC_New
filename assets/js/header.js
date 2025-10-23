const signInButton = document.getElementById("sign-in");
const signInComponent = document.getElementById("sign-in-component");
const closeSignIn = document.getElementById("close-sign-in");
const signUpButton = document.getElementById("sign-up");
const signUpComponent = document.getElementById("sign-up-component");
const closeSignUp = document.getElementById("close-sign-up");
const signInAgainButton = document.getElementById("sign-in-again");
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
    document.getElementById('profile').textContent =
    `ID token payload:\n${JSON.stringify(payload, null, 2)}`;
    document.getElementById('signOutBtn').style.display = 'inline-block';
}

if (signInButton){
    signInButton.addEventListener("click", () => {
        window.location.href = 'sign-in.html';

        // Initialize Google Sign-In
        google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: handleCredentialResponse
        });
        // Render the button
        google.accounts.id.renderButton(
            document.getElementById('g_id_signin'),
            { type: 'standard', theme: 'filled_blue', size: 'large', shape: 'rectangular', text: 'signin_with', logo_alignment: 'left' }  // customization
        );

    });
}

if (closeSignIn){
closeSignIn.addEventListener("click", () => {
    signInComponent.style.display = "none";
});
}


if (signInComponent){
window.addEventListener("click", (event) => {
    if (event.target === signInComponent) {
        signInComponent.style.display = "none";
    }
});
}

if(signUpButton) {

signUpButton.addEventListener("click", () => {
    signUpComponent.style.display = "flex";
});
}

if (closeSignUp && signInComponent) {
closeSignUp.addEventListener("click", () => {
    signUpComponent.style.display = "none";
});
}

if (signUpComponent){
// click outside to close
window.addEventListener("click", (event) => {
    if (event.target === signUpComponent) {
        signUpComponent.style.display = "none";
    }
});
}

if (signInAgainButton) {
signInAgainButton.addEventListener("click", () => {
    signUpComponent.style.display = "none";
});
}