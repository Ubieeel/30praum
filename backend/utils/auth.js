// gestão do JWT
const jwt = require('jsonwebtoken');

// Gera um token assinado que expira em 30 minutos por padrão.
function generateAccessToken(data, options={ expiresIn: '9999s' }) {
    return jwt.sign(data, process.env.SECRET_KEY, options);
}

// Recupera e valida o token recebido na requisição
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    // authorization: Bearer: token
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // 401 unauthorized.

    jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        console.log(err);

        if (err) return res.sendStatus(403); // 403 Forbidden.

        req.accessToken = data;
        next();
    });
}

// Exporta as funções.
module.exports = { generateAccessToken, authenticateToken };
