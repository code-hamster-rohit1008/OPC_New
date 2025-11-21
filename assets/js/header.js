const signInButton = document.querySelector("#sign-in button");
signInButton.addEventListener("click", () => {
    window.location.href = 'sign-in.html';
});

async function refreshToken() {
    try {
        const response = await fetch('https://opc-backend-i4tf.onrender.com/auth/refresh', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`,
            },
        });
        const data = await response.json();
        if (data.status_code == 200) {
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('token_type', data.token_type);
            return 200;
        }
        else {
            return 0;
        }

    } catch (error) {
        return 0;
    }
}

async function updateSignIn() {
    try {
        const signIn = document.getElementById("sign-in");
        const user = fetch('https://opc-backend-i4tf.onrender.com/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
        })
        const data = await (await user).json();
        if (data.status_code == 200) {
            signIn.innerHTML = `
                <img src="assets/images/user.png" style="border-radius: 50%; width: 3rem; height: auto;">
                <i class='bx  bx-arrow-right-stroke' style="font-size: 1.5rem; color: rgba(255, 235, 59, 0.7); text-shadow: 0 0 15px rgba(255, 235, 59, 0.3);"></i>
            `;
            signIn.style.display = "flex";
            signIn.style.flexDirection = "row";
            signIn.style.justifyContent = "center";
            signIn.style.alignItems = "center"; 
            signIn.style.cursor = "pointer";
            signIn.style.gap = "0.5rem";

            signIn.addEventListener("click", () => {
                window.location.href = 'dashboard.html';
            });

            return 200;
        }
        else {
            return 0;
        }
    }
    catch (error) {}
}

async function initializeHeader() {
    if (localStorage.getItem('access_token')) {
        const response = await updateSignIn();
        if (!response) {
            if (localStorage.getItem('refresh_token')) {
                const refreshResponse = await refreshToken();
                if (!refreshResponse) {
                    await updateSignIn();
                }
            }
        }
    }
}

initializeHeader();