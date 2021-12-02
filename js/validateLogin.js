function validar(){
    document.getElementById("validateUser").innerHTML = "";
    document.getElementById("validatePassword").innerHTML = "";
    document.getElementById("validationLogin").innerHTML = "";
    const usuario = document.getElementById("user").value;
    const password = document.getElementById("password").value;
    var validate = true;
    if(usuario.length==0){        
        document.getElementById("validateUser").innerHTML = "Por favor ingrese su usuario";
        validate = false;
    }
    if(password.length==0){
        document.getElementById("validatePassword").innerHTML = "Por favor ingrese su contraseña";
        validate = false;
    }    
    if(validate){  

        login(usuario,password);
    }

}

function login(user, password){
    $.ajax({
        url:"http://localhost:8080/api/user/"+user+"/"+password,
        type:'GET',
        success: function (data) {
            if(data.id==null){
                document.getElementById("validationLogin").innerHTML = "Cuenta asociada a la combinación email/contraseña no existe";
            }else{
                localStorage.setItem('username',data.name);
                window.location.href = 'index.html';
              
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR , textStatus, errorThrown);
        }
    });
}
