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



// GET /api/Compra/{id}
// PATH /api/Compra/{id}
// DELETE /api/Compra/{id}

// catch all
router.all('*', (req, res) => {
    res.status(501).end() // 501 Not Implemented.
});

module.exports = router;