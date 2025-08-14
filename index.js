const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());


let categories = [
    {id:1, name:"Pyhton"},
    {id:2, name:"Php"},
    {id:3, name:"Nodejs"},
    {id:4, name:"Java"}
];

app.get('/api/categories', (req, res) => {
    res.status(200).send(categories);
});

app.get('/api/categories/:id', (req,res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
        res.status(404).send('Berilgan IDga oid kategoriya mavjud emas');
    }
    res.send(category);
});

app.post('/api/categories', (req,res) => {
    const categorySchema = Joi.object({
        name: Joi.string().required().min(3)
    });

    const { error } = categorySchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const categoryAdd = {
        id: categories.length+1,
        name: req.body.name
    };
    categories.push(categoryAdd)
    res.status(201).send(categoryAdd);
});

app.put('/api/categories/:id', (req,res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
        res.status(404).send('Berilgan IDga oid kategoriya mavjud emas');
    }

    const categorySchema = Joi.object({
        name: Joi.string().required().min(3)
    });

    const { error } = categorySchema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    category.name = req.body.name;
    res.send(category);

});

app.delete('/api/categories/:id', (req, res) => {
    const category = categories.find(c => c.id === parseInt(req.params.id));
    if (!category) {
        res.status(404).send('Berilgan IDga oid kategoriya mavjud emas');
    }
    const categoryIndex = categories.indexOf(category);
    categories.splice(categoryIndex, 1);
    res.send(category);
});

const port = process.env.PORT;
app.listen(port,() => {
    console.log(`${port} portni eshitiyapti`);
});
