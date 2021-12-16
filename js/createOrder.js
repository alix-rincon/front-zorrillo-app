function listOrders() {
    $.ajax({
        url: "http://localhost:8080/api/fragance/all",
        type: 'GET',
        dataType: 'json',
        success: function (response) {    
            listAllProductsByOrder(response);
        },
        error: function (xhr, status) {
            console.log(status);
        }
    });
}

function listAllProductsByOrder(items) {
    var tabla = `<table class="table table-striped">
                <thead>
                    <tr> 
                        <th scope="col">Nombre</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Disponibilidad</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Foto</th>
                        <th scope="col">Cantidad  </th>
                        <th scope="col">Cant. Agregada</th>
                        <th scope="col" colspan=2></th>
                    </tr>
                </thead><tbody>`;
                for (var i = 0; i < items.length; i++) {
                    sessionStorage.setItem(items[i].reference,JSON.stringify(items[i]));
                    tabla += `
                        <tr>
                            <th scope="row">${items[i].reference}</th>
                            <td>${items[i].category}</td>
                            <td>${items[i].description}</td>
                            <td>${traslateStatus(items[i].availability)}</td>   
                            <td>${items[i].price}</td>
                            <td><image src="${items[i].photography}"></td>                                
                            <td><input style="width:75px"  id="input-${items[i].reference}" min=0 class="form-control" type="number"/></td>
                            <td style="text-align:right"><span id="total-${items[i].reference}">0</span></td>     
                            <td style="width:8%"><button type="button" class="btn btn-sm btn-outline-dark" onclick="addProductOrder('${items[i].reference}')">Agregar</td>
                            <td style="width:8%"><button type="button" class="btn btn-sm btn-outline-dark" onclick="deleteProductOrder('${items[i].reference}')">Eliminar</td>
                        </tr>                          
                    `;
                }          

    tabla += `</tbody></table>`;
    $("#listado").html(tabla);
}

function addProductOrder(id){
    let cantidad = $("#input-"+id).val();
    $("#total-"+id).html(parseInt(cantidad) + parseInt($("#total-"+id).html()));
    $("#input-"+id).val("");
}

function deleteProductOrder(id){
    let cantidad = parseInt($("#input-"+id).val());
    let total = parseInt($("#total-"+id).html());
    if (cantidad <= total && cantidad > 0){
        $("#total-"+id).html(total - cantidad);
        $("#input-"+id).val("");
    }else{
        alert("ingrese un valor válido mayor a 0 y menor o igual a: "+total);
    }
    
}

function sendOrder(){   
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    let data= {
        'registerDay': today.toISOString(),
        'status' : "Pendiente",
        'salesMan' : JSON.parse(sessionStorage.getItem("_user")), 
        'products': {},
        'quantities': {}        
    };
    $.each($("table span"), function( index, value ) {
        console.log(value.innerHTML);
        if(parseInt(value.innerHTML) > 0){
            var name_ = value.id.replace("total-","");
            var cant = value.innerHTML;
            data.products[name_] = JSON.parse(sessionStorage.getItem(name_));
            data.quantities[name_] = parseInt(cant);
            createOrder(data);   
        }else{
            alert("Cantidades registradas, deben ser mayor a cero");
        } 
      });
      
    
}

function createOrder(data){
    let dataToSend = JSON.stringify(data);
    var numOrder = Math.floor(Math.random() * 1000);
    $.ajax({
        url:"http://localhost:8080/api/order/new",
        data:dataToSend,
        type:'POST',
        contentType:"application/JSON",
        success: function (response) {
            $("#codeOrder").html(numOrder+ " - "+ JSON.parse(sessionStorage.getItem("_user")).id);
            $('.alert').show().delay(10000).fadeOut();            
            $("table span").html("0");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR , textStatus, errorThrown);
        }
    });
}

listOrders();