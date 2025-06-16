const ticketForm = document.getElementById("tickerForm")


ticketForm.addEventListener("submit", (async (event) => {
    event.preventDefault();

    const description = document.getElementById("causa").value
    const status = document.getElementById("status").value
    const priority = document.getElementById("prioridad").value

    try {


        await registerTicket({ description, status, priority })

        Swal.fire({
            title: "Good job!",
            text: "Ticket registration successful! Redirecting to dashboard...",
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


const registerTicket = async (data) => {
    try {


        const response = await fetch("https://gestortiback.onrender.com/tickets", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })


        if (!response.ok) {
            console.error('Ticket registration failed:', response);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ticket registration failed!",
            });
            throw new Error('Ticket registration failed: ', response.statusText);
        }

        const result = await response.json();


        return result;

    } catch (error) {
        console.error('Error during Ticket registration:', error);
        throw error;
    }
}