export default {

    PORT: process.env.PORT,
    DATABASE: {
        type: process.env.DATABASE_CONNECTION,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
    }
}