
const mongoose = require('mongoose')

const connectDb = async (dbURL) => {
    try {
        const connectionInstance = await mongoose.connect(dbURL)
        console.log(`\nMongodb Connected on port: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Mongodb connection error ", error)
        process.exit(1)
    }
}

module.exports = connectDb