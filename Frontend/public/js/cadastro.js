//  TELEFONE MASK

  // Obtendo data atual para verficação de aniversário

let atualdate = new Date()

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
// POST

document.getElementById("register-form").addEventListener("click", async (event) => {
  event.preventDefault();

  let error;


    //   coluna 
    const name = document.getElementById("Nome_").value;
    const email = document.getElementById("Email_").value;
    const emailconfirm = document.getElementById("Email_confirm_").value;


    const password = document.getElementById("Password_").value;
    const passwordconfirm = document.getElementById("Password_Confirm").value;
    const cidade = document.getElementById("Cidade_").value;
    const sexo = document.getElementById("sexo_").value;
    
    //   coluna 2
    const telefoneformat = document.getElementById("Telefone_").value;

    let telefone= telefoneformat.replace(/[^0-9]/g, '');

    const nascimento = document.getElementById("data_").value;
    const cpfformat = document.getElementById("CPF_").value;

    cpf = cpfformat.replace(/\D/g, '');

    const enderecoformat = document.getElementById("endereco_").value;

    const endereco = enderecoformat.replace(/[^a-zA-Z0-9\s]/g, '');

    const uf = document.getElementById("Estado_").value;
    
    var resultform = "true"

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!regexEmail.test(email)) {
    resultform = "Email inválido"
  }
  
  if  (!email, !password, !cidade, !cpfformat){
    resultform = "Preencha todos os campos obrigatórios do formulário."
  }

  if  (!uf){
    resultform = "Preencha o campo de Estado"
  }

  if (password.length <= 8){
    resultform = "A senha deve conter no mínimo 8 dígitos"
  }



  // Teste algoritmo CPF

  var strCPF = cpf;
  function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}

 

  let flagcpf = TestaCPF(cpf);
  

   if(flagcpf === false ) {
    resultform = "CPF inválido."
   } else 
    {
      resultform = "true"
    }
    
    if (passwordconfirm != password){
      resultform = "A confirmação não coincide com a senha."
    }


    if (emailconfirm != email){
      resultform = "O e-mail não coincide com a confirmação."
    }


    // VAlidação nascimento
    
    let atualdate = new Date()      

    const nascimentounformat = new Date(nascimento);
    
    if (nascimentounformat >= atualdate){
      resultform = "Data informada inválida."
    }

    if (resultform !== "true") {
      window.alert(resultform)
    }


    // Envio post

  if (resultform === "true") {
    

    try {
      const response2 = await fetch("http://localhost:5000/api/users/check-cpf", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cpf
        }),
      });
  
      const data2 = await response2.json();
  
      if (response2.status === 409) {
        resultform = "CPF já cadastrado."
      } else {
        
      }
    }
    catch (error) {
      console.error(error);
    }
  

    try {
      const response2 = await fetch("http://localhost:5000/api/users/check-email", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email
        }),
      });
  
      const data2 = await response2.json();
  
      if (response2.status === 409) {
        resultform = "Email já cadastrado."
      } else {
        
      }
    }
    catch (error) {
      console.error(error);
    }
  
  
  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name, email, password, telefone, nascimento, sexo, cidade, cpf, endereco, uf
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Mostrar mensagem de sucesso
      resultform = 'Cadastro realizado com sucesso.'
    }
  }
  catch (error) {
    console.error(error);
  }

  if (resultform !== "true") {
    window.alert(resultform)
  }

}

});
