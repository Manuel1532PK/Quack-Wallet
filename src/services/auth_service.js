exports.register = async (user) => {
    return { id: Date.now(), ...user };
};

exports.login = async (correo, password) => {
    if (correo === "test@mail.com" && password === "1234") {
        return { id: 1, nombre: "Usuario Demo", correo };
    }
    return null;
};

exports.forgotPassword = async (correo) => {
    return { message: `Se envió un enlace de recuperación al correo ${correo}` };
};

exports.resetPassword = async (newPassword) => {
    return { message: "Contraseña restablecida correctamente", token, newPassword };
};
