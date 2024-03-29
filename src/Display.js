// Display.js
import React, {useState} from 'react';
import './display.css';
import Button from 'react-bootstrap/Button';

const API_ENDPOINT = "https://2iwjhqhn3m.execute-api.us-east-1.amazonaws.com/meow";

function Display({ username }) {
  const [profileData, setProfileData] = useState([]);
  const [error, setError] = useState(null);

  const handleGetProfile = () => {
    fetch(API_ENDPOINT)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Filter files based on the current user's username
        const filteredData = data.filter(profile => profile.username === username);
        setProfileData(filteredData);
        setError(null); // Reset error state if request is successful
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setError(error.message); // Set error state with the error message
      });
  };

  return (
    <div>
    <center><Button variant='info' id="getprofile" onClick={handleGetProfile}>View all the Student Resumes</Button></center>  
      <br />
      <br/>
      {error && <div>Error: {error}</div>}
      <div className="card-container">
        {profileData.map(profile => (
          <div key={profile.ID} className="card">
            <div className="card-header">Student ID: {profile.ID}</div>
            <div className="card-body">
              <p>Uploaded Time: {profile.uploadedAt}</p>
              <a href={profile.s3Location}>{profile.fileId}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Display;
