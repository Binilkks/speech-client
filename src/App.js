import { useEffect, useState } from 'react';
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
  },[]);
  console.log('post', post);
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
