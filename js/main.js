function recuperarDatos(){
	$(".perfil-user").prepend('<div class="correo-user">' + localStorage.nombre +'</div>');
}
function recuperarDatosTarjeta(){
	$(".perfil-user").append('<div class="nueva-tarjeta">'+ localStorage.tarjeta +'</div>'); //agregando elemento a la lista
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
	recuperarDatosTarjeta();

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

  /*funcion calcular saldo tarjeta*/
  var calcularTarifa = function(s){
  	var cobro = $("#sel1").val();
  	var resultado = s.slice(1).replace(".", "") - cobro;
  	$(".centrado-saldo").append('<div class="consulta-saldo"><h3>COSTO PASAJE</h3><p>$' +  cobro + '</p></div>');
  	$(".centrado-saldo").append('<div class="consulta-saldo"><h3>SALDO FINAL</h3><p>$' +  resultado + '</p></div>');
  }
  /*funcion para agregar tarjetas*/

  	$("#agregar").click(function (tarjeta) {
  		var tarjeta = $("#number-card").val();
		if (tarjeta == "") {
			alert("Tienes que agregar una tarea");
		}else{
			localStorage.tarjeta = document.getElementById("number-card").value;
			$(".perfil-user").append('<div class="nueva-tarjeta">'+ tarjeta +'</div>'); //agregando elemento a la lista
			$("#number-card").val(""); //limpiando input
		}
	});

	/*API mostrar saldo*/
	$("#saldo").click(function(){
		var tarjetaNumero = $("#number-card").val();
		$.ajax({
		        url     : 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
	            type    : 'GET',
	            dataType: 'json',
	            data    : {'bip' : tarjetaNumero},
	            
		        })
		        .done(function(response){
		            $(".centrado-saldo").append('<div class="consulta-saldo"><h3>SALDO TOTAL</h3><p>' +  response.saldoTarjeta + '</p></div>');
		        })
		        .fail(function(){
		            console.log("error");
		        })
	})
	/*API calcular tarifa*/
	$("#tarifa").click(function(){
		if ($("#sel1").val() == null) {
			alert("Debe ingresar una tarifa");
		}else{
			var tarjetaNumero = $("#number-card").val();
			$.ajax({
			        url     : 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
		            type    : 'GET',
		            dataType: 'json',
		            data    : {'bip' : tarjetaNumero},
		            
			        })
			        .done(function(response){
			            calcularTarifa(response.saldoTarjeta);
			        })
			        .fail(function(){
			            console.log("error");
			        })
		}

	})

});
