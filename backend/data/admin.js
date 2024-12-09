const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

// Lista de abreviações dos estados brasileiros
const estadosBrasileiros = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", 
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];



// Função para formatar a data no formato yyyy-mm-dd
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

async function main() {
  // Criando um usuário com faker
  const user = await prisma.user.create({
    data: {
      email: "admin5@admin.com",
      name: faker.person.fullName(),
      // Senha é:  testesenha
      password: "$2a$10$YIuLBS2JTvOinVAf3w6eqOO54QNmuH5PHw.Zh0FsPHm8xQFugTXXa",
      cidade: faker.location.city(),
      cpf: "12412412442",
      endereco: faker.location.streetAddress().substring(0, 10), // Limitar o comprimento para 10 caracteres
      nascimento: formatDate(faker.date.birthdate({ min: 15, max: 30, mode: 'age' })), // Gera a data de nascimento para uma idade entre 15 e 30 anos
      sexo: faker.helpers.arrayElement(['M', 'F']),
      telefone: faker.phone.number(),
      uf: faker.helpers.arrayElement(estadosBrasileiros), // Escolhe um estado aleatório
      is_admin: 'true', // Definindo 'true' para o campo 'is_admin'
    },

  });

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

    
  
    // Gerar uma data aleatória entre janeiro e dezembro de 2024
    const randomDate = generateRandomDate2024();
  
    await prisma.compra.create({
      data: {
        data: formatDate(randomDate), // Formatação de data para o formato yyyy-mm-dd
        cpf: "12412412442",
        status: faker.helpers.arrayElement(['Pago', 'Pendente', 'Cancelado']),
        quantidade: faker.number.int({ min: 1, max: 5 }),
        registroid: 1,
      },
    });
  




  console.log('Usuário criado:', user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
