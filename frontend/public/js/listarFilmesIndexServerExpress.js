var filmes = [];

document.addEventListener('DOMContentLoaded', function () {
    const filmesContainer = document.querySelector('container');

    async function carregarFilmes() {

        try {
            const response = await fetch('http://localhost:4000/api/data');
            if (!response.ok) {
                throw new Error('Erro ao carregar os filmes')
            }
            const data = await response.json();
            filmes = data.filmes;
            console.log(filmes);

            exibirFilmes();

        } catch (error) {
            console.error('Erro: ', error)
        }
    }

    function exibirFilmes() {
        const listaFilmes = document.getElementById("lista-filmes")
        listaFilmes.innerHTML = "";

        filmes.forEach((filme, index) => {
            const card = criarCard(filme, index);
            listaFilmes.appendChild(card)
        });
    }
    carregarFilmes();
})

function criarCard(filme, index) {
    const card = document.createElement("div");
    card.classList.add("card");

    const imagem = document.createElement("img");
    imagem.src = show.capa;
    imagem.alt = show.titulo;

    const conteudo = document.createElement("div");
    conteudo.classList.add("card-content");

    const titulo = document.createElement("h2");
    titulo.textContent = filme.titulo;
    const ano = document.createElement("p")
    ano.textContent = `Ano: ${filme.ano}`;
    const duracao = document.createElement("p")
    duracao.textContent = `Duração: ${filme.duracao}`
    const categoria = document.createElement("p")
    categoria.textContent = `Categoria: ${filme.categoria}`
    const classificacao = document.createElement("p")
    classificacao.textContent = `Classificação: ${filme.classificacao}`
    const diretor = document.createElement("p");
    diretor.textContent = `Diretor: ${filme.diretor}`;

    card.appendChild(imagem);
    card.appendChild(conteudo);
    conteudo.appendChild(titulo);
    conteudo.appendChild(ano);
    conteudo.appendChild(duracao);
    conteudo.appendChild(categoria);
    conteudo.appendChild(classificacao);
    conteudo.appendChild(diretor);

    return card;
}
