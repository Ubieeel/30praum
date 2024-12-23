var show = [];

document.addEventListener('DOMContentLoaded', function () {
   
    async function carregarShows() {

        try {
            const response = await fetch('http://127.0.0.1:5000/api/show',{
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

            exibirShows();

        } catch (error) {
            console.error('Erro: ', error)
        }
    }

    function exibirShows() {
        const listaShows = document.getElementById("lista-Shows")
        listaShows.innerHTML = "";

        show.forEach((show, index) => {
            const card = criarCard(show, index);
            listaShows.appendChild(card)
        });
    }

    carregarShows();
})



function criarCard(show, index) {
    const card = document.createElement("a");
    card.classList = "cardshow max-w-[150px] lg:max-w-[226px] hover:scale-110 transition-all";
    card.id = show.registro;
    card.setAttribute("onclick", "showclicked(id)");
    card.setAttribute("data-name", JSON.stringify(show))
    card.setAttribute("href", "checkout.html")

    const content = document.createElement("div");
    content.classList = "flex flex-col font-bold text-white";

    const imagem = document.createElement("img");
    imagem.src = show.capa;
    imagem.alt = show.nome;
    imagem.classList = "pb-3 rounded-3xl"

    const date = document.createElement("p")
    date.textContent = `${show.data}`;
    date.classList = "pb-3 text-center"

    const nome = document.createElement("p")
    nome.textContent = `${show.nome}`;
    nome.classList = "text-center font-thin";

    card.appendChild(content);
    content.appendChild(imagem);
    content.appendChild(date);
    content.appendChild(nome);


    return card;
}



const cardshowclick = document.getElementsByClassName('cardshow');


document.addEventListener('click', function() {



    let idClicado;

    // Função que será chamada ao clicar em qualquer botão
    function capturarId(event) {
      idClicado = this.id; // Captura o ID do elemento clicado
      console.log("ID do botão clicado:", idClicado);
    }

    // Adiciona o evento de clique para os botões
    document.querySelectorAll('.cardshow').forEach(button => {
      button.addEventListener('click', capturarId);
    });

    })

    function aplicarfiltros() {
        const Artistadavez = document.getElementById("artistas").value;
        const Datashow = document.getElementById("datashow").value;

        if (Artistadavez) {
            // Seleciona todos os elementos da lista de shows
            const shows = document.querySelectorAll('.cardshow');
    
    
            // Filtra os produtos de acordo com o valor de pesquisa
            shows.forEach(show => {
                const showName = show.getAttribute('data-name');
    
                console.log(showName);
                // Verifica se o nome do show contém o texto de pesquisa
                if (showName.includes(Artistadavez)) {
                    show.classList.remove("hidden"); // Exibe o produto
                } else {
                    show.classList.add("hidden"); // Esconde o produto
                }

            });

    }

           
            if (Datashow) {
                // Seleciona todos os elementos da lista de shows
                const shows = document.querySelectorAll('.cardshow');

                // Filtra os produtos de acordo com o valor de pesquisa
                shows.forEach(show => {
                    const showName = show.getAttribute('data-name');

                   
                    // Verifica se o nome do show contém o texto de pesquisa
                    if (showName.includes(Datashow)) {
                        show.classList.remove("hidden"); // Exibe o produto
                    } else {
                        show.classList.add("hidden"); // Esconde o produto
                    }

                });

        }

}


    function redefinirfiltros(){
        const shows = document.querySelectorAll('.cardshow');
    
            // Filtra os produtos de acordo com o valor de pesquisa
            shows.forEach(show => {
                show.classList.remove("hidden");
            })
    }

    function showclicked(id){
        sessionStorage.setItem("showclicked", id);
    }