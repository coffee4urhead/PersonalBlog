const schemaUser = {
    username: {
        isAlphanumeric: {
            errorMessage: "Username must contain only letters and numbers.",
        },
        isLength: {
            options: { min: 3, max: 20 },
            errorMessage: "Username must be between 3 and 20 characters long.",
        },
        notEmpty: {
            errorMessage: "Username is required.",
        },
    },
    email: {
        isEmail: {
            errorMessage: "The provided email is not correct. Please check to ensure that the input values are correct.",
        },
        isLength: {
            options: { min: 8, max: 30 },
            errorMessage: "The email is not the correct length. It must be between 8 and 30 characters.",
        },
        notEmpty: {
            errorMessage: "Email is required.",
        },
    },
    password: {
        isLength: {
            options: { min: 6, max: 30 },
            errorMessage: "Password must be between 6 and 30 characters long.",
        },
        notEmpty: {
            errorMessage: "Password is required.",
        },
    },
};

export default schemaUser;