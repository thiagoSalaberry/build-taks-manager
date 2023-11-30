import * as express from "express";
import { Request, Response } from "express";
import * as path from "path";

const app = express();
const PORT = process.env.PORT || 4444;
app.use(express.json());

app.use(express.static(path.join(__dirname, '../dist')));

app.get("/test", (req:Request, res:Response) => {
    res.send("Funcionando");
});

app.get("*", (req, res)=>{
    const file = path.resolve(__dirname, "../dist/index.html");
    res.sendFile(file);    
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});