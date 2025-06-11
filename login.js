
function togglePassword() {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    try {

        await loginSubmit({ email, password })

        loginForm.reset();
        alert('Login successful! Redirecting to dashboard...');
        window.location.href = 'main.html';
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while processing your request. Please try again later.');
        return;

    }


});

const loginSubmit = async (data) => {
    try {
        const response = await fetch('https://gestortiback.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        const result = await response.json();
        console.log('Login successful:', result);
        return result;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}