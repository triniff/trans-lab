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
		}
	})

});