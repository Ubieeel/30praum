const express = require('express');
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const app = express();

// Defina a porta desejada
const PORT = process.env.PORT || 3000;
console.log(`Servidor rodando na porta ${PORT}`);

// Configuração para o uso de middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
