


function opensidebar() {

    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('hidden');
}

function closesidebar() {

    const sidebar = document.getElementById('sidebar');
    sidebar.classList.add('hidden');
}

var usuarioLogado = sessionStorage.getItem('usuarioLogado')



function personbutton(){
    if(usuarioLogado === 'true'){
        window.location.href = "../profile.html"
    } else {
        window.location.href = "../cadastro.html"
    }
} 

document.addEventListener('DOMContentLoaded', adminbutton);
// Botao de admin


async function adminbutton() {


    var tokenuser = sessionStorage.getItem('token');
    
    // console.log(tokenuser)


    const decodeToken = (token) => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payload = JSON.parse(atob(base64));
            return payload;
        } catch (error) {
            throw Error('Token inválido.');
        }
}

var userinfo = decodeToken(tokenuser)

    if (userinfo.is_admin === "true") {
        
    const listaShows = document.getElementById('header');

    const button = document.createElement("li");
    button.classList = "text-nav";

    const btnlink = document.createElement("a")
    btnlink.href = "admin.html";
    btnlink.textContent = "ADMINISTRAÇÃO";

    
    listaShows.appendChild(button)
    button.appendChild(btnlink);
    



    }


    
    if (userinfo.is_admin === "true") {
        
        const listaShows2 = document.getElementById('headermobile');
    
      
        const btnlink2 = document.createElement("a")
        btnlink2.href = "admin.html";
        btnlink2.textContent = "ADMINISTRAÇÃO";
    
        
        listaShows2.appendChild(btnlink2)
        
        const btnmobile1 = document.getElementById('bntmobile1');
        const btnmobile2 = document.getElementById('bntmobile2');
    
        btnmobile1.classList = "hidden"
        btnmobile2.innerHTML = "Ver meu Perfil"
        btnmobile2.setAttribute("onclick", "openprofile()")

      
        }

}


function openprofile(){
    window.location = "profile.html"
}
