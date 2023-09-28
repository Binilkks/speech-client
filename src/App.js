import React, { useEffect, useState } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {
  const baseURL = "https://us-central1-my-tts-project-399119.cloudfunctions.net/func-speech-server/speech";
  const [post, setPost] = useState(null);

  useEffect(() => {
    addDesktopBridge();
    axios
    .post(baseURL, {
        callerId: "1234",
        offerId: "SG1234",
        content: [
            "Annual Percentage Rate (APR) for Pay Over Time Features",
            "21.24% to 29.24%, based on your creditworthiness and other factors as determined at the time of account opening"
        ]
    })
    .then((response) => {
      setPost(response.data);
    });
  },[]);

   const addDesktopBridge = () => {
    window.Bridge_CurrentADSID = 'test';
    window.Bridge_ClientName = 'testClient';
    const bridgeNode = document.createElement('script');
    bridgeNode.src = 'https://localhost:20180/public/bridge.js';
    bridgeNode.type = 'text/javascript';
    bridgeNode.async = true;
    bridgeNode.addEventListener('load', () => {
      if (!window.bridge) {
        console.log('window.bridge is undefined. Something went wrong');
        return;
      }
      if (window.bridge.connected) {
        console.log('window.bridge connected');
        subsribeEvents();
      }
      window.bridge.onConnect = () => {
        console.log('window.bridge onConnect');
        subsribeEvents();
      };
      window.bridge.onDisconnect = () => {
        console.log('window.bridge onDisconnect');
      };
    });
    bridgeNode.addEventListener('error', () => {
      setTimeout(addDesktopBridge, 10000);
      document.head.removeChild(bridgeNode);
    });
    document.head.appendChild(bridgeNode);
  };
  
  const subsribeEvents = () => {
    if(window.bridge) {
      console.log('window.bridge is defined');
      window.bridge.on('mySampleEvent', (eventData) => {
        console.log('EventData', eventData);
      })
    } else {
      console.log('window.bridge is undefined');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          {JSON.stringify(post)}
        </p>
      </header>
    </div>
  );
}

export default App;
