const ticketForm = document.getElementById("tickerForm")
const urlParams = new URLSearchParams(window.location.search);

const id = urlParams.get('id');

ticketForm.addEventListener("submit", (async (event) => {
    event.preventDefault();

    const status = document.getElementById("status").value
    const priority = document.getElementById("prioridad").value

    try {


        await updateTicket({ status, priority })

        Swal.fire({
            title: "Good job!",
            text: "Ticket updated successful! Redirecting to dashboard...",
            icon: "success"
        });

        ticketForm.reset();

        setTimeout(() => {
            window.location.href = 'tickets.html';
        }, [2000])


    } catch (error) {
        console.error('Error:', error);
        return;
    }


}))


const updateTicket = async (data) => {
    try {

        const response = await fetch(`https://gestortiback.onrender.com/tickets/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })


        if (!response.ok) {
            console.error('Ticket update failed:', response);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ticket update failed!",
            });
            throw new Error('Ticket update failed: ', response.statusText);
        }

        const result = await response.json();


        return result;

    } catch (error) {
        console.error('Error during Ticket registration:', error);
        throw error;
    }
}