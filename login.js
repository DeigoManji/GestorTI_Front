
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

    if (!email || !password) {
        alert('Please fill in all fields.');
        return;
    }


    try {

        await loginSubmit({ email, password })

        Swal.fire({
            title: "Login succesfully!",
            icon: "success"
        });

        loginForm.reset();

        setTimeout(() => {
            window.location.href = 'main.html';
        }, [2000])





    } catch (error) {
        console.error('Error:', error);
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

        if (response.status !== 200) {
            console.log("test", response)
            alert('Login failed: ', response.statusText);
            throw new Error('Login failed: ', response.statusText);
        }

        const result = await response.json();
        console.log('Login successful:', result);
        return result;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}