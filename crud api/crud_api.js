const express = require('express');
const app = express();
app.use(express.json()); 
const port = 3000;
app.get('/',(req,res) => {
    res.json({
      name: "Task API",
        version: "1.0",
        endpoints: ["/tasks"]
    })
})
let task = [
    { id: 1, title: "Study Express" },
    { id: 2, title: "Finish internship task" },
    {id : 3, title : "Study Cs"}
];
app.get('/tasks',(req,res)=>{
    res.json(task)
})
app.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const foundtask = task.find(t => t.id === id);

    if (!foundtask) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.json(foundtask);
});
app.get('/health',(req,res)=>{
    res.json({
        "status " : "ok ","code" : "200"
    })
})
app.post("/tasks", (req, res) => {
    const { title } = req.body;

    const newTask = {
        id: task.length + 1,
        title: title
    };

    task.push(newTask);

    res.status(201).json(newTask);
});
app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})