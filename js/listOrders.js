function listOrders() {
    $.ajax({
        url: "http://localhost:8080/api/order/all",
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            listAllOrders(response);
        },
        error: function (xhr, status) {
            console.log(status);
        }
    });
}

function listAllOrders(items) {
    var tabla = `<table class="table table-striped">
                <thead>
                    <tr>                        
                        <th scope="col">Identificación</th>
                        <th scope="col">Nombres</th>
                        <th scope="col">Email</th>
                        <th scope="col">Tipo de Usuario</th>
                        <th scope="col">Zona</th>
                        <th scope="col" colspan=2>Acciones</th>
                    </tr>
                </thead>`;

    for (var i = 0; i < items.length; i++) {
        tabla += `<tbody>
                    <tr>
                        <th scope="row">${items[i].identification}</th>
                        <td>${items[i].name}</td>
                        <td>${items[i].email}</td>
                        <td>${items[i].type}</td>   
                        <td>${items[i].zone}</td>   
                        <td style="width:8%"><button type="button" class="btn btn-info btn-sm" onclick="editClient('${items[i].id}')">Editar</td>   
                        <td style="width:8%"><button type="button" class="btn btn-sm btn-outline-dark" onclick="deleteClient('${items[i].id}')">Eliminar</td>
                    </tr>
                </tbody>
        `;
    }

    tabla += `</table>`;
    $("#listado").html(tabla);
}
function editClient(id){
    window.location.href="../../html/users/editUser.html?id="+id;
}

function deleteClient(id) { 
    $.ajax({
        url: "http://localhost:8080/api/user/" + id,
        type: 'DELETE',
        contentType: "application/JSON",
        success: function () {            
            listUsers();
            alert("Registro eliminado correctamente");
            window.location.href = "listUsers.html";
        },
        error: function (xhr, status) {
            console.log(status);
        }
    });
}

listUsers();

