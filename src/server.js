import express from "express"
import dotenv from "dotenv"
import userRouters from "./routes/user.router.js"

dotenv.config();

const app = express();

app.use(express.json());

app.use(userRouters);

app.get("/", (req, res) => {
    return res.json({message: "Api rodando.."});
});

app.listen(3000, () =>{
console.log("servidor rodando na porta 3000");
});