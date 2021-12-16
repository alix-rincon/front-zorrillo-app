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
            listAllProductsByOrder(response);
        },
        error: function (xhr, status) {
            console.log(status);
        }
    });
}

function listAllProductsByOrder(response) {
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
                        <th scope="col">Stock</th>
                    </tr>
                </thead><tbody>`;

    for (var key in response.products) {
         if (response.products.hasOwnProperty(key)) {
            tabla += `
                    <tr>
                        <th scope="row">${response.products[key].reference}</th>
                        <td><image src="${response.products[key].photography}"></td>
                        <td>${response.products[key].brand}</td>
                        <td>${response.products[key].category}</td>   
                        <td>${response.products[key].description}</td>
                        <td>${response.products[key].price}</td>
                        <td>${response.quantities[key]}</td>
                        <td>${response.products[key].quantity}</td>       
                    </tr>
                
        `;                   
        }
    }                 
    tabla += `</tbody></table>`;
    $("#listadoProductos").html(tabla);
}

function changeStatus(){
    let validate = true;
    if($("#newStatus").val() == "Seleccione..."){
        alert("Por favor seleccione un estado");
        $("#newStatus").focus();
        validate = false;
    }
    if(validate){
        var data = {
            id: $("#id").val(),
            status: $("#newStatus").val(),
        };
        let dataToSend = JSON.stringify(data);
        $.ajax({
            url:"http://localhost:8080/api/order/update",
            data:dataToSend,
            type:'PUT',
            contentType:"application/JSON",
            success: function (response) {
                $("#codeOrder").html(data.id);
                $("#status").val(data.status);
                $("#newStatus").val("Seleccione...");
                $('.alert').show().delay(10000).fadeOut();            
                $("table span").html("0");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR , textStatus, errorThrown);
            }
        });
    }
    
}

listOrderId();