
const urlParams = new URLSearchParams(window.location.search);

const oldObservation = urlParams.get('observation');
const oldStatus = urlParams.get('status');
const id = urlParams.get('id');
const nameDevice = urlParams.get('name');

const titleEdit = document.getElementById("title")
titleEdit.textContent = `Editar Dispositivo: ${nameDevice}`
document.getElementById('observaciones').textContent = oldObservation



const deviceForm = document.getElementById('device-form');

deviceForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const status = document.getElementById('estado').value;
    const observations = document.getElementById('observaciones').value;

    if (!status) {
        alert('Please fill in all required fields.');
        return;
    }

    try {
        await updateDevice({ status, observations });

        Swal.fire({
            title: "Good job!",
            text: "Device update successful! Redirecting to dashboard...",
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


const changeStatus = async (id, status) => {

    const data = {
        status: status
    }

    const response = await fetch(`https://gestortiback.onrender.com/device/status/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });


    if (!response.ok) {
        console.error('Failed to update device', response);
        return false
    }

    return true
}

const changeObservation = async (id, newObservation) => {


    const data = {
        observations: newObservation
    }

    const response = await fetch(`https://gestortiback.onrender.com/device/observartion/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });


    if (!response.ok) {
        console.error('Failed to update device', response);
        return false
    }

    return true
}


const updateDevice = async (data) => {
    try {


        const updateStatus = await changeStatus(id, data.status)
        const updateObservation = await changeObservation(id, data.observations)


        if (!updateStatus) {
            console.error('Status update failed:', response);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Device registration failed!",
            });
            throw new Error('Device registration failed: ', response.statusText);
        }


        if (!updateObservation) {
            console.error('Observation registration failed:', response);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Device registration failed!",
            });
            throw new Error('Device registration failed: ', response.statusText);
        }


        return true;
    } catch (error) {
        console.error('Error during device registration:', error);
        throw error;
    }
};