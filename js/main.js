function recuperarDatos(){
	$(".perfil-user").prepend('<div class="correo-user">' + localStorage.nombre +'</div>');		
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
	recuperarDatos();
	/*Funcion hamburgesa*/
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

  /*funcion para agregar tarjetas*/

  	$("#agregar").click(function (e) {
    	var tarjeta = $("#number-card").val();
    	console.log(tarjeta);
		if (tarjeta == "") {
			alert("Tienes que agregar una tarea");
		}else{
			var nuevaTarjeta = '<div class="nueva-tarjeta">'+ tarjeta +'</div>';
			$(".perfil-user").append(nuevaTarjeta); //agregando elemento a la lista
			$("#number-card").val(""); //limpiando input
		}
	}); 
});
