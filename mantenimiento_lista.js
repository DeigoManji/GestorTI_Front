

const maintenancesList = document.getElementById('maintenances-list');

const redirectToEdit = (id, description, realized_date) => {
    window.location.href =
        `editarmantenimiento.html?id=${id}&description=${description}&realized_date=${realized_date}`;
}


const getAllMaintenances = async () => {
    try {
        const response = await fetch('https://gestortiback.onrender.com/maintenance');

        if (!response.ok) {
            console.error('Failed to fetch maintenances:', response);
            return
        }

        const maintenances = await response.json();

        maintenances.forEach(maintenance => {

            const bodyCard = document.createElement('tr');
            bodyCard.innerHTML = `
            <td>${maintenance.device_name}</td>
            <td>${maintenance.maintenance_type}</td>
            <td>${maintenance.description}</td>
            <td>${new Date(maintenance.performed_at).toISOString().slice(0, 10)}</td>
            <td>
                <button onclick= "redirectToEdit('${maintenance.id}','${maintenance.description}','${new Date(maintenance.performed_at).toLocaleDateString()}')" class="status active">Editar</button>
            </td>
            `;

            maintenancesList.appendChild(bodyCard);

        });




    } catch (error) {
        console.error('Error fetching devices:', error);

    }

}

getAllMaintenances()



