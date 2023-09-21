import express from 'express';

const app = express();
app.use(express.json());

const book = [
    {
        id: 1,
        title: 'The Hobbit',
    },
    {
        id: 2,
        title: 'The Dark Tower',
    }
]

function searchBook(id) {
    return book.findIndex(book => book.id === Number(id));
}

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

app.get('/book', (req, res) => {
  res.status(200).json(book);
});

app.get('/book/:id', (req, res) => {
    const index = searchBook(req.params.id);
    res.status(200).json(book[index]);
});

app.put('/book/:id', (req, res) => {
    const index = searchBook(req.params.id);
    book[index].title = req.body.title;
    res.status(200).json(book);
});

app.post('/book', (req, res) => {
  book.push(req.body);
  res.status(201).send("Book added successfully");
});

app.delete('/book/:id', (req, res) => {
    const index = searchBook(req.params.id);
    book.splice(index, 1);
    res.status(200).send("Removed book successfully");
});

export default app