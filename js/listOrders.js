function listOrders() {
    $.ajax({
        url: "http://localhost:8080/api/order/all",
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            //console.log(response);
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
                        <th scope="col">E-mail</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">No. Pedido</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Pedido</th>
                    </tr>
                </thead>`;

    for (var i = 0; i < items.length; i++) {
        tabla += `<tbody>
                    <tr>
                        <th scope="row">${items[i].salesMan.identification}</th>
                        <td>${items[i].salesMan.name}</td>
                        <td>${items[i].salesMan.email}</td>
                        <td>${items[i].registerDay}</td>   
                        <td>${items[i].id}</td>
                        <td>${items[i].status}</td>   
                        <td style="width:8%"><button type="button" class="btn btn-info btn-sm" onclick="viewOrder('${items[i].id}')">Ver Pedido</td>
                    </tr>
                </tbody>
        `;
    }

    tabla += `</table>`;
    $("#listado").html(tabla);
}
function viewOrder(id){
    window.location.href="../../html/order/viewOrder.html?id="+id;
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

listOrders();

