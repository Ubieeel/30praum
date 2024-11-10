


document.getElementById("register-form").addEventListener("click", async (event) => {
  event.preventDefault();

    //   coluna 
const nome = document.getElementById("Nome_").value;
const email = document.getElementById("Email_").value;
const username = document.getElementById("Username_").value;
const senha = document.getElementById("Password_").value;
const senhaconfirm = document.getElementById("Password_Confirm").value;
const cidade = document.getElementById("Cidade_").value;


//   coluna 2
const telefone = document.getElementById("Telefone_").value;
const date = document.getElementById("data_").value;
const cpf = document.getElementById("CPF_").value;
const idade = document.getElementById("idade_").value;
const endereco = document.getElementById("endereco_").value;
const UF = document.getElementById("Estado_").value;

  try {
    const response = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      body: JSON.stringify({
        nome, email, username, senha, senhaconfirm, telefone, date, cidade, cpf, idade, endereco, UF
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Mostrar mensagem de sucesso
      window.alert('Cadastro realizado com sucesso.')
    }
  }
  catch (error) {
    window.alert("Erro ao efetuar o cadastro.")
    console.error(error);
  }
});
