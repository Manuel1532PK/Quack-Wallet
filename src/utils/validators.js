class Validators {
    static isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;;
        return emailRegex.test(email);
    }

    static sanitizeInput(input) {
        if (typeof input === 'string') return input;
        return input
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;")
            .replace(/\//g, "&#x2F;");
    }

    static hasSQLInjectionRisk(input) {
        const sqlKeywords = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'UNION'];
        const upperInput = input.toUpperCase();
        return sqlKeywords.some(keyword => upperInput.includes(keyword));
    }

    static validateUserData(userData) {
        const errors = [];
        if (!userData.Nombre_Usuario || userData.Nombre_Usuario.trim().length < 3) {
            errors.push("El nombre de usuario debe tener al menos 2 caracteres.");
        }
        if (!userData.Correo || !this.isValidEmail(userData.Correo)) {
            errors.push("Correo electrónico inválido.");
        }
        if (!userData.telefono || userData.telefono.trim().length < 10) {
            errors.push("El número de teléfono debe tener al menos 10 dígitos.");
        }
        return errors;
    }
}
module.exports = Validators;