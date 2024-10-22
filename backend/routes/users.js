var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: "minimal" });
const bcrypt = require('bcryptjs');

const { exceptionHandler } = require('../utils/handlers');
const { generateAccessToken, authenticateToken } = require('../utils/auth');

const selectDefault = {
  id: true,
  name: true,
  email: true,
};

BigInt.prototype['toJSON'] = function () { 
  return this.toString()
}

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
