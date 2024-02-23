document.getElementById('cpf').addEventListener('input', function (event) {
	let inputValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos

	if (inputValue.length > 11) {
	inputValue = inputValue.slice(0, 11); // Limita a 11 dígitos
	}

	// Adiciona pontos e traço no formato do CPF
	inputValue=inputValue.replace(/(\d{3})(\d)/,"$1.$2");       //Coloca um ponto entre o terceiro e o quarto dígitos
	inputValue=inputValue.replace(/(\d{3})(\d)/,"$1.$2");       //Coloca um ponto entre o terceiro e o quarto dígitos (para o segundo bloco de números)
	
	if (inputValue.length >= 12) {
		inputValue=inputValue.replace(/(\d{3})(\d{1,2})$/,"$1-$2"); //Coloca um hífen entre o terceiro e o quarto dígitos
	}

	event.target.value = inputValue;
});

document.getElementById('telefone').addEventListener('input', function (event) {
	let inputValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos

	if (inputValue.length > 11) {
		inputValue = inputValue.slice(0, 11); // Limita a 11 dígitos
	}

	// Formata para o formato do telefone
	//inputValue = inputValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
	
	if (inputValue.length > 1) {
		inputValue = inputValue.replace(/(\d{2})(\d)/, '($1) $2');
	}
	if (inputValue.length > 9 && inputValue.length < 14) {
		inputValue = inputValue.replace(/(\d{4})(\d)/, '$1-$2');
	}
	if (inputValue.length == 14) {
		inputValue = inputValue.replace(/(\d{5})(\d)/, '$1-$2');
	}

	event.target.value = inputValue;
});

document.getElementById('envio').addEventListener('click', function() {
	/* Valida os campos do formulário */
	var cpf = document.querySelector("#cpf").value.replace(/\D/g, '');
	var telefone = document.querySelector("#telefone").value.replace(/[^0-9() -]/g, '');
	var msg = document.querySelector("#msg").value;
	
	var campos = [cpf, telefone, msg];
	if (campos.includes('')) {
		alert('Atenção: verifique se todos os campos foram preenchidos  e tente novamente!');
		return;
	}
	
	if (cpf.length !== 11) {
        alert("CPF deve ter 11 dígitos numéricos!");
		return;
	}

	var soma = 0;
	for (var i = 0; i < 9; i++) {
		soma += parseInt(cpf.charAt(i)) * (10 - i);
	}

	var resto = (soma * 10) % 11;

	if (resto === 10 || resto === 11) {
		resto = 0;
	}

	if (resto !== parseInt(cpf.charAt(9))) {
		alert("O CPF digitado é inválido!");
		return;
	}

	soma = 0;
	for (var i = 0; i < 10; i++) {
		soma += parseInt(cpf.charAt(i)) * (11 - i);
	}

	resto = (soma * 10) % 11;

	if (resto === 10 || resto === 11) {
		resto = 0;
	}

	if (resto !== parseInt(cpf.charAt(10))) {
		alert("O CPF digitado é inválido!");
		return;
	}
	
	if (telefone.length < 14) {
		alert("O telefone digitado é inválido!");
		return;
	}
	
	if (msg.length < 3 || msg.length > 100) {
		alert('A mensagem deve ter entre 3 e 100 caracteres!');
		return;
	}
	
	alert("Formulário enviado com sucesso! Muito obrigado pela sua mensagem, retornaremos o mais breve possível!");
	window.location.href = window.location.href;
});

document.getElementById('envio2').addEventListener('click', function() {
	var n1 = document.querySelector("#n1").value.replace(/[^0-9.-]/g, '');
	var n2 = document.querySelector("#n2").value.replace(/[^0-9.-]/g, '');
	var n3 = document.querySelector("#n3").value.replace(/[^0-9.-]/g, '');
	
	if (parseFloat(n1) == NaN) {
		document.querySelector("#n1").value = 0;
		n1 = 0;
	}
	
	if (parseFloat(n2) == NaN) {
		document.querySelector("#n2").value = 0;
		n2 = 0;
	}
	
	if (parseFloat(n3) == NaN) {
		document.querySelector("#n3").value = 0;
		n3 = 0;
	}
	
	resultado = (n2 * n3) / n1;
	
	document.querySelector("#result").value = resultado;
});

document.getElementById('capture-download').addEventListener('click', function() {
	html2canvas(document.querySelector("#captura")).then(function(canvas) {
		// Cria um elemento de imagem
        var img = new Image();
        img.src = canvas.toDataURL("image/png");

        // Cria um link para fazer o download da imagem
        var link = document.createElement('a');
        link.href = img.src;
        link.download = 'captura.png';

        // Simula o clique no link para iniciar o download
        link.click();
	});
});

document.getElementById('js-header-hamburger').addEventListener('click', function() {
	elemento = document.querySelector("#header");
	
	// Verificar se a classe existe no elemento
	if (elemento.classList.contains("header-fade-in")) {
		// Se existir, remova a classe
		document.querySelector("#header").classList.remove("header-fade-in");
	} else {
		// Se não existir, adicione a classe
		document.querySelector("#header").classList.add("header-fade-in");
	};
	
	// Verificar se a classe existe no elemento
	if (elemento.classList.contains("is-open")) {
		// Se existir, remova a classe
		document.querySelector("#header").classList.remove("is-open");
	} else {
		// Se não existir, adicione a classe
		document.querySelector("#header").classList.add("is-open");
	};
});

document.addEventListener('DOMContentLoaded', function() {
  var backgroundImage = document.querySelector('.imagem-fundo-animado');
  backgroundImage.style.transform = 'scale(1)'; // Ajuste o valor conforme necessário
});

function openModal() {
    document.getElementById("myModal").style.display = "block";
}

function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

function ShowHideTel(elemento, vertelefone) {
	elemento = document.querySelector(elemento);
	vertelefone = document.querySelector(vertelefone);
	
	if (elemento.style.display == 'block') {
		elemento.style.display = "none";
		vertelefone.innerText = 'ver telefone';
	} else {
		elemento.style.display = "block";
		vertelefone.innerText = 'ocultar telefone';
	}
}