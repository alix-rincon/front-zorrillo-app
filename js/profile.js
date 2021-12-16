$(document).ready(function() {
    let template = fetch('/modal.html')
    .then(response => response.text())
    .then(data => {
        var d1 = document.body;
        d1.insertAdjacentHTML('beforeend', data);     
    });
}); 

function openprofile(){
    var dataSession = JSON.parse(sessionStorage.getItem("_user"));
    $("#name").html(dataSession.name);
    $("#identification").html(dataSession.identification);
    $("#email").html(dataSession.email);
    $("#profile").html(dataSession.profile);
    $("#zone").html(dataSession.zone);
    var myModalEl = document.querySelector('#myModal')
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.show();
}


