// App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([]);

    const handleInputChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (question.trim()) {
            try {
                const response = await axios.post('http://localhost:5000/solve', { content: question });
                if (response.data.status === 'success') {
                    console.log(response.data.answer)
                    setAnswers([...answers, response.data.answer]);
                } else {
                    alert('Error: ' + response.data.message);
                }
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
    };

    return (
        <div className="App">
            <h1>Math Solver Chatbot</h1>
            <form onSubmit={handleSubmit}>
        <textarea
            value={question}
            onChange={handleInputChange}
            placeholder="Type your equation here..."
            rows="4"
            cols="50"
        />
                <br />
                <button type="submit">Send</button>
            </form>
            <div>
                <h2>Responses</h2>
                <ul>
                    {answers.map((answer, index) => (
                        <li key={index}>{answer}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
