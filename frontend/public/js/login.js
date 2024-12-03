var usuarioLogado = sessionStorage.getItem('usuarioLogado');
 usuarioLogado = false

console.log(usuarioLogado)


document.getElementById('login').addEventListener('click', async (event) => {
	event.preventDefault();
	
    const email = document.getElementById("email_").value
    const password = document.getElementById("password_").value


    try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password
          }),
        });


        if (response.ok) {
           


           sessionStorage.setItem('usuarioLogado', true);


           
          const data = await response.json();

          const token = data.accessToken;

          const iduser = data.id;

          const adminfield = data.is_admin;


          console.log(iduser)
         
          
          sessionStorage.setItem('adminfield', adminfield);

          sessionStorage.setItem('token', token);
          sessionStorage.setItem('iduser', iduser);


          window.location.href = "../index.html"
        } else {
            window.alert("Dados inseridos estão incorretos."); 
        }
      }
      catch (error) {
        console.error(error);
      }
      
  

});
