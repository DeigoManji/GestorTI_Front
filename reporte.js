

const typeReports = [
    { name: 'Mantenimiento', value: 'mantenimiento' },
    { name: "Tickets Abiertos", value: 'tickets-abiertos' },
    { name: "Tickets Cerrados", value: 'tickets-cerrados' },
    { name: "Dispositivos Activos", value: 'dispositivos-activos' },
    { name: "Dispositivos Inactivos", value: 'dispositivos-inactivos' },
]

const reportSelect = document.getElementById('reports-select');

typeReports.forEach(type => {
    const optionBody = document.createElement('option');
    optionBody.innerHTML = `${type.name}`;
    optionBody.value = `${type.value}`;
    reportSelect.appendChild(optionBody);
});


const reportForm = document.getElementById('reporte-form');

reportForm.addEventListener("submit", (async (event) => {
    event.preventDefault();


    const reportValue = document.getElementById('reports-select').value;

    try {


        await generateReport(reportValue);

        Swal.fire({
            title: "Good job!",
            text: "Report successful!",
            icon: "success"
        });


    } catch (error) {
        console.error('Error:', error);
        return;
    }


}))


const generateReport = async (type) => {
    let typeReport;

    try {

        if (type === 'mantenimiento') typeReport = 'maintenances';
        if (type === 'tickets-abiertos') typeReport = 'opened_tickets';
        if (type === 'tickets-cerrados') typeReport = 'closed_tickets';
        if (type === 'dispositivos-activos') typeReport = 'active_devices';
        if (type === 'dispositivos-inactivos') typeReport = 'inactive_devices';

        console.log('Generating report for:', typeReport);

        const response = await fetch(`https://gestortiback.onrender.com/reports/${typeReport}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        // 2. Obtener el tipo de contenido (Content-Type) de la respuesta
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/pdf')) {
            console.error('La respuesta no es un PDF. Content-Type recibido:', contentType);
            alert('La respuesta de la API no fue un archivo PDF.');
            return;
        }

        // 3. Convertir la respuesta a un Blob
        // Un Blob es un objeto de archivo que contiene datos inmutables y sin procesar.
        const blob = await response.blob();

        // 4. Crear una URL de objeto a partir del Blob
        // Esta URL es temporal y apunta al Blob en la memoria del navegador.
        const url = window.URL.createObjectURL(blob);

        // 5. Crear un enlace (<a>) en memoria para iniciar la descarga
        const a = document.createElement('a');
        a.href = url;

        // 6. Asignar el nombre del archivo para la descarga
        // Puedes intentar obtenerlo de la cabecera Content-Disposition si la API la envía
        const contentDisposition = response.headers.get('Content-Disposition');
        let filename = `${typeReport}_reporte.pdf`; // Nombre de archivo por defecto
        if (contentDisposition) {
            // Ejemplo: Content-Disposition: attachment; filename="nombre_reporte.pdf"
            const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
            if (filenameMatch && filenameMatch[1]) {
                filename = filenameMatch[1];
            }
        }
        a.download = filename; // Esto le dice al navegador que descargue el archivo

        // 7. Simular un clic en el enlace para iniciar la descarga
        document.body.appendChild(a); // Es necesario que el elemento esté en el DOM para poder hacer click
        a.click();

        // 8. Limpiar la URL del objeto después de un corto tiempo
        // Esto libera la memoria que ocupa el Blob.
        document.body.removeChild(a); // Eliminar el enlace del DOM
        window.URL.revokeObjectURL(url); // Liberar la URL
        console.log(`PDF '${filename}' descargado exitosamente.`);


        return

    } catch (error) {
        console.error('Error during Ticket registration:', error);
        throw error;
    }
}