export enum AuthMessages {
    INVALID_CREDENTIALS = 'Credenciales incorrectas. Verifica tu correo electrónico o contraseña',
    ACCOUNT_CREATED = 'Éxito: Su cuenta ha sido creada. Por favor, inicie sesión para continuar.',
    INVALID_TOKEN = 'Token inválido o expirado. Por favor, solicita uno nuevo.',
    ACCOUNT_LOCKED = 'Tu cuenta ha sido bloqueada debido a múltiples intentos fallidos de inicio de sesión.',
    PASSWORD_RESET_SUCCESS = 'Tu contraseña ha sido restablecida exitosamente. Por favor, inicia sesión con la nueva contraseña.',
    PASSWORD_RESET_FAILED = 'El restablecimiento de contraseña ha fallado. Por favor, intenta nuevamente.',
    ACCOUNT_NOT_VERIFIED = 'Tu cuenta aún no ha sido verificada. Por favor, revisa tu correo electrónico para verificarla.',
    LOGIN_SUCCESS = 'Credenciales correctas. Bienvenido/a nuevamente.',
    SESSION_EXPIRED = 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.',
    ACCOUNT_BLOCKED_BY_ADMIN = 'Tu cuenta ha sido bloqueada por un administrador. Por favor, contacta al soporte para más información.',
}