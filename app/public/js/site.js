
$(window).load(function () {
    var nomeCliente = document.getElementById('nomeCliente').value;
    var emailCliente = document.getElementById('emailCliente').value;
    var mensagem = document.getElementById('mensagem').value;

    var lblNomeCliente = document.getElementById('lblNomeCliente').style.display;
    var lblEmailCliente = document.getElementById('lblEmailCliente').value;
    var lblMensagem = document.getElementById('lblMensagem').value;


    lblNomeCliente = "none";
    lblEmailCliente = "none";
    lblMensagem = "none";
});

$("#emailCliente").blur(function () {

    validaEmail();
});

function validaEmail() {
    var emailCliente = document.getElementById('emailCliente');

    usuario = emailCliente.value.substring(0, emailCliente.value.indexOf("@"));
    dominio = emailCliente.value.substring(emailCliente.value.indexOf("@") + 1, emailCliente.value.length);

    if ((usuario.length >= 1) &&
    (dominio.length >= 3) &&
    (usuario.search("@") == -1) &&
    (dominio.search("@") == -1) &&
    (usuario.search(" ") == -1) &&
    (dominio.search(" ") == -1) &&
    (dominio.search(".") != -1) &&
    (dominio.indexOf(".") >= 1) &&
    (dominio.lastIndexOf(".") < dominio.length - 1)) {
        document.getElementById('lblEmailCliente').style.display = "none";
    }
    else {
        document.getElementById('lblEmailCliente').style.display = "block";
        //document.getElementById('lblEmailCliente').innerHTML="<font color='red'>E-mail inválido </font>";
    }
}

$(function () {
    $('#btnEnviaEmail').on('click', function (e) {
        e.preventDefault();
        var nomeCliente = document.getElementById('nomeCliente').value;
        var emailCliente = document.getElementById('emailCliente').value;
        var mensagem = document.getElementById('mensagem').value;

        var lblNomeCliente = document.getElementById('lblNomeCliente').style.display;
        var lblEmailCliente = document.getElementById('lblEmailCliente').style.display;
        var lblMensagem = document.getElementById('lblMensagem').style.display;

        if (nomeCliente == "") {
            document.getElementById('lblNomeCliente').style.display = "block";
        }
        else {
            document.getElementById('lblNomeCliente').style.display = "none";
        }

        if (emailCliente == "") {
            document.getElementById('lblEmailCliente').style.display = "block";
        }
        else {
            document.getElementById('lblEmailCliente').style.display = "none";
        }       

        if (mensagem == "") {
            document.getElementById('lblMensagem').style.display = "block";
        }
        else {
            document.getElementById('lblMensagem').style.display = "none";
        }

        validaEmail();

        if (lblNomeCliente == "none" && lblEmailCliente == "none" && lblMensagem == "none") {
            var jsonData = JSON.stringify({
                nomeCliente: nomeCliente,
                emailCliente: emailCliente,
                mensagem: mensagem
            });

            $.ajax({
                type: "POST",
                url: "Index.aspx/enviaEmail",
                cache: false,
                async: true,
                contentType: "application/json; charset=utf-8",
                data: jsonData,
                dataType: "JSON",
                error: function (result) {
                    document.getElementById('error').style.display = "block";
                    document.getElementById('success').style.display = "none";

                },
                success: function (result) {
                    document.getElementById('error').style.display = "none";
                    document.getElementById('success').style.display = "block";

                    document.getElementById('nomeCliente').value = "";
                    document.getElementById('emailCliente').value = "";
                    document.getElementById('mensagem').value = "";
                }

            });            
        }
        else
        {
            alert('Não foi possível enviar sua mensagem, verifique os campos informados.');
        }
    });
});