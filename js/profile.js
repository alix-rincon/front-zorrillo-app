$(document).ready(function() {
    let template = fetch('modal.html')
    .then(response => response.text())
    .then(data => {
        var d1 = document.body;
        d1.insertAdjacentHTML('beforeend', data);
    });
}); 

function openprofile(){
    var myModalEl = document.querySelector('#myModal')
    var modal = bootstrap.Modal.getOrCreateInstance(myModalEl);
    modal.show();
}


