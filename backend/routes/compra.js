var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: "minimal" });

const { exceptionHandler } = require('../utils/handlers');
const { generateAccessToken, authenticateToken } = require('../utils/auth');

const selectDefault = {
  codigo: true,
  cpf: true,
  status: true,
  data: true
};
// Implementar as rotas de Compra

// GET /api/Compra

router.get('/', async (req, res) => {
    try {
      const compra = await prisma.compra.findMany({
        select: selectDefault
      });
      res.json(compra);
    }
    catch (exception) {
      exceptionHandler(exception, res);
    }
  });

  // POST /api/Compra

  router.post('/', async (req, res) => {
    try {
      const data = req.body;
      
      if (!data.cpf) {
        return res.status(400).json({
          error: "A compra precisa de um codigo e um cpf válido."
        });
      }
      const compra = await prisma.compra.create({
        data,
        select: selectDefault
      });
      res.status(201).json(compra)
      
    } 
    catch (exception) {
      exceptionHandler(exception, res);
    }
  });

// GET /api/Compra/{codigo}

router.get('/:codigo', async (req, res) => {
  try {

    const codigo = Number(req.params.codigo);
    const compra = await prisma.compra.findUniqueOrThrow({
      where: {
        codigo : codigo
      },
      select: selectDefault
    });
    res.json(compra);
  }
  catch (exception) {
      return res.status(404).json({
          error: "Compra não encontrada."
        });
  }
});

//GET /api/Compra/{cpf}


router.get('/:cpf', async (req, res) => {
  try {
    const cpf = req.params.cpf;
    const compra = await prisma.compra.findUnique({
      where: {
        cpf: cpf
      },
      select: selectDefault
    });
    res.json(compra);
  }
  catch (exception) {
      return res.status(404).json({
          error: "Compra não encontrada."
        });
  }
});

// PATCH /api/Compra/{codigo}

router.patch('/:codigo', async (req, res) => {
  try {
    const codigo = Number(req.params.codigo);
    const data = req.body;

    const checkcompra = await prisma.compra.findUnique({
      where: {
        codigo: codigo,
      }
    });
    console.log(checkcompra);

    const compra = await prisma.compra.update({
      where: {
        codigo: codigo
      },
      data: data,
      select: selectDefault
    });
    res.json(compra)
  }
  catch (exception) {
    exceptionHandler(exception, res);
  }
});

// DELETE /api/Compra/{codigo}

router.delete('/:codigo', async (req, res) => {
  try {
    const codigo = Number(req.params.codigo);
    const compra = await prisma.compra.delete({
      where: {
        codigo: codigo
      }
    });
    res.status(200).json({
      aviso: "compra apagada."
    });
  }
  catch(exception) {
    return res.status(400).json({
      error: "compra não encontrada."
    });
  }
});

// catch all
router.all('*', (req, res) => {
    res.status(501).end() // 501 Not Implemented.
});

module.exports = router;