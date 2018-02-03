require('dotenv').config()
export default {
  port: process.env.PORT || 8080,
  secretKey: process.env.SECRET_KEY
}