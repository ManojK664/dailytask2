import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [marks, setMarks] = useState({
    chemistry: '',
    maths: '',
    physics: '',
    computing: '',
    electronics: ''
  });
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submittedMarks, setSubmittedMarks] = useState([]); // State to store submitted marks

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault(); // Prevent form submission with default validation

    // Check if username and password are provided
    if (username.trim() === '' || password.trim() === '') {
      setError('Both username and password are required.');
    } else {
      setError('');
      setIsLoggedIn(true);
    }
  };

  // Handle marks input changes
  const handleMarksChange = (e) => {
    const { name, value } = e.target;
    setMarks({ ...marks, [name]: value });
  };

  // Handle marks submission
  const handleAddMarks = (e) => {
    e.preventDefault(); // Prevent the page refresh on button click

    // Create an array of marks with subjects and values
    const marksArray = Object.entries(marks)
      .map(([subject, mark]) => {
        // If mark is empty, consider it as zero
        return `${subject.charAt(0).toUpperCase() + subject.slice(1)}: ${mark.trim() === '' ? 0 : mark}`;
      });

    // Update the state with new submitted marks (append new marks to the list)
    setSubmittedMarks((prevMarks) => [...prevMarks, ...marksArray]);

    // Reset the marks input fields for further entries (empty the fields after submission)
    setMarks({
      chemistry: '',
      maths: '',
      physics: '',
      computing: '',
      electronics: ''
    });
  };

  return (
    <div className="app">
      {/* Render login page only if not logged in */}
      {!isLoggedIn ? (
        <div className="login-container">
          <h1>Login</h1>
          <form onSubmit={handleLoginSubmit}>
            <div className="input-container">
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                // Removed the "required" attribute
              />
            </div>
            <div className="input-container">
              <label>Password:</label>
              <input
                type="text"  // Changed from "password" to "text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // Removed the "required" attribute
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <p className="error">{error}</p>} {/* Show custom error */}
        </div>
      ) : (
        <div className="subjects-container">
          <h2>Enter Marks for Subjects</h2>
          <form className="marks-form">
            <div className="subject">
              <label>Chemistry:</label>
              <input
                type="number"
                name="chemistry"
                value={marks.chemistry}
                onChange={handleMarksChange}
              />
            </div>
            <div className="subject">
              <label>Maths:</label>
              <input
                type="number"
                name="maths"
                value={marks.maths}
                onChange={handleMarksChange}
              />
            </div>
            <div className="subject">
              <label>Physics:</label>
              <input
                type="number"
                name="physics"
                value={marks.physics}
                onChange={handleMarksChange}
              />
            </div>
            <div className="subject">
              <label>Computing:</label>
              <input
                type="number"
                name="computing"
                value={marks.computing}
                onChange={handleMarksChange}
              />
            </div>
            <div className="subject">
              <label>Electronics:</label>
              <input
                type="number"
                name="electronics"
                value={marks.electronics}
                onChange={handleMarksChange}
              />
            </div>
            <button type="button" onClick={handleAddMarks}>
              Add Marks
            </button>
          </form>

          {/* Display Submitted Marks with Username */}
          <h3>Marks for {username}:</h3>
          {submittedMarks.length > 0 ? (
            <ul>
              {submittedMarks.map((mark, index) => (
                <li key={index}>{mark}</li>
              ))}
            </ul>
          ) : (
            <p>No marks</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
