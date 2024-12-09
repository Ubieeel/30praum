var iduser = sessionStorage.getItem('iduser', iduser);
var id = iduser 

var janeirocompra = 0;           
var fevereirocompra  = 0 ;
var  marcocompra = 0;
var abrilcompra = 0;
var  maiocompra = 0;
var  junhocompra = 0 ;
var  julhocompra = 0;
var  agostocompra  = 0 ;
var  setembrocompra  = 0;
var outubrocompra = 0 ;
var novembrocompra = 0
var dezembrocompra  = 0 ;
// Card Total de Usuários

document.addEventListener('DOMContentLoaded', function () {

    async function Carregarusuarios() {

        try {
            const response = await fetch('http://localhost:5000/api/users',{
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                }});
            if (!response.ok) {
                throw new Error('Erro ao carregar os filmes')
            }
            const data = await response.json();
            users = data;
            console.log(users.length);


                
            const usersqnt = document.getElementById("total-user");
            usersqnt.innerText = users.length;


        } catch (error) {
            console.error('Erro: ', error)
        }
    }

    Carregarusuarios();

})

    // Card de Total de Shows

document.addEventListener('DOMContentLoaded', function () {

    async function Carregarshows() {

        try {
            const response = await fetch('http://localhost:5000/api/show',{
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                }});
            if (!response.ok) {
                throw new Error('Erro ao carregar os filmes')
            }
            const data = await response.json();
            shows = data;
                
            const showrsqnt = document.getElementById("total-show");
            showrsqnt.innerText = shows.length;


        } catch (error) {
            console.error('Erro: ', error)
        }
    }

    Carregarshows();


})



// Usuário maiores de 18 anos

document.addEventListener('DOMContentLoaded', function () {

    async function Carregarusuarios() {

        try {
            const response = await fetch('http://localhost:5000/api/users',{
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                }});
            if (!response.ok) {
                throw new Error('Erro ao carregar os filmes')
            }
            const data = await response.json();
            users = data;
          


            // function nascimento verify

            function verificarMaioridade(dataNascimento) {
                // Data de nascimento fornecida no formato 'yyyy-mm-dd'
                const dataNascimentoObj = new Date(dataNascimento);
                
                // Data atual
                const dataAtual = new Date();
                
                // Calculando a diferença de anos
                let idade = dataAtual.getFullYear() - dataNascimentoObj.getFullYear();
              // Verificar se a data de nascimento já passou neste ano
                const mesAtual = dataAtual.getMonth();
                const mesNascimento = dataNascimentoObj.getMonth();
                const diaAtual = dataAtual.getDate();
                const diaNascimento = dataNascimentoObj.getDate();
                
                
                // Ajustar idade caso ainda não tenha feito aniversário este ano
                if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
                  idade--;
                }

                  // Verifica se a idade é maior ou igual a 18 anos
                if (idade >= 18) {
                    return true; // Maior de idade
                } else {
                    return false; // Menor de idade
                }


            }


            var qnt18 = 0;

             users.forEach((user) => {

                if (verificarMaioridade(user.nascimento)) {
                    qnt18 = qnt18 + 1
                }            
            });

              
            const users18 = document.getElementById("users18");
            users18.innerText = qnt18;


        } catch (error) {
            console.error('Erro: ', error)
        }
    }

    Carregarusuarios();

})


// Carregamento card compras do mês 

 var compras

document.addEventListener('DOMContentLoaded', function () {

    async function Carregarcompras() {

        try {
            const response = await fetch('http://localhost:5000/api/compra',{
                method: "GET",
                headers: {
                  'Content-Type': 'application/json',
                }});
            if (!response.ok) {
                throw new Error('Erro ao carregar os filmes')
            }
            const data = await response.json();
            compras = data;



            // function nascimento verify

            function verificarMes(mesdecompra) {
                // Data de nascimento fornecida no formato 'yyyy-mm-dd'
                const dataCompraObj = new Date(mesdecompra);
                
                // Data atual
                const dataAtual = new Date();
                

             
                const mesAtual = dataAtual.getMonth();
                const mesCompra = dataCompraObj.getMonth()

                  // Verifica se a idade é maior ou igual a 18 anos
                if ( mesAtual === mesCompra ) {
                    return true; // Compra neste Mês
                } else {
                    return false; // Mês divergente
                }


            }


            var qntd = 0;

             compras.forEach((compra) => {

                if (verificarMes(compra.data)) {
                    qntd = qntd + 1
                }            
            });


            compras.forEach((compra) => {

               var comprax = new Date(compra.data)

              

                var mescompra = comprax.getMonth()
    

                console.log(mescompra)
                if (mescompra === 0) {janeirocompra = janeirocompra + 1}                
                if (mescompra === 1) {fevereirocompra = fevereirocompra + 1}  
                if (mescompra === 2) {marcocompra = marcocompra  + 1}  
                if (mescompra === 3) {abrilcompra = abrilcompra + 1}  
                if (mescompra === 4) {maiocompra = maiocompra + 1}  
                if (mescompra === 5) {junhocompra = junhocompra + 1}  
                if (mescompra === 6) {julhocompra = julhocompra + 1}  
                if (mescompra === 7) {agostocompra = agostocompra + 1}  
                if (mescompra === 8) {setembrocompra = setembrocompra + 1}  
                if (mescompra === 9) {outubrocompra =  outubrocompra + 1}  
                if (mescompra === 10) {novembrocompra =  novembrocompra + 1}  
                if (mescompra === 11) { dezembrocompra = dezembrocompra + 1}  
                
                })

                // Dados para o gráfico e tabela
const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const vendas = [
janeirocompra,   
fevereirocompra,
marcocompra,
abrilcompra,
maiocompra,
junhocompra,
julhocompra,
agostocompra,
setembrocompra,
outubrocompra,
novembrocompra,
dezembrocompra];


const Janeirofield = document.getElementById("Janeiro") 
   

Janeirofield.textContent =janeirocompra
    

const Fevereirofield = document.getElementById("Fevereiro")   

Fevereirofield.textContent = fevereirocompra
    
const Marçofield =document.getElementById("Março")   

Marçofield.textContent = marcocompra
    
const Abrilfield = document.getElementById("Abril")   

Abrilfield.textContent = abrilcompra
    
const Maiofield = document.getElementById("Maio")   

Maiofield.textContent = maiocompra
    
 const Junhofield = document.getElementById("Junho")   

 Junhofield.textContent = junhocompra
     
 const Julhofield = document.getElementById("Julho")   

 Julhofield.textContent = julhocompra;
     
 const Agostofield  = document.getElementById("Agosto")   

 Agostofield.textContent = agostocompra;
     
 const Setembrofield = document.getElementById("Setembro")   

 Setembrofield.textContent = setembrocompra
     
 const Outubrofield =  document.getElementById("Outubro")   

 Outubrofield.textContent = outubrocompra
     
 const Novembrofield = document.getElementById("Novembro")   

 Novembrofield.textContent = novembrocompra
     
 const Dezembrofield = document.getElementById("Dezembro")   

 Dezembrofield.textContent = dezembrocompra
    

// Criando o gráfico
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
type: 'bar', // Tipo de gráfico (barras)
data: {
    labels: labels,
    datasets: [{
        label: 'Vendas',
        data: vendas,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
    }]
},
options: {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true
        }
    }
}
});
              
            const qntdfield = document.getElementById("comprasmes");
            qntdfield.innerText = qntd;

            console.log(compras)

        } catch (error) {
            console.error('Erro: ', error)
        }
    }

    Carregarcompras();

})

