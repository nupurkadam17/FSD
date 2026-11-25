
import { useState } from "react";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [rating, setRating] = useState("");
    const [message, setMessage] = useState("");
    const [feedbacks, setFeedbacks] = useState([]);

    function addFeedback() {
        if (name == "" || rating == "" || message == "") {
            alert("Please fill all fields!");
        }
        else {
            let feedback = {
                name: name,
                rating: rating,
                message: message
            };

            setFeedbacks([...feedbacks, feedback]);

            setName("");
            setRating("");
            setMessage("");
        }
    }

    function deleteFeedback(index) {
        setFeedbacks(feedbacks.filter((f, i) => i != index));
    }

    return (
        <div className="container">
            <h1>Feedback Form</h1>
            <p>We value your feedback!</p>

            <div className="form">
                <input
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                >
                    <option value="">Select Rating</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                </select>

                <textarea
                    placeholder="Write your feedback"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button onClick={addFeedback}>Submit Feedback</button>
            </div>

            <h2>Submitted Feedback</h2>

            {feedbacks.map((f, index) => (
                <div className="feedback-card" key={index}>
                    <h3>{f.name}</h3>
                    <p>Rating: {f.rating}</p>
                    <p>{f.message}</p>

                    <button onClick={() => deleteFeedback(index)}>
                        Delete
                    </button>
                </div>
            ))}

            {feedbacks.length == 0 && <p>No feedback submitted yet.</p>}
        </div>
    );
}

export default App;
