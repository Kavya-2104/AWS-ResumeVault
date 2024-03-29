// import React from 'react';
// import './App.css';
// import { Amplify } from 'aws-amplify';
// import { withAuthenticator, Authenticator } from '@aws-amplify/ui-react';
// import '@aws-amplify/ui-react/styles.css';
// import 'bootstrap/dist/css/bootstrap.css';
// import config from './amplifyconfiguration.json';
// import Button from 'react-bootstrap/Button';
// import UploadPDF from './UploadPdf';
// import Display from './Display';
// import ShareFilesButton from './ShareFilesButton'; 

// Amplify.configure(config);

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
        
//         <Authenticator className='App' authState='signIn'>
//           {({ signOut, user }) => (
//             <div>
//               <Button variant='info' onClick={signOut}><b>Sign out</b></Button>
//               <center>
//               <h1>AWS ResumeVault: Centralized Resume Repository</h1>
//               <h6>Services Used : AWS S3, IAM, DYNAMODB, LAMBDA, AMPLIFY, API GATEWAY</h6>
//               <hr/>
//               </center>
//               <div>
//                 {/* <p>Hey, {user.username}, welcome!</p> */}
//                 <UploadPDF username={user.username} />
//                 <br/>
//                 <div className="button-container">
//                    <ShareFilesButton username={user.username} />
//                    <Display username={user.username} />
//                 </div>
//               </div>
//             </div>
//           )}
//         </Authenticator>
//       </header>
//     </div>
//   );
// }

// export default withAuthenticator(App);
import React, { useState } from 'react';
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
  const [activeOption, setActiveOption] = useState(null);
  const [username, setUsername] = useState(null); // State to store username

  const handleOptionClick = (option) => {
    setActiveOption(option);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Authenticator className='App' authState='signIn'>
          {({ signOut, user }) => {
            // Set username when user is available
            if (user && user.username) {
              setUsername(user.username);
            }

            return (
              <div>
                <Button variant='info' onClick={signOut}><b>Sign out</b></Button>
                <center>
                  <h1>AWS ResumeVault: Centralized Resume Repository</h1>
                  <h6>Services Used : AWS S3, IAM, DYNAMODB, LAMBDA, AMPLIFY, API GATEWAY</h6>
                  <hr/>
                </center>
                <div>
                  <div className="options-container">
                    <Button onClick={() => handleOptionClick('uploadPDF')}>Upload PDF</Button>
                    <Button onClick={() => handleOptionClick('shareFiles')}>Share Files</Button>
                    <Button onClick={() => handleOptionClick('display')}>Display</Button>
                  </div>
                  <div className="active-option-container">
                    {activeOption === 'uploadPDF' && <UploadPDF username={username} />}
                    {activeOption === 'shareFiles' && <ShareFilesButton username={username} />}
                    {activeOption === 'display' && <Display username={username} />}
                  </div>
                </div>
              </div>
            );
          }}
        </Authenticator>
      </header>
    </div>
  );
}

export default withAuthenticator(App);
