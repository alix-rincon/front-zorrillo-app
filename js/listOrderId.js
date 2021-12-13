function listOrderId() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    $.ajax({
        url: "http://localhost:8080/api/order/"+id,
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            $("#date").val(response.registerDay);
            $("#id").val(response.id);
            $("#status").val(response.status);           
            listAllProductsByOrder(response.products);
        },
        error: function (xhr, status) {
            console.log(status);
        }
    });
}

function listAllProductsByOrder(products) {
    
    console.log(products);
    var tabla = `<table class="table table-striped">
                <thead>
                    <tr> 
                        <th scope="col">Referencia</th>                       
                        <th scope="col">Foto</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                    </tr>
                </thead><tbody>`;

    for (var key in products) {
        if (products.hasOwnProperty(key)) {
            tabla += `
                    <tr>
                        <th scope="row">${products[key].reference}</th>
                        <td><image src="${products[key].photography}"></td>
                        <td>${products[key].name}</td>
                        <td>${products[key].category}</td>   
                        <td>${products[key].description}</td>
                        <td>${products[key].price}</td>
                        <td>${products[key].quantity}</td>      
                        <!--<td style="width:8%"><button type="button" class="btn btn-info btn-sm" onclick="viewOrder('${products[key].reference}')">Ver Pedido</td>-->
                    </tr>
                
        `;                   
        }
    }                 

    tabla += `</tbody></table>`;
    $("#listadoProductos").html(tabla);
}

listOrderId();