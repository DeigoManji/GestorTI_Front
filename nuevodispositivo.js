
const deviceForm = document.getElementById('device-form');

deviceForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const name = document.getElementById('nombre').value;
    const type = document.getElementById('tipo').value;
    const status = document.getElementById('estado').value;
    const responsible_name = document.getElementById('usuario').value;
    const responsible_email = document.getElementById('correo').value;
    const observations = document.getElementById('observaciones').value;

    if (!name || !type || !status || !responsible_name) {
        alert('Please fill in all required fields.');
        return;
    }

    try {
        await registerDevice({ name, type, status, responsible_name, responsible_email, observations });

        Swal.fire({
            title: "Good job!",
            text: "Device registration successful! Redirecting to dashboard...",
            icon: "success"
        });

        deviceForm.reset();

        setTimeout(() => {
            window.location.href = 'dispositivos.html';
        }, [2000])


    } catch (error) {
        console.error('Error:', error);
        return;
    }
});

const registerDevice = async (data) => {
    try {
        const response = await fetch('https://gestortiback.onrender.com/device', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.error('Device registration failed:', response);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Device registration failed!",
            });
            throw new Error('Device registration failed: ', response.statusText);
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Error during device registration:', error);
        throw error;
    }
};