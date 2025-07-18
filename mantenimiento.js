



const deviceSelect = document.getElementById('devices-select');

const getAllDevices = async () => {
    try {
        const response = await fetch('https://gestortiback.onrender.com/device');
        if (!response.ok) {
            console.error('Failed to fetch devices:', response);
            return
        }

        const devices = await response.json();

        devices.forEach(device => {

            const optionBody = document.createElement('option');
            optionBody.innerHTML = `#${device.id} | ${device.name}`;
            optionBody.value = `${device.id},${device.name}`;
            deviceSelect.appendChild(optionBody);
        });




    } catch (error) {
        console.error('Error fetching devices:', error);

    }

}

getAllDevices()


const formMaintenance = document.getElementById("maintenance_form")

formMaintenance.addEventListener("submit", (async (event) => {

    event.preventDefault();

    const device = document.getElementById('devices-select').value;
    const description = document.getElementById('descripcion').value;
    const performed_at = new Date(document.getElementById('fecha').value);
    const maintenance_type = document.getElementById('tipo').value;

    const formatData = {
        device_id: Number(device.split(",")[0]),
        device_name: device.split(",")[1],
        description,
        performed_at,
        maintenance_type
    }

    try {
        await registerMaintenance(formatData)

        Swal.fire({
            title: "Good job!",
            text: "Maintenance registration successful! Redirecting to dashboard...",
            icon: "success"
        });

        formMaintenance.reset();

        setTimeout(() => {
            window.location.href = 'mantenimiento_lista.html';
        }, [2000])


    } catch (error) {
        console.error('Error:', error);
        return;
    }




}))


const registerMaintenance = async (data) => {
    try {

        const response = await fetch('https://gestortiback.onrender.com/maintenance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.error('Maintenance registration failed:', response);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Maintenance registration failed!",
            });
            throw new Error('Maintenance registration failed: ', response.statusText);
        }

        const result = await response.json();


        return result;

    } catch (error) {
        console.error('Error during maintenance registration:', error);
        throw error;
    }
};