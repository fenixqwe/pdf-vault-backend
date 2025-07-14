const errorMessagesEnum = Object.freeze({
    //User
    USER_ALREADY_EXISTS: 'A user with such email already exists. Use other email and try again.',
    USER_NOT_REGISTERED: 'This user is not registered. Please check your email address and password and try again.',
    USER_DOES_NOT_EXISTS: 'User with such id does not exist.',
    USER_INVALID_PASSWORD: 'You entered the wrong password. Check and try again',
    USER_INVALID_RESET_PASSWORD_LINK: 'The reset link is no longer active. Try requesting a password reset again.',

    //Session
    SESSION_NOT_EXISTS: 'Session does not exist or already ended.',
});

module.exports = errorMessagesEnum;