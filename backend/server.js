import express from "express";
import path from "path";
const __dirname = path.resolve();
const app = express();
const port = 8080;
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/frontend/src/html/home.html")
})
app.get("/guest",(req,res)=>{
    res.sendFile(__dirname+"/frontend/src/html/guestBook.html")
})
app.get("/map",(req,res)=>{
    res.sendFile(__dirname+"/frontend/src/html/map.html")
})
app.use(express.static("frontend"));
app.listen(port, () => {
    console.log(`Listening to server on http://localhost:${port}`);
});