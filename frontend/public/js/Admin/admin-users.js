

var users = [];

document.addEventListener('DOMContentLoaded', function () {
   
    


    async function carregarusers() {

        try {
            const response = await fetch('http://127.0.0.1:5000/api/users',{
                method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
            });
            if (!response.ok) {
                throw new Error('Erro ao carregar os filmes')
            }
            const data = await response.json();
            users = data;
            console.log(users);

            exibirusers();

        } catch (error) {
            console.error('Erro: ', error)
        }
    }

    function exibirusers() {
        const tabela = document.getElementById("Linhastabela")
        tabela.innerHTML = "";

        users.forEach((user, index) => {
            const linhauser = criarlinha(user, index);
            tabela.appendChild(linhauser)
        });
    }

    carregarusers();


})





function criarlinha(user, index) {


    const linhauser = document.createElement("tr");
     
    const idcol = document.createElement("td");
    idcol.classList = "px-4 my-auto py-2 text-center";
    idcol.textContent = user.id;

    const nomecol = document.createElement("td");
    nomecol.classList = "px-4 my-auto py-2 text-center";
    nomecol.textContent = user.name;


    const emailcol = document.createElement("td");
    emailcol.classList = "px-4 my-auto py-2 text-center";
    emailcol.textContent = user.email;

    const cidadecol = document.createElement("td");
    cidadecol.classList = "px-4 my-auto py-2 text-center";
    cidadecol.textContent = user.cidade;

    const cpfcol = document.createElement("td");
    cpfcol.classList = "px-4 my-auto py-2 text-center";
    cpfcol.textContent = user.cpf;

    const enderecocol = document.createElement("td");
    enderecocol.classList = "px-4 my-auto py-2 text-center";
    enderecocol.textContent = user.endereco;

    const nascimentocol = document.createElement("td");
    nascimentocol.classList = "px-4 my-auto py-2 text-center";
    nascimentocol.textContent = user.nascimento;


    const sexocol = document.createElement("td");
    sexocol.classList = "px-4 my-auto py-2 text-center";
    sexocol.textContent = user.sexo;

    const telefonecol = document.createElement("td");
    telefonecol.classList = "px-4 my-auto py-2 text-center";
    telefonecol.textContent = user.telefone;

    
    const ufcol = document.createElement("td");
    ufcol.classList = "px-4 my-auto py-2 text-center";
    ufcol.textContent = user.uf;
    
    const admincol = document.createElement("td");
    admincol.classList = "px-4 my-auto py-2 text-center";
    admincol.textContent = user.is_admin;

   



    const btncol = document.createElement("td");
    btncol.classList = "px-4 my-auto py-2 text-center";

    const btnedit = document.createElement("button")
    btnedit.classList = "btnedit px-2 py-1 rounded-xl bg-blue-400"
    btnedit.textContent = "EDIT"
    btnedit.id = user.id;
    btnedit.setAttribute("onclick", "abrirmodal(id)")

    linhauser.appendChild(idcol);
    linhauser.appendChild(nomecol);
    linhauser.appendChild(emailcol);
    linhauser.appendChild(cidadecol);
    linhauser.appendChild(cpfcol);
    linhauser.appendChild(enderecocol);
    linhauser.appendChild(nascimentocol);
    linhauser.appendChild(sexocol);
    linhauser.appendChild(telefonecol);
    linhauser.appendChild(ufcol);
    linhauser.appendChild(admincol);
    linhauser.appendChild(btncol);
    btncol.appendChild(btnedit);
  
    if (admincol.textContent === "true") {
        admincol.textContent = ""

        const imgadmin = document.createElement("img")
        imgadmin.src = "../../img/img-admin/verifica.png"
        imgadmin.classList = "w-8 mx-auto my-auto"

        admincol.append(imgadmin)
    }



    return linhauser;
}

var idpromodal

function abrirmodal(idclicked){


    idpromodal = idclicked

    // Preenchimento automático
 

   async function inserirdados() { 
     
     try {
 
     const accessToken = sessionStorage.getItem('token');
     console.log(accessToken)
     const responsedados = await fetch(`http://localhost:5000/api/users/profile/${idpromodal}`, {
       method: "GET",
       headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${accessToken}`,
       },
     });
 
     
     const bodydata = await responsedados.json()
   
 
 
     document.getElementById('Nome_').value = bodydata.name;
     document.getElementById('Email_').value = bodydata.email;
     document.getElementById("Telefone_").value =  bodydata.telefone;
     document.getElementById('data_').value = bodydata.nascimento;
     document.getElementById('sexo_').value = bodydata.sexo ;
     document.getElementById('CPF_').value = bodydata.cpf ;
     document.getElementById('endereco_').value = bodydata.endereco ;
     document.getElementById('Estado_').value = bodydata.uf;
     document.getElementById('Cidade_').value = bodydata.cidade;
     document.getElementById('ID_').value = bodydata.id;
    
        
      
 
     
 
 } catch (error) {
   console.log(error)
  }
  
     
  }
    
  
   const modalhtml =  document.getElementById('MODAL')
   modalhtml.classList.remove('hidden')
   inserirdados()
 
 

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


          



       bodydata.is_admin = document.getElementById('ADMIN_').value;
          

          
       
     
    
        const accessToken = sessionStorage.getItem('token');
        
    
        let resultform = true;
        
         if(bodydata.password) if(bodydata.password.length < 8){
        resultform = "A senha deve conter no mínimo 8 dígitos"
      }
    
        if (resultform != true) {window.alert(resultform)}
    
    
        if (resultform === true){
        const response2 = await fetch(`http://localhost:5000/api/users/admin/${idpromodal}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify(bodydata),
        });
    
        const data2 = await response2.json();
        
        if (response2.ok) {
          window.alert('Usuário atualizado com sucesso!');
          location.reload()
      }
      }
        }
      catch (error) {
    
        window.alert("Não foi possível realizar a atualização nos dados, revise.")
    
        console.error(error);
      };
    
    };


 function fecharmodal(){
    const modalhtml =  document.getElementById('MODAL')
 
 
    modalhtml.classList.add('hidden')
 }


