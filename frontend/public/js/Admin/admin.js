var iduser = sessionStorage.getItem('iduser', iduser);
var id = iduser 


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

              
            const qntdfield = document.getElementById("comprasmes");
            qntdfield.innerText = qntd;

            console.log(compras)

        } catch (error) {
            console.error('Erro: ', error)
        }
    }

    Carregarcompras();

})
