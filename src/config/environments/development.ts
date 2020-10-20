export default {

    PORT: process.env.PORT_DEV,
    DATABASE: {
        type: process.env.DATABASE_CONNECTION_DEV,
        host: process.env.DATABASE_HOST_DEV,
        port: process.env.DATABASE_PORT_DEV,
        username: process.env.DATABASE_USERNAME_DEV,
        password: process.env.DATABASE_PASSWORD_DEV,
        name: process.env.DATABASE_NAME_DEV,
    }
}