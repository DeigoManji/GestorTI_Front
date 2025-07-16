

const fetchSystemStatus = async () => {
    try {
        const response = await fetch('https://gestortiback.onrender.com/device/system');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching system status:', error);
        return null;
    }
}
const finishWork = async () => {
    let data = null;
    try {
        data = await fetchSystemStatus();
        console.log('Data fetched:', data);

        if (!data) {
            document.getElementById('opened-tickets').textContent = 'N/A';
            document.getElementById('closed-tickets').textContent = 'N/A';
            document.getElementById('active-devices').textContent = 'N/A';
            document.getElementById('total-maintenance').textContent = 'N/A';
            return;
        }

        const openedTickeds = document.getElementById('opened-tickets');
        const closedTickeds = document.getElementById('closed-tickets');
        const activesDevices = document.getElementById('active-devices');
        const totalMaintenance = document.getElementById('total-maintenance');

        const highTickets = document.getElementById('system-last-tickets-priority');

        const ticketsArray = data.high_priority_tickets || [];

        highTickets.innerHTML = '';

        const fragment = document.createDocumentFragment();

        for (let i = 0; i < Math.min(ticketsArray.length, 5); i++) {
            const ticket = ticketsArray[i];

            const ticketDiv = document.createElement('div');
            ticketDiv.classList.add('ticket-item');

            ticketDiv.innerHTML = `
            <div class="ticket-header">
                <span class="ticket-id">ID: #${ticket.id || 'N/A'}</span>
                <span class="ticket-status">${ticket.status.toUpperCase() || 'Desconocido'}</span>
            </div>
            <div class="ticket-details">
                <h4 class="ticket-title">Descripcion: ${ticket.description || 'Sin Título'}</h4>
                <p class="ticket-priority">Prioridad: <strong>${ticket.priority.toUpperCase() || 'N/A'}</strong></p>
                <p class="ticket-creado">Creado en: ${new Date(ticket.created_at).toLocaleDateString()}</p>
            </div>
        `;
            fragment.appendChild(ticketDiv);
        }

        highTickets.appendChild(fragment);








        if (openedTickeds) openedTickeds.textContent = data.opened_tickets || "0";
        if (closedTickeds) closedTickeds.textContent = data.closed_tickets || "0";
        if (activesDevices) activesDevices.textContent = data.online_devices || "0";
        if (totalMaintenance) totalMaintenance.textContent = data.done_maintenance || "0";



    } catch (error) {
        console.error('Error en finishWork al procesar o actualizar la UI:', error.message || error);
        const errorMessageElement = document.createElement('p');
        errorMessageElement.style.color = 'red';
        errorMessageElement.textContent = `Error al cargar los datos: ${error.message || 'Error desconocido'}.`;
        document.body.prepend(errorMessageElement); // Añadir el mensaje al principio del body
    }
};

(async () => {
    console.log('Iniciando carga de datos del sistema...');
    await finishWork();
    console.log('Carga de datos del sistema finalizada.');
})();



