const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const connection = require('../config/db_config');

class AuthController {
    async login(req, res) {
        try {
            const { correo, password } = req.body;

            const [users] = await connection.execute(
                'SELECT * FROM Usuarios WHERE Correo = ?',
                [correo]
            );

            if (!users[0]) {
                return res.status(400).json({ message: "Usuario no encontrado" });
            }

            const user = users[0];
            const isPasswordValid = await bcrypt.compare(password, user.Hash_Password);
            
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Contraseña incorrecta" });
            }

            const token = jwt.sign(
                { 
                    id: user.ID_Usuarios, 
                    correo: user.Correo,
                    nombre: user.Nombre_Usuario 
                },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(200).json({
                message: "Login exitoso",
                token,
                user: {
                    id: user.ID_Usuarios,
                    nombre: user.Nombre_Usuario,
                    correo: user.Correo,
                    telefono: user.Telefono
                }
            });

        } catch (error) {
            res.status(500).json({ message: "Error del servidor" });
        }
    }

    async forgotPassword(req, res) {
        try {
            const { correo } = req.body;

            const [users] = await connection.execute(
                'SELECT * FROM Usuarios WHERE Correo = ?',
                [correo]
            );
            
            if (!users[0]) {
                return res.status(400).json({ message: "Usuario no registrado" });
            }

            const userId = users[0].ID_Usuarios;
            const otpCodigo = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiracion = new Date(Date.now() + 10 * 60 * 1000);

            await connection.execute(
                'UPDATE Usuarios SET Otp_Codigo = ?, Otp_Expira = ? WHERE ID_Usuarios = ?',
                [otpCodigo, otpExpiracion, userId]
            );

            res.status(200).json({ 
                message: "OTP enviado",
                otp: otpCodigo
            });

        } catch (error) {
            res.status(500).json({ message: "Error del servidor" });
        }
    }

    async resetPassword(req, res) {
        try {
            const { correo, otpCodigo, nuevaPassword } = req.body;

            const [users] = await connection.execute(
                'SELECT ID_Usuarios, Otp_Codigo, Otp_Expira FROM Usuarios WHERE Correo = ?',
                [correo]
            );

            if (!users[0]) {
                return res.status(400).json({ message: "Correo no encontrado" });
            }

            const user = users[0];

            if (!user.Otp_Codigo || user.Otp_Codigo !== otpCodigo) {
                return res.status(400).json({ message: "OTP incorrecto" });
            }

            if (new Date(user.Otp_Expira) < new Date()) {
                return res.status(400).json({ message: "OTP expirado" });
            }

            const hashedPassword = await bcrypt.hash(nuevaPassword, 10);
            await connection.execute(
                'UPDATE Usuarios SET Hash_Password = ?, Otp_Codigo = NULL, Otp_Expira = NULL WHERE ID_Usuarios = ?',
                [hashedPassword, user.ID_Usuarios]
            );

            res.status(200).json({ message: "Contraseña actualizada" });

        } catch (error) {
            res.status(500).json({ message: "Error del servidor" });
        }
    }
}

module.exports = new AuthController();