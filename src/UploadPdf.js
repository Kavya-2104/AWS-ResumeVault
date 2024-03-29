import React, { useState } from 'react';
import './updf.css';
import Button from 'react-bootstrap/Button';

function UploadPDF({ username }) {
  const [showForm, setShowForm] = useState(false); // State to control form visibility
  const [studentID, setStudentID] = useState('');
  const [pdfFile, setPDFFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = () => {
    if (!studentID || !pdfFile) {
      setMessage('Please provide both Student ID and select a PDF file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
      const fileData = event.target.result;
      const params = {
        ID: studentID,
        fileName: pdfFile.name,
        fileData: fileData,
        username: username
      };
      invokeLambdaFunction(params);
    };
    reader.readAsDataURL(pdfFile);
  };

  const invokeLambdaFunction = (params) => {
    const apiGatewayUrl = 'https://2iwjhqhn3m.execute-api.us-east-1.amazonaws.com/meow';

    fetch(apiGatewayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Data uploaded successfully. Response: ", data);
      setMessage("Data uploaded successfully!");
    })
    .catch((error) => {
      console.error("Error uploading data: ", error);
      setMessage("Error uploading data!");
    });
  };

  return (
    <div>
      <center>
    <Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Show Form'}</Button></center>
    <div className="UploadPDF-container">
      {showForm && (
        <div>
          <h1 className="UploadPDF-title">Upload PDF</h1>
          <form className="UploadPDF-form">
            <label htmlFor="studentID" className="UploadPDF-label">Student ID:</label>
            <input 
              type="text" 
              id="studentID" 
              className="UploadPDF-input" 
              value={studentID} 
              onChange={(e) => setStudentID(e.target.value)} 
              required 
            />
            
            <label htmlFor="pdfFile" className="UploadPDF-label">Select PDF:</label>
            <input 
              type="file" 
              id="pdfFile" 
              className="UploadPDF-input" 
              accept=".pdf" 
              onChange={(e) => setPDFFile(e.target.files[0])} 
              required 
            />

            <button type="button" onClick={handleUpload} className="UploadPDF-button">Upload</button>
          </form>
          <div className="UploadPDF-message">{message}</div>
        </div>
      )}
    </div>
    </div>
  );
}

export default UploadPDF;
