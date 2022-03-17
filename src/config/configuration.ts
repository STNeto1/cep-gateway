export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    mongo_uri: process.env.MONGO_URI
  }
})
