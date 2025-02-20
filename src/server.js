const express = require("express");
const path = require("path");
const pokemonRouter = require("../routes/pokemon");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));
app.use ("/", pokemonRouter);
app.get("/", (req,res)=>{
    return res.status(200).json({
        message: "hello world",
    });
});
const PORT = 8000 || process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)

 
});