const errorMessagesEnum = Object.freeze({
    //User
    USER_ALREADY_EXISTS: 'A user with such email already exists. Use other email and try again.',
    USER_NOT_REGISTERED: 'This user is not registered. Please check your email address and password and try again.',
    USER_DOES_NOT_EXISTS: 'User with such id does not exist.',
    USER_INVALID_PASSWORD: 'You entered the wrong password. Check and try again',
    USER_INVALID_ACTIVATION_LINK: 'Invalid link activation',
    USER_INVALID_RESET_PASSWORD_LINK: 'The reset link is no longer active. Try requesting a password reset again.',
    USER_ACCOUNT_IS_NOT_ACTIVATED: 'This account is not confirmed, you have been sent a confirmation email. Confirm and try logging in again',
    USER_INVALID_CONFIRM_LINK: 'Invalid link confirm',
    USER_INVALID_AVATAR_FILE: 'Only JPG, PNG and WebP files are allowed',
});

module.exports = errorMessagesEnum;