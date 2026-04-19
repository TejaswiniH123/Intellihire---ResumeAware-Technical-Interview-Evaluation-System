import { useState } from "react";

export default function SpeechRecorder({ onResult }) {
  const [listening, setListening] = useState(false);

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;

  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = 0; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    onResult(transcript);
  };

  const start = () => {
    setListening(true);
    recognition.start();
  };

  const stop = () => {
    setListening(false);
    recognition.stop();
  };

  return (
    <div>
      <button onClick={start}>Start Speaking</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}