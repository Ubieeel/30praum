var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: "minimal" });
const bcrypt = require('bcryptjs');


const { exceptionHandler } = require('../utils/handlers');
const { generateAccessToken, authenticateToken } = require('../utils/auth');


function decrypt(input, key) {
  const ivLength    = 12; // default nonce size used in Go
  const tagLength   = 16; // default tag size used in Go
  const inputBuffer = Buffer.from(input, "base64");
  const iv          = Buffer.allocUnsafe(ivLength);
  const tag         = Buffer.allocUnsafe(tagLength);
  const data        = Buffer.alloc(inputBuffer.length - ivLength - tagLength, 0);

  inputBuffer.copy(iv, 0, 0, ivLength);
  inputBuffer.copy(tag, 0, inputBuffer.length - tagLength);
  inputBuffer.copy(data, 0, ivLength);

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)

  decipher.setAuthTag(tag);

  return decipher.update(data, null, "utf8") + decipher.final("utf8");
}




const selectDefault = {
  id: true,
  cpf: true,
  name: true,
  email: true,
  nascimento: true,
  uf: true,
  cidade: true,
  sexo: true,
  endereco: true,
  telefone: true,
  is_admin: true
};


const selectprofile = {
  id: true,
  cpf: true,
  name: true,
  email: true,
  nascimento: true,
  uf: true,
  cidade: true,
  sexo: true,
  endereco: true,
  telefone: true,
  password:true
};

BigInt.prototype['toJSON'] = function () { 
  return this.toString()
}

// Rota para testar se email existe
router.post('/check-email', async (req, res) => {
  const { email } = req.body;

  // Valida se o email foi enviado na requisição
  if (!email) {
    return res.status(400).json({ message: 'Email é necessário' });
  }

  try {
    // Verifica se o email já existe no banco de dados
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Se o email já existir
    if (user) {
      return res.status(409).json({ message: 'Email já cadastrado' }); // 409 - Conflito
    } else {
      return res.status(200).json({ message: 'Email disponível' });
    }
  } catch (error) {
    console.error('Erro ao verificar email', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para testar se email existe
router.post('/check-email', async (req, res) => {
  const { email } = req.body;

  // Valida se o email foi enviado na requisição
  if (!email) {
    return res.status(400).json({ message: 'Email é necessário' });
  }

  try {
    // Verifica se o email já existe no banco de dados
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Se o email já existir
    if (user) {
      return res.status(409).json({ message: 'Email já cadastrado' }); // 409 - Conflito
    } else {
      return res.status(200).json({ message: 'Email disponível' });
    }
  } catch (error) {
    console.error('Erro ao verificar email', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para testar se cpf existe
router.post('/check-cpf', async (req, res) => {
  const { cpf } = req.body;

  // Valida se o email foi enviado na requisição
  if (!cpf) {
    return res.status(400).json({ message: 'cpf é necessário' });
  }

  try {
    // Verifica se o email já existe no banco de dados
    const user = await prisma.user.findUnique({
      where: { cpf }
    });

    // Se o email já existir
    if (user) {
      return res.status(409).json({ message: 'CPF já cadastrado' }); // 409 - Conflito
    } else {
      return res.status(200).json({ message: 'CPFdisponível' });
    }
  } catch (error) {
    console.error('Erro ao verificar CPF', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});



// GET /api/users - Lista todos os usuários.

router.get('/', async (req, res) => {
  try {
      const users = await prisma.user.findMany({
        select: selectDefault});
    res.json(users);
  }
  catch (exception) {
    exceptionHandler(exception, res);
  }
});

// POST /api/users - Cria um novo usuário.
router.post('/', async (req, res) => {
  try {
    const data = req.body; // email*, name, password*
    if ('is_admin' in data) {
      // delete data.is_admin;
    }
    if (!data.password || data.password.length < 8 ) {
      return res.status(400).json({
        error: "A senha é obrigatória e deve no minímo 8 caracteres"
      });
    }
    data.password = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data,
      select: selectDefault
    });
    
    const jwt = generateAccessToken(user);
    user.accessToken = jwt;
    res.status(201).json(user);
  }
  catch (exception) {
    exceptionHandler(exception, res);
  }
});

// GET /api/users/{id}
router.get('/:id', async (req, res) => {
  try {

    const id = Number(req.params.id);
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: id
      },
      select: selectDefault
    });
    res.json(user);
  }
  catch (exception) {
    exceptionHandler(exception, res);
  }
});


// GET /api/users/profile/{id}   RECUPERA DADOS PARA PROFILE 
router.get('/profile/:id', authenticateToken, async (req, res) => {
  try {

    const token = req.accessToken;
    const id = Number(req.params.id);
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: id
      },
      select: selectprofile
    });

    const checkUser = await prisma.user.findUnique({
      where: {
        id: id,
        email: token.email
      }
    });
  

    res.json(user);
  }
  catch (exception) {
    exceptionHandler(exception, res);
  }
});



// PATCH /api/users - Atualiza um usuário pelo id.
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const token = req.accessToken;

    const checkUser = await prisma.user.findUnique({
      where: {
        id: id,
        email: token.email
      }
    });
    console.log(checkUser);

    // Negar acesso a atualizar o usuário != do dono do token
    if (checkUser === null || id !== token.id) {
      return res.sendStatus(403); // 403 Forbidden.
    }


    if ('password' in data) {
      if (data.password.length <= 8) {
        return res.status(400).json({
          error: "A senha deve ter no mínimo 8 caracteres."
        })
      }

      data.password = await bcrypt.hash(data.password, 10);

    }
    const user = await prisma.user.update({
      where: {
        id: id
      },
      data: data,
      select: selectDefault
    });
    res.json(user)
  }
  catch (exception) {
    exceptionHandler(exception, res);
  }
});

