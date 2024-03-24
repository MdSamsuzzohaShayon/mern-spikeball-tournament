const jwt = require('jsonwebtoken');
const { GENERAL, SUPER } = require("../utils/Role");

module.exports = {
    ensureAuth: async (req, res, next) => {
        try {
          if (!req.headers.authorization) return res.json({ msg: "Not authenticated", user: null });
          const accessToken = req.headers.authorization.split(" ")[1];
          if (!accessToken) return res.status(401).send({ msg: 'Unauthenticated' });
          const decodedToken = await jwt.verify(accessToken, process.env.JWT_SECRET);
          if (!decodedToken) return res.status(401).send({ msg: 'Unauthenticated' });
          console.log({decodedToken, role: decodedToken.role});
          if (decodedToken?.role !== GENERAL && decodedToken?.role !== SUPER ) return res.status(401).send({ msg: 'Unauthenticated' });
          req.userId = decodedToken?.id;
          req.userEmail = decodedToken?.email;
          req.userRole = decodedToken.role;
          next();
        } catch (error) {
          console.log(error);
          if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Unauthenticated' });
          }
        }
      },
    ensureGuast: (req, res, next) => {
        next(); // PASS

    }
}