const app = require("./app")
const dotenv = require("dotenv")
const path = require("path")
const connectDatabase = require("./config/database")

dotenv.config({ path: path.join(__dirname, "config/config.env") })
 
connectDatabase();

app.listen(process.env.SMP_PORT, () => {
    console.log(`server running on port ${process.env.SMP_PORT} in ${process.env.NODE_ENV}`);
})