//  Patch de admin
router.patch('/admin/:id', authenticateToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const token = req.accessToken;

    const checkUser = await prisma.user.findUnique({
      where: {
        id: id,
        email: token.email
      }
    });
    console.log(checkUser);

    // Negar acesso a atualizar o usuário != do dono do token
    if (!token.is_admin) {
      return res.sendStatus(403); // 403 Forbidden.
    }


    if ('password' in data) {
      if (data.password.length < 8) {
        return res.status(400).json({
          error: "A senha deve ter no mínimo 8 caracteres."
        })
      }
      data.password = await bcrypt.hash(data.password, 10);

    }
    const user = await prisma.user.update({
      where: {
        id: id
      },
      data: data,
      select: selectDefault
    });
    res.json(user)
  }
  catch (exception) {
    exceptionHandler(exception, res);
  }
});

// DELETE /api/users - Exclui um usuário por id. 
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const user = await prisma.user.delete({
      where: {
        id: id
      }
    });
    res.status(204).end(); // 204 Not content
  }
  catch(exception) {
    return res.status(400).json({
      error: "Usuário não encontrado."
    });
  }
});

// POST /api/users/login - Valida o acesso de um usuário.
router.post('/login', async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    if (!('password' in data) || !('email' in data)) {
      return res.status(401).json({
        error: "Usuário e senha são obrigatórios"
      });
    }
    // Recuperar o usuário se existir
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        email: data.email
      }
    });

    // Verificar a senha
    
    const passwordCheck = await bcrypt.compare(data.password, user.password);
    if (!passwordCheck) {
      return res.status(401).json({
        error: "Usuário e/ou senha incorreto(s)"
      });
    }
    delete user.password;
    const jwt = generateAccessToken(user);
    user.accessToken = jwt;
    res.json(user);

  }
  catch (exception) {
    exceptionHandler(exception, res);
  }
});


// catch all
router.all('*', (req, res) => {
  res.status(501).end() // 501 Not Implemented.
});


module.exports = router;
