import React, { useEffect, useState } from 'react';
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App() {
  const baseURL = "https://us-central1-my-tts-project-399119.cloudfunctions.net/func-speech-server/speech";
  const [post, setPost] = useState(null);

  useEffect(() => {
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
    loadBridge();
  },[]);

   const initBridge = () => {
            bridge.onConnect = function () { log("Ready"); };
            bridge.on('bridge_client_disconnect', function(clientName) { log("Peer disconnected: " + clientName) });
            bridge.on('bridge_client_connect', function(clientName){ log("Peer connected: " + clientName)});
            applyEventListener();
   }

  function applyEventListener() {
            bridge.on('mySampleEvent', onEvent);
        }
  
  const loadBridge = () => {
    console.log('loadBridge function called');
    const bridgeNode = document.createElement('script');
    bridgeNode.type = 'text/javascript';
    bridgeNode.async = true;
    bridgeNode.src = 'https://localhost:20180/public/bridge.js';
    bridgeNode.addEventListener('load', () => {
      console.log('Web socket connection is established');
      subsribeEvents();
    });
    bridgeNode.addEventListener('error', () => {
      console.log('Web socket connection is failed');
      setTimeout(loadBridge, 10000);
      document.head.removeChild(bridgeNode);
    });
    document.head.appendChild(bridgeNode);
  }

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
