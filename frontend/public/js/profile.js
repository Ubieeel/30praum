
var iduser = sessionStorage.getItem('iduser', iduser);
const url1 = `http://localhost:5000/api/users/profile/${iduser}`;
const url2 = `http://localhost:5000/api/users/${iduser}`;


async function carregardados() {
   
  var iduser = sessionStorage.getItem('iduser', iduser);
  var id = iduser 

  console.log(id)

  var campname = document.getElementById('campname');
  var campemail = document.getElementById('campemail');
  var camppassword = document.getElementById('camppassword');
  var camptelefone = document.getElementById('camptelefone');
  var campnascimento = document.getElementById('campnascimento');
  var campgenero = document.getElementById('campgenero');
  var campcidade = document.getElementById('campcidade');
  var campendereco = document.getElementById('campendereco');
  var campuf = document.getElementById('campuf');
  

  try {
    const responsedados = await fetch(url2, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responsedadosjson = await responsedados.json()
    console.log(responsedadosjson)

    if (responsedados.ok) {
      sexo = responsedadosjson.sexo;
      var sexo;
    
      if (responsedadosjson.sexo === 'F')  sexo = "Feminino";
      if (responsedadosjson.sexo === 'M')  sexo = "Masculino";
      if (!responsedadosjson.sexo) sexo = "Não informado."

      campname.textContent = responsedadosjson.name;
      campemail.textContent = responsedadosjson.email;
      camptelefone.textContent = responsedadosjson.telefone;
      campnascimento.textContent = responsedadosjson.nascimento;
      campcidade.textContent =responsedadosjson.cidade;
      campgenero.textContent = sexo;
      campendereco.textContent = responsedadosjson.endereco;
      campuf.textContent = responsedadosjson.uf;
    }
    

      // VER COMPRAS DO USER

  async function carregarShowscompras() {

    try {
        const response = await fetch(`http://127.0.0.1:5000/api/compra/profile/${responsedadosjson.cpf
        }`,{
            method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
        });
        if (!response.ok) {
            throw new Error('Erro ao carregar as compras')
        }
        const data = await response.json();
        console.log(data);

        data.forEach(show => {

          async function carregarclicado() {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/show/${show.registroid}`,{
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
                
                const sumariocompras = document.getElementById('ingressos')

                const cardcompra = document.createElement('div');
                cardcompra.classList = "mb-3 mt-2 flex flex-row justify-between "
                
                const infodiv = document.createElement('div')
                infodiv.classList = "flex flex-col"

                const tituloshow = document.createElement('h2');
                tituloshow.textContent = show.nome
                tituloshow.classList = "text-2xl font-bold text-white underline"

                const datashow = document.createElement('p')
                datashow.textContent = `Data do evento: ${show.data}`
                datashow.classList = " mt-5 text-white text-1xl"

                const enderecoshow = document.createElement('p')
                enderecoshow.textContent = `Endereço: ${show.endereco}`
                enderecoshow.classList = " mt-2 text-white text-1xl"

                const horarioshow = document.createElement('p')
                horarioshow.textContent = `Horário de início : ${show.horario}`
                horarioshow.classList = " mt-2 text-white text-1xl"

                const separador = document.createElement('hr')

                const ingressoqrcode = document.createElement('img')
                ingressoqrcode.setAttribute("src", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgjB-Q95sgAKkagx-I8rWP1eMOZAgPI-24WQ&s")
                ingressoqrcode.setAttribute("width", "90px")
                ingressoqrcode.classList = "mb-10 my-auto"

                sumariocompras.appendChild(cardcompra)

                cardcompra.appendChild(infodiv)
                infodiv.appendChild(tituloshow)
                infodiv.appendChild(datashow)
                infodiv.appendChild(enderecoshow)
                infodiv.appendChild(horarioshow)
                cardcompra.appendChild(ingressoqrcode)
                sumariocompras.appendChild(separador)
        
            } catch (error) {
                console.error('Erro: ', error)
            }
            
        }

        carregarclicado()
        });
     

    




    } catch (error) {
        console.error('Erro: ', error)
    }
}
carregarShowscompras();


    
  } catch (error) {
    console.log(error)
  }
 
  
}

document.addEventListener('DOMContentLoaded', carregardados);





function abrirmodal(){


   // Preenchimento automático

  async function inserirdados() { 
    
    try {

    const accessToken = sessionStorage.getItem('token');
    const responsedados = await fetch(url1, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    
    const bodydata = await responsedados.json()
  


    document.getElementById('Nome_').value = bodydata.name;
    document.getElementById('Email_').value = bodydata.email;
    // document.getElementById('Password_').value = bodydata.password;
    document.getElementById("Telefone_").value =  bodydata.telefone;
    document.getElementById('data_').value = bodydata.nascimento;
    document.getElementById('sexo_').value = bodydata.sexo ;
    document.getElementById('CPF_').value = bodydata.cpf ;
    document.getElementById('endereco_').value = bodydata.endereco ;
    document.getElementById('Estado_').value = bodydata.uf;
    document.getElementById('Cidade_').value = bodydata.cidade;
       
     

    

} catch (error) {
  console.log(error)
 }
 
    
 }
   
 
  const modalhtml =  document.getElementById('MODAL')
  modalhtml.classList.remove('hidden')
  inserirdados()

}

function fecharmodal(){
    const modalhtml =  document.getElementById('MODAL')
 
 
    modalhtml.classList.add('hidden')
 }
 
 document.getElementById('Telefone_').addEventListener('input', function(event) {

  
    let input = event.target;
    let value = input.value.replace(/[^0-9]/g, '');  // Remove qualquer caractere não numérico
    if (value.length <= 2) {
        input.value = '(' + value;  // Adiciona o parêntese e os dois primeiros números
    } else if (value.length <= 6) {
        input.value = '(' + value.slice(0, 2) + ') ' + value.slice(2);  // Adiciona o espaço depois do parêntese
    } else if (value.length <= 10) {
        input.value = '(' + value.slice(0, 2) + ') ' + value.slice(2, 7) + '-' + value.slice(7);  // Adiciona o hífen
    } else {
        input.value = '(' + value.slice(0, 2) + ') ' + value.slice(2, 7) + '-' + value.slice(7, 11);  // Limita ao formato de 11 números
    }
  
  });

 document.getElementById('CPF_').addEventListener('input', function(event) {
    let cpf = event.target.value;
  
    // Remove tudo o que não for número
    cpf = cpf.replace(/\D/g, '');
  
    // Adiciona a máscara
    if (cpf.length <= 3) {
        cpf = cpf.replace(/(\d{3})/g, '$1');
    } else if (cpf.length <= 6) {
        cpf = cpf.replace(/(\d{3})(\d{0,3})/, '$1.$2');
    } else if (cpf.length <= 9) {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{0,3})/, '$1.$2.$3');
    } else {
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
    }
  
    event.target.value = cpf;
  });

async function sabercomota() {
    
    var usuarioLogado = localStorage.getItem('usuarioLogado');
    console.log(usuarioLogado)

    const iduser = localStorage.getItem('iduser');

    var accessToken =  sessionStorage.getItem('token');
  

}

document.addEventListener('DOMContentLoaded', sabercomota);


const buttonedit = document.getElementById('buttonedit');



async function submitedit() {


    
try {

   const bodydata = {}
    if (document.getElementById('Nome_').value) bodydata.name = document.getElementById('Nome_').value;
    if (document.getElementById('Email_').value)bodydata.email = document.getElementById('Email_').value;
    if (document.getElementById('Password_').value) bodydata.password = document.getElementById('Password_').value;
    if (document.getElementById("Telefone_").value) {
        const telefoneformat = document.getElementById("Telefone_").value;

        bodydata.telefone = telefoneformat.replace(/[^0-9]/g, '');

    }

  
    if(document.getElementById('data_').value) bodydata.nascimento = document.getElementById('data_').value;
    if(document.getElementById('sexo_').value) bodydata.sexo = document.getElementById('sexo_').value;
    if(document.getElementById('Cidade_').value) {bodydata.cidade =  document.getElementById('Cidade_').value;}
    if(document.getElementById('CPF_').value) {

      const cpfformat = document.getElementById('CPF_').value;

      bodydata.cpf = cpfformat.replace(/\D/g, '');              
    
    
    }


    if(document.getElementById('endereco_').value) bodydata.endereco = document.getElementById('endereco_').value;
    if(document.getElementById('Estado_').value) bodydata.uf = document.getElementById('Estado_').value;
      
   
 

    const accessToken = sessionStorage.getItem('token');
    
    const iduser = localStorage.getItem('iduser');

    const id = iduser;  // O ID que você quer buscar
  

    let resultform = true;
    
     if(bodydata.password) if(bodydata.password.length < 8){
    resultform = "A senha deve conter no mínimo 8 dígitos"
  }

    if (resultform != true) {window.alert(resultform)}


    if (resultform === true){
    const response2 = await fetch(url2, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(bodydata),
    });

    const data2 = await response2.json();
    
    if (response2.ok) {
      window.alert('Sessão expirada após atualização de dados.');
      setTimeout(() => {
          window.location.href = "../login.html";
      }, 1000); 
  }
  }
    }
  catch (error) {

    window.alert("Não foi possível realizar a atualização nos dados, revise.")

    console.error(error);
  };

};


function sairconta(){
sessionStorage.setItem('iduser', null);
sessionStorage.setItem('token', null);
sessionStorage.setItem('usuarioLogado', null);



  usuarioLogado = false;
 

   


  window.location.href = "../index.html"
}