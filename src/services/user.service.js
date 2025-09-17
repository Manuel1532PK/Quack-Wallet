exports.getProfile = async () => {
    return [
        { id: 1, nombre: "Juan", correo: "juan@mail.com" },
        { id: 2, nombre: "Ana", correo: "ana@mail.com" }
    ];
};

exports.findById = async (id) => {
    return { id, nombre: "Usuario Demo", correo: "demo@mail.com" };
};

exports.updateUser = async (id, data) => {
    return { id, ...data };
};

exports.updatePassword = async (id, contrasena) => {
    return { id, contrasena };
};
