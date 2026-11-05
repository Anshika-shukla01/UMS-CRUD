const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json);

let users = [
    { id: 1, full_name: "John Doe", email: "john@gmail.com" },
    { id: 2, full_name: "Alan Dow", email: "alan@gmail.com" }
]

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/users', (req, res) => {
    const newUsers = {
        id: Date.now(),
        full_name: req.body.name
    };
    users.push(newUsers);
    res.status(201).json(newUsers);
})

app.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name } =  req.body;
    const users = users.find(i => i.id === parseInt(id));

    if(users) {
        users.name = name;
        res.json(users);
    } else {
        res.status(404).json({ message: 'user not found' });
    }
});

app.delete('/api/users/:id', (req, res) =>{
    const { id } = req.params;
    users = users.filter(i => i.id !== parseInt(id));
    res.json({ message: 'Item deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});