let dataTable;
let dataTableIsInitialized = false;

const dataTableOptions = {
    paging: false,
    scrollCollapse: true,
    scrollY: "250px",
    lengthMenu: [5, 10, 15, 20, 100, 200, 500],
    columnDefs: [
        { className: "centered", targets: [1, 2, 3, 4, 5, 6] },
        { orderable: false, targets: [1, 2, 3, 4, 5, 6, 7] },
        { searchable: false, targets: [3, 4, 5, 6, 7] },
        { width: "40%", targets: [7] },
        { width: "20%", targets: [1] },
        { width: "10%", targets: [0] }
    ],
    pageLength: 3,
    destroy: true,
    language: {
        lengthMenu: "Mostrar _MENU_ registros por página",
        zeroRecords: "Ningún Socio encontrado",
        info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún Socio encontrado",
        infoFiltered: "(filtrados desde _MAX_ registros totales)",
        search: "Buscar Socio:",
        loadingRecords: "Cargando...",
        paginate: {
            first: "Primero",
            last: "Último",
            next: "Siguiente",
            previous: "Anterior"
        }
        
    }
};

const initDataTable = async () => {
    if (dataTableIsInitialized) {
        dataTable.destroy();
    }

    await listUsers();

    dataTable = $("#datatable_users").DataTable(dataTableOptions);

    dataTableIsInitialized = true;
};

const listUsers = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        let content = ``;
        users.forEach((user, index) => {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>${user.address.city}</td>
                    <td>${user.company.name}</td>
                    <td>${user.company.name}</td>
                    <td><i class="fa-solid fa-check" style="color: green;"></i></td>
                    <td>
                        <button class="btn btn-sm btn-primary">Detalles</button>  
                        <button class="btn btn-sm btn-warning">Modificar</button>
                        <button class="btn btn-sm btn-danger">Eliminar</button>
                    </td>
                </tr>`;
            /*Comentarios */
            //<button class="btn btn-sm btn-primary"><i class="fa-solid fa-pencil"></i></button>


        });
        tableBody_users.innerHTML = content;
    } catch (ex) {
        alert(ex);
    }
};

window.addEventListener("load", async () => {
    await initDataTable();
});
