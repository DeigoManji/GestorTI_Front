

const deviceList = document.getElementById('devices-list');

const getAllDevices = async () => {
    try {
        const response = await fetch('https://gestortiback.onrender.com/device');
        if (!response.ok) {
            console.error('Failed to fetch devices:', response);
            return
        }

        const devices = await response.json();

        devices.forEach(device => {

            const bodyCard = document.createElement('tr');
            bodyCard.innerHTML = `
            <td>${device.name}</td>
            <td>${device.type}</td>
            <td><span class="status ${device.status == "activo" ? "active" : "inactive"}">${device.status}</span></td>
            <td>${device.observations}</td>`;

            deviceList.appendChild(bodyCard);
        });




    } catch (error) {
        console.error('Error fetching devices:', error);

    }

}

getAllDevices()



