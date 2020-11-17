export default {
  port: 3000,
  dbUrl: process.env.DB_URL,
  jwt: {
    key: process.env.JWT_KEY,
    algorithm: 'RS256',
    expiresIn: 120,
  },
}
