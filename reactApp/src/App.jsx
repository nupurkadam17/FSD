
import { useState } from "react";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="container">
            <h1>Welcome to React!</h1>

            <h2>Student Profile</h2>
            <p>Name: Nupur</p>
            <p>Course: AI & DS</p>
            <p>Semester: V</p>

            <hr />

            <h2>Counter</h2>
            <h1>{count}</h1>

            <button onClick={() => setCount(count + 1)}>
                Increase
            </button>

            <button onClick={() => setCount(count - 1)}>
                Decrease
            </button>

            <button onClick={() => setCount(0)}>
                Reset
            </button>
        </div>
    );
}

export default App;
