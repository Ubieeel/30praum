const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

// Lista de abreviações dos estados brasileiros
const estadosBrasileiros = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", 
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

async function main() {
  // Função para formatar a data no formato yyyy-mm-dd
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  
  
  // Função para formatar horário como HH:MM
  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Gerar dados para a tabela 'user'
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push(
      await prisma.user.create({
        data: {
          email: faker.internet.email(),
          name: faker.person.fullName(),
          password: faker.internet.password(),
          cidade: faker.location.city(),
          cpf: faker.number.int({ min: 10000000000, max: 99999999999 }),
          endereco: faker.location.streetAddress().substring(0, 10), // Limitar o comprimento para 20 caracteres
          nascimento: formatDate(faker.date.birthdate({
            min: 15,
            max: 30,
            mode: 'age',
            })), // Formatação de data
          sexo: faker.helpers.arrayElement(['M', 'F']),
          telefone: faker.phone.number(),
          uf: faker.helpers.arrayElement(estadosBrasileiros), // Escolhe um estado aleatório
          is_admin: 'user', // Definindo 'user' como valor fixo para todos os usuários
        },
      })
    );
  }

  // Gerar dados para a tabela 'show'
 // Função para gerar uma data aleatória entre janeiro de 2023 e dezembro de 2024
const generateRandomDate2023to2024 = () => {
    // Gerar um ano aleatório entre 2023 e 2024
    const year = faker.helpers.arrayElement([2023, 2024]);
  
    // Gerar um mês aleatório entre 1 e 12
    const month = faker.number.int({ min: 1, max: 12 });
  
    // Gerar um dia aleatório entre 1 e o último dia do mês
    const daysInMonth = new Date(year, month, 0).getDate(); // Pega o último dia do mês
    const day = faker.number.int({ min: 1, max: daysInMonth });
  
    // Criar uma nova data com ano, mês e dia aleatório
    return new Date(year, month - 1, day); // mês começa em 0, então subtraímos 1
  };
  


  // Gerar dados para a tabela 'show'
  const shows = [];

  const urlshows = ["https://showpass.com.br/images/imagens-site/642616d077815.jpeg", "https://www.eventosaqui.com.br/directories/15425/banner.jpg", "https://www.designi.com.br/images/preview/10506161.jpg", "https://s3-assets.bilheteriadigital.com/eventos/60221a.jpg?1729594789000", "https://www.designi.com.br/images/preview/10609765.jpg" ]

  const artistas = ["MATUE", "WIU", "BRANDAO", "TETO"]

  for (let i = 0; i < 5; i++) {
    const randomDate = generateRandomDate2023to2024(); // Gera a data aleatória entre 2023 e 2024
    shows.push(
      await prisma.show.create({
        data: {
          data: formatDate(randomDate), // Formatação de data para o formato yyyy-mm-dd
          horario: formatTime(faker.date.recent()), // Formatação do horário
          preco: faker.number.float({ min: 10, max: 1000, precision: 0.01 }),
          endereco: faker.location.streetAddress().substring(0, 10),
          capa: faker.helpers.arrayElement(urlshows), // Usando faker.image.url() para gerar uma URL de imagem
          artista: faker.helpers.arrayElement(artistas),
          nome: faker.lorem.word(),
        },
      })
    );
  }
  

// Função para gerar uma data aleatória entre janeiro e dezembro de 2024
const generateRandomDate2024 = () => {
    // Definindo o ano como 2024
    const year = 2024;
  
    // Gerar um mês aleatório entre 1 e 12
    const month = faker.number.int({ min: 1, max: 12 });
  
    // Gerar um dia aleatório entre 1 e o último dia do mês
    const daysInMonth = new Date(year, month, 0).getDate(); // Pega o último dia do mês
    const day = faker.number.int({ min: 1, max: daysInMonth });
  
    // Criar uma nova data com ano, mês e dia aleatório
    return new Date(year, month - 1, day); // mês começa em 0, então subtraímos 1
  };
  
  // Gerar dados para a tabela 'compra'
  for (let i = 0; i < 20; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const show = shows[Math.floor(Math.random() * shows.length)];
  
    // Gerar uma data aleatória entre janeiro e dezembro de 2024
    const randomDate = generateRandomDate2024();
  
    await prisma.compra.create({
      data: {
        data: formatDate(randomDate), // Formatação de data para o formato yyyy-mm-dd
        cpf: user.cpf,
        status: faker.helpers.arrayElement(['Pago', 'Pendente', 'Cancelado']),
        quantidade: faker.number.int({ min: 1, max: 5 }),
        registroid: show.registro,
      },
    });
  }

  console.log('Dados de exemplo gerados com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
