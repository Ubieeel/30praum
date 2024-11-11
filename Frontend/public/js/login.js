const usuarioLogado = localStorage.getItem('usuarioLogado');

console.log(usuarioLogado)


document.getElementById('login').addEventListener('click', async (event) => {
	event.preventDefault();
	
    const email = document.getElementById("email_").value
    const password = document.getElementById("password_").value


    try {
        const response2 = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password
          }),
        });
    
    
        if (response2.ok) {
           window.location.href = "../index.html"
           localStorage.setItem('usuarioLogado', 'true');

        } else {
            window.alert("Dados inseridos estão incorretos."); 
        }
      }
      catch (error) {
        console.error(error);
      }
    
  

});
