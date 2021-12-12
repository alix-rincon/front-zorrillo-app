function validateRequest(){
    const expReg = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    const email = document.getElementById("email");
    const usuario = document.getElementById("name");
    const password = document.getElementById("password");
    var validate = true;

    if(expReg.test(email.value)==false){
        document.getElementById("registerErrorEmail").innerHTML = "El email no es válido";
        validate = false;
    }
    if(usuario.value.length==0){
        document.getElementById("registerErrorUser").innerHTML = "Nombre de usuario Requerido";
        validate = false;
    }

    if(email.value.length==0){
        document.getElementById("registerErrorEmail").innerHTML = "Debe registrar un correo electrónico";
        validate = false;
    }

    if(password.value.length==0){
        document.getElementById("registerErrorPwd").innerHTML = "Debe registrar una contraseña";
        validate = false;
    }

    if(validate){
        addUser();
    }
}

function addUser() {
    var params = {   
        identification: $("#identification").val(),
        name: $("#name").val(),
        address: $("#address").val(),
        cellPhone: $("#cellPhone").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        zone: $("#zone").val(),
        type: $("#type").val()         
    }
    let dataToSend = JSON.stringify(params);
    $.ajax({
        url:"http://localhost:8080/api/user/new",
        data:dataToSend,
        type:'POST',
        contentType:"application/JSON",
        success: function (response) {
            $("#formCreateUser input, select").val("");
            $('.alert').show().delay(4000).fadeOut();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR , textStatus, errorThrown);
        }
    });
}

function cancel() {
    window.location.href = "../../html/users/listUsers.html";
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
