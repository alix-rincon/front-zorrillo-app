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
        updateFragance();
    }
}

function updateFragance() {
    const urlParams = new URLSearchParams(window.location.search);
    const id_ = urlParams.get('id');
    var avaliable = $("#availability").is(':checked');
    var params = {     
        id: id_,
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
        url:"http://localhost:8080/api/fragance/update",
        data:dataToSend,
        type:'PUT',
        contentType:"application/JSON",
        success: function (response) {           
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

function getFragance() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    
    $.ajax({
        url: "http://144.22.242.160:8080/api/fragance/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (response_) {

            for (var key in response_) {
                if (response_.hasOwnProperty(key)) {
                    //console.log(key + " -> " + response_[key]);
                    if(key !== "photography"){
                        if(key === "availability"){
                            $("#" + key).prop('checked', response_[key]);
                        }
                        else{
                            $("#" + key).val(response_[key]);
                        }
                        
                    }                    
                }
            }            
        },
        error: function (xhr, status) {
            console.log(status);
        }
    });
}
