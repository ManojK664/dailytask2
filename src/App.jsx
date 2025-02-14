import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [marks, setMarks] = useState({
    chemistry: '',
    maths: '',
    physics: '',
    computing: '',
    electronics: ''
  });
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submittedMarks, setSubmittedMarks] = useState([]);

  // Load data from localStorage on component mount (if any)
  useEffect(() => {
    const storedMarks = JSON.parse(localStorage.getItem('submittedMarks'));
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const storedStudentName = localStorage.getItem('studentName');

    if (storedMarks) setSubmittedMarks(storedMarks);
    if (storedUsername) setUsername(storedUsername);
    if (storedPassword) setPassword(storedPassword);
    if (storedStudentName) setStudentName(storedStudentName);

    setMarks({
      chemistry: '',
      maths: '',
      physics: '',
      computing: '',
      electronics: ''
    });
  }, []);

  // Save submittedMarks to localStorage whenever it changes
  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('submittedMarks', JSON.stringify(submittedMarks));
    }
  }, [submittedMarks, isLoggedIn]);

  // Save username and password to localStorage on login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setError('Both username and password are required.');
    } else {
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      setError('');
      setIsLoggedIn(true);
    }
  };

  const handleMarksChange = (e) => {
    const { name, value } = e.target;
    setMarks({ ...marks, [name]: value });
  };

  const handleAddMarks = (e) => {
    e.preventDefault();
    if (studentName.trim() === '') {
      setError('Student name is required.');
      return;
    }

    const marksArray = Object.entries(marks).map(([subject, mark]) => {
      return `${subject.charAt(0).toUpperCase() + subject.slice(1)}: ${mark.trim() === '' ? 0 : mark}`;
    });

    const newMarks = { studentName, marks: marksArray };
    const updatedMarks = [...submittedMarks, newMarks];
    setSubmittedMarks(updatedMarks);

    setMarks({
      chemistry: '',
      maths: '',
      physics: '',
      computing: '',
      electronics: ''
    });
  };

  // Logout functionality
  const handleLogout = () => {
    // Clear all stored data from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('submittedMarks');
    localStorage.removeItem('studentName'); // Removing studentName as well
    
    // Reset all React states to clear session data
    setIsLoggedIn(false); // Logout user
    setUsername(''); // Reset username
    setPassword(''); // Reset password
    setStudentName(''); // Reset student name
    setMarks({
      chemistry: '',
      maths: '',
      physics: '',
      computing: '',
      electronics: ''
    }); // Reset all marks
    setSubmittedMarks([]); // Clear submitted marks array
    
    // After logout, the page will load as fresh, showing the login page again.
  };

  return (
    <div className="app">
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
              />
            </div>
            <div className="input-container">
              <label>Password:</label>
              <input
                type="text"  // Changed from "password" to "text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <div className="subjects-container">
          <h2>Enter Marks for Subjects</h2>
          <form className="marks-form">
            <div className="input-container">
              <label>Student Name:</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>
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

          {/* Display Submitted Marks */}
          <h3>Marks for {studentName || username}:</h3>
          {submittedMarks.length > 0 ? (
            <ul>
              {submittedMarks.map((entry, index) => (
                <li key={index}>
                  <strong>{entry.studentName}:</strong>
                  <ul>
                    {entry.marks.map((mark, idx) => (
                      <li key={idx}>{mark}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No marks</p>
          )}

          {/* Logout button */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
