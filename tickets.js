const ticketsList = document.getElementById("tickets-list")


const redirectToEdit = (id) => {
    window.location.href =
        `editarticket.html?id=${id}`;
}



const getAllTickets = async () => {
    try {
        const response = await fetch('https://gestortiback.onrender.com/tickets');

        if (!response.ok) {
            console.error('Failed to fetch maintenances:', response);
            return
        }

        const tickets = await response.json();

        tickets.forEach(ticket => {

            let priorityClass = ""

            if (ticket.priority == "alta") {
                priorityClass = "prioridad alta"
            }

            if (ticket.priority == "media") {
                priorityClass = "prioridad media"
            }

            if (ticket.priority == "baja") {
                priorityClass = "prioridad baja"
            }

            const bodyCard = document.createElement('tr');
            bodyCard.innerHTML = `
            <td>${ticket.description}</td>
            <td class="${ticket.status == "abierto" ? "status abierto" : "status cerrado"}">${ticket.status.toUpperCase()}</td>
            <td class="${priorityClass}">${ticket.priority.toUpperCase()}</td>
            <td>${new Date(ticket.created_at).toLocaleDateString()}</td>
            <td>
                <button onclick= "redirectToEdit('${ticket.id}')" class="status-button active">Editar</button>
            </td>
            `;

            ticketsList.appendChild(bodyCard);

        });




    } catch (error) {
        console.error('Error fetching devices:', error);

    }

}

getAllTickets()
