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
	(function hamburgesa(){
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
	     overlay.click(function () {
	     	overlay.hide();
	        trigger.removeClass('is-open');
	        trigger.addClass('is-closed');
	        isClosed = false;
        	$('#wrapper').toggleClass('toggled');
	    })

	  })();
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  }); 


  /*funcion para agregar tarjetas*/
  	function recuperarDatosTarjeta(){
		$(".perfil-user").append('<div class="nueva-tarjeta">'+ localStorage.tarjeta +'</div>'); //agregando elemento a la lista
	}recuperarDatosTarjeta();

  	$("#agregar").click(function (tarjeta) {
  		var tarjeta = $("#number-card").val();
		if (tarjeta == "") {
			alert("Tienes que agregar una tarea");
		}else{
			localStorage.tarjeta = tarjeta;
			$(".perfil-user").append('<div class="nueva-tarjeta">'+ localStorage.tarjeta +'</div>'); //agregando elemento a la lista
			$("#number-card").val(""); //limpiando input
		}
	});
  	/*funcion tarjeta en selec*/
  	function numeroTarjeta (){
  		console.log(localStorage.tarjeta);
  		$("#sel2").append('<option>' + localStorage.tarjeta +'</option>');
  	}numeroTarjeta ();

  	function tarjetaYSelect(){
  		if ($("#sel2").val() != null || $("#number-card").val() != "") {
  			var numero;
			if ($("#sel2").val() != null) {
				numero = $("#sel2").val();
				return numero;
			}if ($("#number-card").val() != null) {
				numero = $("#number-card").val();
				return numero;
			}
		}
		else{
			alert("Debe poner un número de tarjeta");
		}
  	}
  	function tarjetaValida(numero){
		$.ajax({
		        url     : 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
	            type    : 'GET',
	            dataType: 'json',
	            data    : {'bip' : numero},
	            
		        })
		        .done(function(response){
		        	$("#number-card").val("");
		        	$("#sel2").val(1);	
		            $(".centrado-saldo").append('<div class="consulta-saldo"><h3>SALDO TOTAL</h3><p>' +  response.saldoTarjeta + '</p></div>');
		        })
		        .fail(function(){
		            console.log("error");
		        })
  	}

	/*API mostrar saldo*/
	$("#saldo").click(function(){
		tarjetaYSelect();
		tarjetaValida(tarjetaYSelect());

	})


	/*API calcular tarifa*/
	 /*funcion calcular saldo tarjeta*/
  	var calcularTarifa = function(s){
	  	var cobro = $("#sel1").val();
	  	var resultado = s.slice(1).replace(".", "") - cobro;
	  	$(".centrado-saldo").append('<div class="consulta-saldo"><h3>COSTO PASAJE</h3><p>$' +  cobro + '</p></div>');
	  	$(".centrado-saldo").append('<div class="consulta-saldo"><h3>SALDO FINAL</h3><p>$' +  resultado + '</p></div>');
	  	$("#sel1").val(1);
  	}
	function tarjetaValidaTarifa(numero){
		if ($("#sel1").val() == null) {
			alert("Debe ingresar una tarifa");
		}else{
			$.ajax({
			        url     : 'http://bip-servicio.herokuapp.com/api/v1/solicitudes.json',
		            type    : 'GET',
		            dataType: 'json',
		            data    : {'bip' : numero},
		            
			        })
			        .done(function(response){
			        	$("#number-card").val("");
		        		$("#sel2").val(1);	
			            calcularTarifa(response.saldoTarjeta);
			        })
			        .fail(function(){
			            console.log("error");
			        })
		}

	}
	$("#tarifa").click(function(){
		tarjetaYSelect();
		tarjetaValidaTarifa(tarjetaYSelect());
	})

});
