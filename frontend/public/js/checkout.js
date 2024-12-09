
             
            var qntinteiro = 0;
            var qntmeio = 0;
            var qtnvip = 0;

document.addEventListener('DOMContentLoaded', function () {
   
    
    const campmeio = document.getElementById('campmeio')
    const campinteira = document.getElementById("campinteira")
    const campvip = document.getElementById("campvip")

    var  showclicked = sessionStorage.getItem('showclicked');
async function carregarclicado() {
    

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/show/${showclicked}`,{
            method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
        });
        if (!response.ok) {
            throw new Error('Erro ao carregar os filmes')
        }
        const data = await response.json();
        show = data;
        console.log(show);

        document.getElementById('capashow').setAttribute("src", data.capa) 
        document.getElementById('tituloshow').textContent = data.nome
        document.getElementById('endereco').textContent = data.endereco
        document.getElementById('artistas').textContent = data.artista
        document.getElementById('data-hora').textContent = `${data.data} ${data.horario} horas`



        var precomeia = data.preco / 2
        
        var precovip = data.preco * 2

        campmeio.innerHTML = ""
        campmeio.textContent = `R$ ${precomeia}`;
        campinteira.textContent = `R$ ${data.preco}`
        campvip.textContent = `R$ ${precovip}`

       
        const btnmeio = document.getElementById('btnmeio')
        const btninteira = document.getElementById('btninteira')
        const btnvip = document.getElementById('btnpvip')
        
    

        btnmeio.setAttribute("data-valor", precomeia)
        btninteira.setAttribute("data-valor", data.preco)
        btnvip.setAttribute("data-valor", precovip )

    } catch (error) {
        console.error('Erro: ', error)
    }

}


carregarclicado()

})



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


    let quantidadeCarrinho = 0; // Quantidade de itens no carrinho
    let totalCarrinho = 0; // Total do carrinho
    
    // Função para atualizar o carrinho
    function atualizarCarrinho(valorIngresso) {
        quantidadeCarrinho++; // Incrementa a quantidade de itens
        totalCarrinho += valorIngresso; // Soma o valor do ingresso ao total
    
        // Atualiza a quantidade de itens no carrinho
        document.getElementById('total').textContent = 'R$ ' + totalCarrinho.toFixed(2)
        document.getElementById('subTotal').textContent = 'R$ ' + totalCarrinho.toFixed(2)
        document.getElementById('quantidadeCarrinho').textContent = quantidadeCarrinho;
        // Atualiza o valor total no carrinho
        document.getElementById('totalCarrinho').textContent = `R$ ${totalCarrinho.toFixed(2)}`;
    }
    
    // Adiciona o evento de clique para os botões de adicionar ingresso
    document.querySelectorAll('.adicionar-ingresso').forEach((button) => {
        button.addEventListener('click', function () {
            let valorIngresso = parseFloat(this.dataset.valor); // Pega o valor do ingresso
            atualizarCarrinho(valorIngresso); // Atualiza carrinho com o valor do ingresso
        });
    });
    
    // Finalizar a compra (opcional, exemplo de redirecionamento)
    document.getElementById('finalizarCompra').addEventListener('click', function() {
        if (quantidadeCarrinho > 0) {
            // Redireciona para a página de pagamento (exemplo)
            window.location.href = "profile.html";
        } else {
            alert("Adicione itens ao carrinho antes de finalizar a compra.");
        }
    });
    
    
        // Inicializa as variáveis de subtotal, taxa e total
        let subtotal = 0;
        const taxaPercentual = 0.10; // 10%
    
        // Função para adicionar o valor do ingresso ao subtotal e ao sumário
        function adicionarItem(id) {

           

            // Atualiza o subtotal
           
          

            // Calcula a taxa de 10% do subtotal
            const taxa = subtotal * taxaPercentual;
    
            // Calcula o total
            const total = subtotal + taxa;
    
            // Atualiza os valores na interface

            const camposumario = document.getElementById('sumario')

          
           
            if (id === "btnmeio") {
                if(qntmeio === 0){
                    const ingressomeio = document.createElement("p")
    
                   
                    
                    camposumario.appendChild(ingressomeio)
    
                    ingressomeio.textContent = `${qntmeio}  Ingresso Meia`
                    ingressomeio.id = "textmeio"
                    
                }
                qntmeio = qntmeio + 1;
              
                document.getElementById('textmeio').textContent = `${qntmeio}  Ingresso Meia`
            }


          
                if (id === "btninteira") {
                    
                    
                if (qntinteiro === 0){    
                    console.log('asdasd')
                const ingressointeiroo = document.createElement("p")

                camposumario.appendChild(ingressointeiroo)

                ingressointeiroo.textContent = `${qntinteiro} Ingresso Inteiro`
                ingressointeiroo.id = "textinteiro"}

                qntinteiro = qntinteiro + 1;
                document.getElementById('textinteiro').textContent = `${qntinteiro}  Ingresso Inteiro`    
            }

           
            if (id === "btnpvip") {
                    
                    
                if (qtnvip === 0){    
                const ingressoVIP = document.createElement("p")

                camposumario.appendChild(ingressoVIP)

                ingressoVIP.textContent = `${qtnvip} Ingresso Inteiro`
                ingressoVIP.id = "textVIP"}

                qtnvip = qtnvip + 1;
                document.getElementById('textVIP').textContent = `${qtnvip}  Ingresso VIP`    
            }





            document.getElementById('subTotal').innerText = `R$ ${subtotal.toFixed(2)}`;
            document.getElementById('total').innerText = `R$ ${total.toFixed(2)}`;
        }
    
        // Função para cancelar a compra (reseta tudo)
        function cancelar() {
        subtotal = 0;

            totalCarrinho = 0
            quantidadeCarrinho= 0

            document.getElementById('sumario').textContent = ""

        document.getElementById('total').textContent = "R$0,00"
        document.getElementById('subTotal').textContent = "R$0,00"
        document.getElementById('quantidadeCarrinho').textContent = "0"
        // Atualiza o valor total no carrinho
        document.getElementById('totalCarrinho').textContent ="R$ 0,00"
        }
    
        // Função chamada ao clicar em "Finalizar Compra"
        if (!document.getElementById('sumario').textContent) document.getElementById('finalizarCompra').addEventListener('click', function() {
            // Encontrar o botão "Confirmar"

           
            const botaoConfirmar = document.querySelector('button[onclick="escolhametodo()"]');
            
            // Rolar a tela suavemente até o botão de "Confirmar"
            botaoConfirmar.scrollIntoView({
                behavior: 'smooth', // Rolagem suave
                block: 'center' // Centraliza o botão na tela
            });
    
            // Adiciona a animação de pulsar
            botaoConfirmar.classList.add('pulse');
            
            // Remover a animação após 2 segundos (a pulsação para de acontecer após esse tempo)
            setTimeout(function() {
                botaoConfirmar.classList.remove('pulse');
            }, 2000);
            
        });
    
    
