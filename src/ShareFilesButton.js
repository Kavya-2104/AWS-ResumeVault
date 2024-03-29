import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function ShareFilesButton({ username }) {
  const [sharedLink, setSharedLink] = useState('');

  const handleShareFiles = async () => {
    try {
      // Construct the URL with the username parameter appended
      const s3DeployLink = `http://accessfiledeploy.s3-website-us-east-1.amazonaws.com/?username=${username}`;
      // Copy the shared link to the clipboard
      await navigator.clipboard.writeText(s3DeployLink);
      // Set the shared link state
      setSharedLink(s3DeployLink);
    } catch (error) {
      console.error('Error sharing files:', error);
    }
  };

  return (
    <div>
        <center>
      <Button variant="primary" onClick={handleShareFiles}>Generate Link </Button>
      {sharedLink && (
        <div>
          <h4>Your Shareable Link is Copied Successfully</h4>
        </div>
      )}
      </center>
      <div className="additional-info" style={{ marginTop: '20px', textAlign: 'center' }}>
  <p style={{ marginBottom: '10px' }}>Share your resume link with anyone you want by simply sending them the generated link.</p>
  <p style={{ marginBottom: '10px' }}>This link provides secure access to your resume stored in AWS ResumeVault.</p>
</div>
    </div>
  );
}

export default ShareFilesButton;
