// async function sabercomota() {
    
//     var adminfield = sessionStorage.getItem('adminfield');
//     console.log(adminfield)

//     var usuarioLogado = sessionStorage.getItem('usuarioLogado');
//     console.log(usuarioLogado)

// }

// document.addEventListener('DOMContentLoaded', sabercomota);

// carregar Recentes
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
            // console.log(show);

            exibirShows();

        } catch (error) {
            console.error('Erro: ', error)
        }
    }

    function exibirShows() {
        const listaShows = document.getElementById('lancamento');
        listaShows.innerHTML = "";

        show.slice(1,4).forEach((show, index) => {
            const card = criarCard(show, index);
            listaShows.appendChild(card);
        });
    }

    carregarShows();
})




function criarCard(show, index) {
    const card = document.createElement("div");
    card.classList = "cardshow text-center scale-75 md:scale-100  md:block xl:block cursor-pointer hover:scale-[1.1] transition-all";
    card.id = show.registro

    const imagem = document.createElement("img");
    imagem.src = show.capa;
    imagem.alt = show.nome;
    imagem.classList = "max-h-[200px] max-w-[180px] rounded-3xl mt-[-20px] shadow-2xl";


    const date = document.createElement("p")
    date.textContent = `${show.data}`;
    date.classList = "text-center text-white text-xl  mt-2"

    const nome = document.createElement("p")
    nome.textContent = `${show.nome}`;
    nome.classList = "text-center text-white text-xl  mt-2";

    
    card.appendChild(imagem);
    card.appendChild(date);
    card.appendChild(nome);


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



