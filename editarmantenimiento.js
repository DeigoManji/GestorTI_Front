const urlParams = new URLSearchParams(window.location.search);

const oldRealizedDate = urlParams.get('realized_date');
const id = urlParams.get('id');
const description = urlParams.get('description');

document.getElementById('descripcion').textContent = description

const parts = oldRealizedDate.split('/');
let day, month, year;

day = parseInt(parts[0], 10);
month = parseInt(parts[1], 10);
year = parseInt(parts[2], 10);

const date = new Date(year, month - 1, day);

const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
const formattedDay = date.getDate().toString().padStart(2, '0');
const dateFormated = `${date.getFullYear()}-${formattedMonth}-${formattedDay}`;

document.getElementById('fecha').value = dateFormated


const formMaintenance = document.getElementById("maintenance_form")

formMaintenance.addEventListener("submit", (async (event) => {

    event.preventDefault();

    const description = document.getElementById('descripcion').value;
    const performed_at = new Date(document.getElementById('fecha').value);

    const formatData = {
        description,
        performed_at,
    }

    try {
        await updateMaintenance(formatData)

        Swal.fire({
            title: "Good job!",
            text: "Maintenance updated successful! Redirecting to dashboard...",
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


const updateMaintenance = async (data) => {
    try {

        const response = await fetch(`https://gestortiback.onrender.com/maintenance/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            console.error('Maintenance update failed:', response);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Maintenance update failed!",
            });
            throw new Error('Maintenance update failed: ', response.statusText);
        }

        const result = await response.json();


        return result;

    } catch (error) {
        console.error('Error during maintenance update:', error);
        throw error;
    }
};