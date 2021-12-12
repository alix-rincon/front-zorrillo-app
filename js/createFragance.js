function validateRequest(){
  
    const referencia = document.getElementById("reference");
    const marca = document.getElementById("brand");
    const precio = document.getElementById("price");
    const cantidad = document.getElementById("quantity");
    var validate = true;   
    if(reference.value.length==0){
        document.getElementById("registerErrorReference").innerHTML = "Referencia no puede ser vacío";
        validate = false;
    }
    if(marca.value.length==0){
        document.getElementById("registerErrorBrand").innerHTML = "Marca no puede ser vacío";
        validate = false;
    }
    if(precio.value.length==0){
        document.getElementById("registerErrorPrice").innerHTML = "Precio no puede ser vacío";
        validate = false;
    }
    if(cantidad.value.length==0){
        document.getElementById("registerErrorQuantity").innerHTML = "Cantidad no puede ser vacío";
        validate = false;
    }
    if(validate){
        addFragance();
    }
}

function addFragance() {
    var avaliable = $("#availability").is(':checked');
    var params = {     
        reference: $("#reference").val(),
        brand: $("#brand").val(),
        category: $("#category").val(),
        presentation: $("#presentation").val(),
        description: $("#description").val(),
        availability: avaliable,
        price: $("#price").val(),
        quantity: $("#quantity").val(),
        photography: $("#photography").val()
    }
    let dataToSend = JSON.stringify(params);
    $.ajax({
        url:"http://localhost:8080/api/fragance/new",
        data:dataToSend,
        type:'POST',
        contentType:"application/JSON",
        success: function (response) {
            $("#formCreateFragance input, select").val("");
            $('.alert').show().delay(4000).fadeOut();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR , textStatus, errorThrown);
        }
    });
}

function cancel() {
    window.location.href = "../../html/fragance/listFragance.html";
}


function validateEmail(){
    var email = $("#email").val();
    $.ajax({
        url:"http://localhost:8080/api/user/emailexist/" + email,
        type:'GET',
        success: function(data) {
            if(data){
                document.getElementById("registerErrorEmail").innerHTML = "El email ya existe, por favor ingrese un email diferente";
                $("#email").val("");
            }
        },
        error: function () {
        }
    });
}
