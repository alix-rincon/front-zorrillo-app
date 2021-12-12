function validar(){
    var divs = document.querySelectorAll('.invalid-feedback');
    for(var i = 0; i < divs.length; i++) {
    divs[i].innerText = '';
    }

    const usuario = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const expReg = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    var validate = true;
    if(usuario.value.length==0){
        document.getElementById("registerErrorUser").innerHTML = "Nombre de usuario Requerido";
        validate = false;
    }
    if(email.value.length==0){
        document.getElementById("registerErrorEmail").innerHTML = "Debe registrar un correo electrónico";
        validate = false;
    }
    if(password2.value.length==0){
        document.getElementById("registerErrorPwd").innerHTML = "Debe registrar una contraseña";
        validate = false;
    }
    if(password.value!=password2.value){
        document.getElementById("registerErrorConfirmPwd").innerHTML = "Contraseña/confirmación no coincidentes.";
        validate = false;
    }
    if(expReg.test(email.value)==false){
        document.getElementById("registerErrorEmail").innerHTML = "El email no es válido";
        validate = false;
    }

    if(validate){
        validateEmail(email.value);
    }

}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function registerUser(){
    var randomId = getRandomArbitrary(1,1000);

    var params = {     
        id: randomId,
        name: $("#name").val(),
        email: $("#email").val(),
        password: $("#password").val()
    }
    let dataToSend = JSON.stringify(params);
    console.log(dataToSend);
    $.ajax({
        url:"http://localhost:8080/api/user/new",
        data:dataToSend,
        type:'POST',
        contentType:"application/JSON",
        success: function (data) {
            console.log(data);
            $("#formlogin input").val("");
            $("#toastMessage").html("<b>Correcto! </b> Usuario registrado correctamente");
            $('.toast').toast('show');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#toastMessage").html("Error al intentar guardar el registro");
            $('.toast').toast('show');
        }
    });
   
}

function validateEmail(email){
    $.ajax({
        url:"http://localhost:8080/api/user/emailexist/" + email,
        type:'GET',
        success: function(data) {
            if(data){
                document.getElementById("registerErrorEmail").innerHTML = "El email ya existe";
            }else{
                registerUser();
            }
        },
        error: function () {
        }
    });
}