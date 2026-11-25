
import { useState } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [expenses, setExpenses] = useState([]);

    function addExpense() {
        if (name == "" || amount == "" || Number(amount) <= 0) {
            alert("Please enter valid details!");
        }
        else {
            let expense = {
                name: name,
                amount: Number(amount)
            };

            setExpenses([...expenses, expense]);

            setName("");
            setAmount("");
        }
    }

    function deleteExpense(index) {
        setExpenses(expenses.filter((e, i) => i != index));
    }

    let total = expenses.reduce((sum, e) => sum + e.amount, 0);

    return (
        <div className="container">
            <h1>Expense Tracker</h1>
            <p>Track Your Daily Expenses</p>

            <div className="form">
                <input
                    type="text"
                    placeholder="Expense Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <button onClick={addExpense}>Add Expense</button>
            </div>

            <h2>Total Spent: ₹{total}</h2>

            <h2>Expense List</h2>

            {expenses.map((e, index) => (
                <div className="expense-card" key={index}>
                    <div>
                        <h3>{e.name}</h3>
                        <p>₹{e.amount}</p>
                    </div>

                    <button onClick={() => deleteExpense(index)}>
                        Delete
                    </button>
                </div>
            ))}

            {expenses.length == 0 && <p>No expenses added yet.</p>}
        </div>
    );
}

export default App;
