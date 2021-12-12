function listProducts() {
    $.ajax({
        url: "http://localhost:8080/api/fragance/all",
        type: 'GET',
        dataType: 'json',
        success: function (response) {       
            listAllProducts(response);
        },
        error: function (xhr, status) {
            console.log(status);
        }
    });
}

function listAllProducts(items) {
    var tabla = `<table class="table table-striped">
                <thead>
                    <tr>                        
                        <th scope="col">Referencia</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Presentación</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col" colspan=2>Acciones</th>
                    </tr>
                </thead>`;

    for (var i = 0; i < items.length; i++) {
        tabla += `<tbody>
                    <tr>
                        <th scope="row">${items[i].reference}</th>
                        <td>${items[i].brand}</td>
                        <td>${items[i].category}</td>
                        <td>${items[i].presentation}</td>   
                        <td>${items[i].quantity}</td>   
                        <td style="width:8%"><button type="button" class="btn btn-info btn-sm" onclick="detailClient('${items[i].reference}')">Editar</td>   
                        <td style="width:8%"><button type="button" class="btn btn-sm btn-outline-dark" onclick="deleteFragance('${items[i].reference}')">Eliminar</td>
                    </tr>
                </tbody>
        `;
    }

    tabla += `</table>`;
    $("#listado").html(tabla);
}
function detailClient(id){
    window.location.href="../../html/fragance/editFragance.html?id="+id;
}

function deleteFragance(id) {   
    $.ajax({
        url: "http://localhost:8080/api/fragance/" + id,
        type: 'DELETE',
        contentType: "application/JSON",
        success: function () {            
            listProducts();
            alert("Registro eliminado correctamente");
            window.location.href = "/html/fragance/listFragance.html";
        },
        error: function (xhr, status) {
            console.log(status);
        }
    });
}

listProducts();

