// Listar filmes 

var campcapa = document.getElementById("Cape.")
var campdata = document.getElementById("data.")
var camphora = document.getElementById("horario.")
var campvalor = document.getElementById("valor.")
var campendereco = document.getElementById("enderecoevento.")
var campartista = document.getElementById("artista.")
var campnomevento = document.getElementById("nomevento.")

let idClicado;

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
        const listaShows = document.getElementById("main-filmes")
        listaShows.innerHTML = "";

        show.forEach((show, index) => {
            const card = criarCard(show, index);
            listaShows.appendChild(card)
        });
    }

    carregarShows();
})



function criarCard(show, index) {

    const screenedit = document.createElement("div")
    screenedit.classList = "cardshow bg-black hover:opacity-100 opacity-0 hover:cursor-pointer hover:bg-opacity-50 transition bg-opacity-0 absolute w-[130px] h-[200px] max-h-[200px] rounded-3xl max-w-[100px] lg:max-w-[126px]"
    screenedit.innerText = ""
    screenedit.onclick = function(){ 
        
        modal.classList.toggle("hidden")

  
    
        // Função que será chamada ao clicar em qualquer botão
        function capturarId(event) {
          idClicado = this.id; // Captura o ID do elemento clicado
          
        //   Carrega dados para o formulário

        const url = `http://localhost:5000/api/show/${idClicado}`;


         async function CarregardadosShow() {

            

            const responsedados = await fetch(url, {
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                },
              });
          
              const dadosshow = await responsedados.json()
              
           

            campcapa.value = dadosshow.capa;
            campdata.value = dadosshow.data;
            camphora.value = dadosshow.horario;
            campvalor.value = dadosshow.preco;
            campendereco.value = dadosshow.endereco;
            campartista.value = dadosshow.artista;
            campnomevento.value = dadosshow.nome;


         }

         CarregardadosShow()


        }
    
        // Adiciona o evento de clique para os botões
        document.querySelectorAll('.cardshow').forEach(button => {
          button.addEventListener('click', capturarId);
        });
    


    };
    screenedit.id = show.registro;

    const textEdit = document.createElement("p")
    textEdit.classList = "absolute text-2xl lg:ml-5 mt-20 ml-2"
    textEdit.innerText = "EDITAR"

    const card = document.createElement("div");
    card.classList = "cardshow max-w-[100px] lg:max-w-[126px] hover:scale-110 transition-all";
    card.id = show.registro;

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
    content.appendChild(screenedit);
    screenedit.appendChild(textEdit);
    content.appendChild(imagem);
    content.appendChild(date);
    content.appendChild(nome);


    return card;
}


// Fechar modal botao X



function fecharmodal() {

    const modal = document.getElementById("modalmodify");
    modal.classList.toggle("hidden")
}

const cardshowclick = document.getElementsByClassName('cardshow');

const modal = document.getElementById("modalmodify");

console.log(cardshowclick)

function formatarMoeda(input) {
  let valor = input.value;

  // Remove qualquer caractere não numérico (exceto vírgula e ponto)
  valor = valor.replace(/\D/g, "");

  // Adiciona a vírgula para os centavos
  valor = valor.replace(/(\d)(\d{2})$/, "$1,$2");

  // Adiciona o ponto para separar os milhares
  valor = valor.replace(/(\d)(\d{3})(\d{3})$/, "$1.$2.$3");
  valor = valor.replace(/(\d)(\d{3})(\d{3})(\d{3})$/, "$1.$2.$3.$4");

  input.value = valor;
}


 async function editshow() {
  
  
    try {

      const accessToken = sessionStorage.getItem('token');
      const bodydata = {}

      bodydata.capa = campcapa.value; 
      bodydata.data = campdata.value;
      bodydata.horario = camphora.value;
      bodydata.preco = campvalor.value;
      bodydata.endereco = camphora.campendereco;
      bodydata.artista =  campartista.value;
      bodydata.nome = campnomevento.value;
  

        const response = await fetch(`http://localhost:5000/api/show/${idClicado}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(bodydata),
        });


        if (response.ok) {
           
          window.alert("Show Atualizado com SUCESSO!");

         window.location.href = "../admin-shows.html"

        } else {
            window.alert("Confira os dados inseridos."); 
        }
      }
      catch (error) {
        console.error(error);
      }
      
  

};


function abrirmodaladc() {
  
 
  modal.classList.toggle("hidden")

  campcapa.value = "";
  campdata.value = "";
  camphora.value = "";
  campvalor.value = "";
  campendereco.value = "";
  campartista.value = "";
  campnomevento.value = "";

  const btnsubmit = document.getElementById("enviar");
btnsubmit.setAttribute("onclick", "criarshow()");

  const titulomodal = document.getElementById("Titlemodal");
  titulomodal.innerText = "Criar Novo Show"
}

// Sumir BTN DELETE

const bntdelete = document.getElementById("delete");
bntdelete.classList.toggle("hidden");


// BTN ADICIONAR SHOW



async function criarshow(){



  const bodydata = {}

  
  bodydata.capa = campcapa.value; 
  bodydata.data = campdata.value;
  bodydata.horario = camphora.value;
  
  let formatedpreco = campvalor.value.replace(",", ".");



  bodydata.preco = formatedpreco;

  bodydata.endereco = campendereco.value;
  bodydata.artista =  campartista.value;
  bodydata.nome = campnomevento.value;



  try {
    const response = await fetch(`http://localhost:5000/api/show`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodydata),
    });

    if (response.ok) {
           
    window.alert("Show adicionado com SUCESSO!");

    window.location.href = "../admin-shows.html"

    } else {
        window.alert("Confira os dados inseridos."); 
    }

  } catch (error) {
    
  }

}


// Delete Show 

async function deleteshow() {
  
  let resposta = confirm("Você tem certeza que deseja continuar?");

  if (resposta) {
    try {

      const response = await fetch(`http://localhost:5000/api/show/${idClicado}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        }
      });
    
      if (response.ok) {
             
      window.alert("Show deletado com SUCESSO!");
    
      window.location.href = "../admin-shows.html"
      } else {
  
      }
    
    } catch (error) {
      console.log(error)
    }
  
  }



}