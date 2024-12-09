var iduser = sessionStorage.getItem('iduser', iduser);
var id = iduser
const url1 = `http://localhost:5000/api/users/profile/${id}`;
const url2 = `http://localhost:5000/api/users/${id}`;


async function carregardadosadmin() {
   
  var iduser = sessionStorage.getItem('iduser', iduser);
  var id = iduser 

  console.log(id)

  try {
    const responsedados = await fetch(url2, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responsedadosjson = await responsedados.json()

    

    // Decisão da mensagem do dia

    const horaAtual = new Date().getHours(); 

    let mensagem;
  
    // Define a mensagem com base na hora
    if (horaAtual >= 5 && horaAtual < 12) {
      mensagem = "Bom dia";
    } else if (horaAtual >= 12 && horaAtual < 18) {
      mensagem = "Boa tarde";
    } else {
      mensagem = "Boa noite";
    }

    // Apenas Primeiro nome

    function obterPrimeiroNome(nomeCompleto) {
        const nomeArray = nomeCompleto.split(" ");
        
        return nomeArray[0];

      }


    // Name Side Bar 

    const fieldsidebar = document.getElementById("nameADM");
    fieldsidebar.innerText = `${responsedadosjson.name}`
    fieldsidebar.classList = "text-left my-auto mx-auto text-1xl mb-2 font-poppins";

    // Envio da mensagem
    const Firstname = obterPrimeiroNome(responsedadosjson.name)

    const fieldmesage = document.getElementById("saudacaoheader");
    fieldmesage.innerText = `${mensagem} ${Firstname}!`
    
    console.log(responsedadosjson.name)
  } catch (error) {
    console.log(error)
  }
 
  }

  document.addEventListener('DOMContentLoaded', carregardadosadmin);


//  BTN LOGOUT ADMIN

function sairconta(){
  sessionStorage.setItem('iduser', null);
  sessionStorage.setItem('token', null);
  sessionStorage.setItem('usuarioLogado', null);
  
  
  
    usuarioLogado = false;
   
  
     
  
  
    window.location.href = "../index.html"
  }