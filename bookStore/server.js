const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
    { id: 1, title: "Wings of Fire", author: "A.P.J. Abdul Kalam", price: 250, stock: 10 },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho", price: 300, stock: 8 },
    { id: 3, title: "Atomic Habits", author: "James Clear", price: 400, stock: 5 }
];

let cart = [];

let orders = [];

app.get('/', (req, res) => {
    res.send('Welcome to Online Book Store!');
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {

    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    res.json(book);
});

app.post('/books', (req, res) => {

    const { title, author, price, stock } = req.body;

    if (!title || !author ||
        typeof price !== 'number' || price <= 0 ||
        !Number.isInteger(stock) || stock < 0) {

        return res.status(400).json({
            message: 'Please provide valid book details'
        });
    }

    const newBook = {
        id: books.length > 0
            ? Math.max(...books.map(b => b.id)) + 1
            : 1,
        title,
        author,
        price,
        stock
    };

    books.push(newBook);

    res.status(201).json({
        message: 'Book added successfully',
        book: newBook
    });
});

app.put('/books/:id', (req, res) => {

    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    const { title, author, price, stock } = req.body;

    if (!title || !author ||
        typeof price !== 'number' || price <= 0 ||
        !Number.isInteger(stock) || stock < 0) {

        return res.status(400).json({
            message: 'Please provide valid book details'
        });
    }

    book.title = title;
    book.author = author;
    book.price = price;
    book.stock = stock;

    res.json({
        message: 'Book updated successfully',
        book: book
    });
});

app.delete('/books/:id', (req, res) => {

    const id = Number(req.params.id);

    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    books = books.filter(b => b.id !== id);

    res.json({
        message: 'Book deleted successfully'
    });
});

app.get('/cart', (req, res) => {

    res.json(cart);

});

app.post('/cart', (req, res) => {

    const { bookId, quantity } = req.body;

    const book = books.find(b => b.id === Number(bookId));

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({
            message: 'Invalid quantity'
        });
    }

    const existingItem = cart.find(
        item => item.bookId === book.id
    );

    const alreadyInCart = existingItem
        ? existingItem.quantity
        : 0;

    if (alreadyInCart + quantity > book.stock) {
        return res.status(400).json({
            message: 'Insufficient stock'
        });
    }

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            bookId: book.id,
            title: book.title,
            price: book.price,
            quantity: quantity
        });
    }

    res.status(201).json({
        message: 'Book added to cart successfully',
        cart: cart
    });
});

app.post('/orders', (req, res) => {

    if (cart.length === 0) {
        return res.status(400).json({
            message: 'Cart is empty'
        });
    }

    for (const item of cart) {

        const book = books.find(b => b.id === item.bookId);

        if (!book || book.stock < item.quantity) {
            return res.status(400).json({
                message: 'Insufficient stock for ' + item.title
            });
        }
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
    });

    cart.forEach(item => {
        const book = books.find(b => b.id === item.bookId);
        book.stock -= item.quantity;
    });

    const newOrder = {
        id: orders.length > 0
            ? Math.max(...orders.map(o => o.id)) + 1
            : 1,
        items: cart.map(item => ({ ...item })),
        total: total,
        status: 'Confirmed'
    };

    orders.push(newOrder);

    cart = [];

    res.status(201).json({
        message: 'Order placed successfully',
        order: newOrder
    });
});

app.get('/orders', (req, res) => {

    res.json(orders);

});

app.listen(PORT, () => {
    console.log(`Book Store Server running at http://localhost:${PORT}`);
});