import React from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import config from './amplifyconfiguration.json';
import Button from 'react-bootstrap/Button';
import UploadPDF from './UploadPdf';
import Display from './Display';
import ShareFilesButton from './ShareFilesButton'; 

Amplify.configure(config);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Authenticator className='App'>
          {({ signOut, user }) => (
            <div>
              <Button variant='info' onClick={signOut}><b>Sign out</b></Button>
              <center>
              <h1>AWS ResumeVault: Centralized Resume Repositor</h1>
              <h6>Services Used : AWS S3, IAM, DYNAMODB, LAMBDA, AMPLIFY, API GATEWAY</h6>
              <hr/>
              </center>
              <div>
                {/* <p>Hey, {user.username}, welcome!</p> */}
                <UploadPDF username={user.username} />
                <br />
                <div className="button-container">
                   <ShareFilesButton username={user.username} />
                   <Display username={user.username} />
                </div>
              </div>
            </div>
          )}
        </Authenticator>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
