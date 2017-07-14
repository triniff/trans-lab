function recuperarDatos(){
	document.getElementById("holi").innerHTML = "correo: " + localStorage.nombre;		
}
function guardarDatos(){
	localStorage.nombre = document.getElementById("user").value;
}
$(document).ready(function() {

	$("#sign-in").click(function(){
		var correo = $("#user").val();
		var pass = $("#pass").val();

		if (correo == "" || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo) == false){
			alert("nope");
		}else if (pass == "" || pass.length > 8) {
			alert("nope 2")
		}
		else{
			window.location.href="trans-lab.html";
			guardarDatos();
		}
	})

});

$(document).ready(function() {
	//recuperarDatos();
	var trigger = $('.hamburger'),
    overlay = $('.overlay'),
    isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  }); 

});
