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
      <Button variant="primary" onClick={handleShareFiles}>Share Files</Button>
      {sharedLink && (
        <div>
          <h3>Link Copied Successfully</h3>
        </div>
      )}
      </center>
    </div>
  );
}

export default ShareFilesButton;
