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
            "Platinum Card from American Express",
            "The annual fee is 695 dollars.",
          "The Platinum Card automatically earns 1 Membership Rewards point per eligible dollar spent",
          "You can also earn the following rewards",
          "5 Membership Rewards points per dollar on up to 500,000 dollars per calendar year on flights when you book directly with airlines or through American Express Travel",
          "Flights purchased from online travel booking sites, vacation packages and charter flights earn 1 point per dollar",
          "5 Membership Rewards points per dollar on eligible prepaid hotel purchases and prepaid flight + hotel packages booked through American Express Travel, including Fine Hotels & Resorts and The Hotel Collection.",
          "You can earn 100,000 Membership Rewards points after you make eligible purchases totaling 6,000 dollars or more on the Card in the first 6 months starting from the date your account is upgraded",
          "You will receive a new Platinum Card, which will replace your current Card. Your account number will stay the same",
          "If you paid an annual fee for your current Card, you will receive a prorated refund for that fee",
          "The additional Fees, Limits, and Pay over time features will work like they do on your current card",
          "Do you have any questions?",
          "Do you want to upgrade to the Platinum Card from American Express?"
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
