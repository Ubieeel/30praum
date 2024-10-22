var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ errorFormat: "minimal" });

const { exceptionHandler } = require('../utils/handlers');
const { generateAccessToken, authenticateToken } = require('../utils/auth');

const selectDefault = {
  registro: true,
  nome: true,
  artista: true,
  data: true,
  endereco: true,
};

// GET /api/show - Lista todos os shows.
router.get('/', async (req, res) => {
    try {
        const show = await prisma.show.findMany({
          select: selectDefault});
      res.json(show);
    }
    catch (exception) {
      exceptionHandler(exception, res);
    }
  });

// POST /api/show
router.post('/', async (req, res) => {
    try {
      const data = req.body;

      if (!data.nome || !data.endereco) {
        return res.status(400).json({
          error: "informações de show inválidas"
        });
      }
      const show = await prisma.show.create({
        data,
        select: selectDefault
      });
      
      res.status(201).json(show);
    }
    catch (exception) {
      exceptionHandler(exception, res);
    }
  });


 
// GET /api/show/{id}
router.get('/:registro', async (req, res) => {
    try {
  
      const registro = Number(req.params.registro);
      const show = await prisma.show.findUniqueOrThrow({
        where: {
          registro : registro
        },
        select: selectDefault
      });
      res.json(show);
    }
    catch (exception) {
        return res.status(401).json({
            error: "Show não encontrado."
          });
    }
  });
  
// PACTH /api/show/{registro}
router.patch('/:registro', async (req, res) => {
    try {
      const registro = Number(req.params.registro);
      const data = req.body;
  
      const checkShow = await prisma.show.findUnique({
        where: {
          registro: registro,
        }
      });
      console.log(checkShow);
  
      const show = await prisma.show.update({
        where: {
          registro: registro
        },
        data: data,
        select: selectDefault
      });
      res.json(show)
    }
    catch (exception) {
      exceptionHandler(exception, res);
    }
  });


// DELETE /api/show/{registro}
router.delete('/:registro', async (req, res) => {
    try {
      const registro = Number(req.params.registro);
      const show = await prisma.show.delete({
        where: {
          registro: registro
        }
      });
      res.status(200).json({
        aviso: "Show apagado."
      });
    }
    catch(exception) {
      return res.status(400).json({
        error: "Show não encontrado."
      });
    }
  });

// catch all
router.all('*', (req, res) => {
    res.status(501).end() // 501 Not Implemented.
});

module.exports = router;