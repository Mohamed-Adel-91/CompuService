// Regular expression to check for symbols, or numbers
const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/;

const isValidName = (name) => {
    return (
        !regex.test(name) &&
        !name.startsWith(" ") &&
        !name.startsWith("\n") &&
        !name.endsWith(" ") &&
        !name.endsWith("\n") &&
        name.length >= 3
    );
};

module.exports = { isValidName };
