

const deviceList = document.getElementById('devices-list');

const redirectToEdit = (id, status, observations, name) => {
    window.location.href =
        `editardispositivo.html?id=${id}&status=${status}&observation=${observations}&name=${name}`;
}


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
            <td>${device.id}</td>
            <td>${device.name}</td>
            <td>${device.type}</td>
            <td><span class="status ${device.status == "activo" ? "active" : "inactive"}">${device.status}</span></td>
            <td>${device.last_maintenance_date ? new Date(device.last_maintenance_date).toISOString().slice(0, 10) : "N/A"}</td>
            <td>${device.observations}</td>
            <td>
                <button onclick= "redirectToEdit('${device.id}','${device.status}','${device.observations}','${device.name}')" class="status active">Editar</button>
            </td>
            `;

            deviceList.appendChild(bodyCard);
        });




    } catch (error) {
        console.error('Error fetching devices:', error);

    }

}

getAllDevices()



