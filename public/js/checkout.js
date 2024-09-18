
    const paymentMethods = document.getElementsByName('payment-method');

    // Verifica se algum método de pagamento foi selecionado
   
    
    function cancelar(){

        window.location.reload();
    }

    const credito = document.getElementById('pagamentocredito');
    const modelcompra = document.getElementById('comprasingresso')
    const sucessocompra = document.getElementById('sucessocompra')

    // steps

    const step2icon = document.getElementById('step2');
    const step2bar = document.getElementById('step2.2');
    const step3bar = document.getElementById('step3.3');
    const step3icon = document.getElementById('step3');

    function escolhametodo(){

        if (modelcompra.classList = "hidden") {

    
        step3bar.className  = "h-1 min-w-10 w-80 my-auto rounded-sm bg-gradient-to-r from-green-500 from-50% to-black to-50%";
        step2icon.src = "img/img-desktop/checkout/checked.png"
        step2bar.classList.add('bg-green-50')
        step2bar.className = "h-1 min-w-10 w-80 my-auto rounded-sm bg-green-500";

    }


        if (paymentMethods[0].checked === true){

            credito.classList.remove("hidden");

            modelcompra.classList.add('hidden')
        }

    }

    // TEMPORÁRIO PARA PRIMEIRA APRESENTAÇÃO!!!

    function finalizarcompra() {
        credito.classList.add("hidden");


        sucessocompra.classList.remove('hidden')
        step3icon.src = "img/img-desktop/checkout/checked.png"
        step3bar.className  = "h-1 min-w-10 w-80 my-auto rounded-sm bg-green-500";
    }
