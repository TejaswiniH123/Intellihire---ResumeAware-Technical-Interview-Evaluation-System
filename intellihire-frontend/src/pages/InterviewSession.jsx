import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function InterviewSession() {

  const { state } = useLocation();
  const mode = state?.mode || "WRITTEN";

  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [results, setResults] = useState([]);
  const [listening, setListening] = useState(false);
  const [startTime, setStartTime] = useState(null);
const [endTime, setEndTime] = useState(null);
const [sessionId, setSessionId] = useState(null);

  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  const duration = (endTime - startTime)

  // 🎤 SETUP SPEECH RECOGNITION
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        let transcript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setAnswer(prev => prev + " " + transcript);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Fetch questions
  useEffect(() => {
    axios.get("http://localhost:8080/api/interview/start")
      .then(res => setQuestions(res.data))
      .catch(err => console.log(err));
  }, []);

  // 🎤 START MIC
const startListening = () => {
  if (listening) return; // ✅ prevents crash
  recognitionRef.current?.start();
  setListening(true);
};

  // 🛑 STOP MIC
  const stopListening = () => {
    setEndTime(Date.now());
    recognitionRef.current?.stop();
    setListening(false);
  };

  // SUBMIT ANSWER
const submit = async () => {

  try {

    // 🧠 WORD COUNT
    const words = answer.trim().split(/\s+/).length;

    // 🧠 SAFE TIME CALCULATION
    const duration = (endTime && startTime)
      ? (endTime - startTime) / 60000
      : 0;

    const wpm = duration > 0 ? Math.round(words / duration) : 0;

    // 🧠 FILLER WORDS
    const fillers = ["um", "uh", "like", "you know"];
    let fillerCount = 0;

    fillers.forEach(f => {
      const regex = new RegExp(`\\b${f}\\b`, "gi");
      const matches = answer.match(regex);
      if (matches) fillerCount += matches.length;
    });

    const fillerPenalty = Math.min(fillerCount * 5, 50);

    // 🧠 CONFIDENCE SCORE
    let confidence = 100 - fillerPenalty;

    if (wpm < 80) confidence -= 20;
    if (wpm > 160) confidence -= 10;

    // 🔥 API CALL
    const res = await axios.post(
      "http://localhost:8080/api/evaluate",
      null,
      {
        params: {
          answer,
          keywords: "java,oop",
          sessionId: sessionId   // ✅ FIXED
        }
      }
    );

    // ✅ STORE SESSION ID (VERY IMPORTANT)
    if (!sessionId) {
      setSessionId(res.data.sessionId);
    }

    const newResult = {
      question: questions[index].questionText,
      answer,
      wpm,
      fillerCount,
      confidence,
      ...res.data
    };

    const updatedResults = [...results, newResult];
    setResults(updatedResults);

    setAnswer("");

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      navigate("/interview/result", { state: { results: updatedResults } });
    }

  } catch (err) {
    console.log("Submit error:", err);
  }
};

  if (!questions.length) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>

      <h2>
        Q{index + 1}. {questions[index].questionText}
      </h2>

      {/* ✅ WRITTEN MODE */}
      {(mode === "WRITTEN" || mode === "MIXED") && (
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows="5"
          placeholder="Type your answer..."
          style={{
            width: "100%",
            marginTop: "20px",
            padding: "10px"
          }}
        />
      )}

      {/* ✅ ORAL MODE */}
      {(mode === "ORAL" || mode === "MIXED") && (
        <div style={{ marginTop: "20px" }}>

          <button
            onClick={startListening}
            style={{
              padding: "12px",
              marginRight: "10px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "8px"
            }}
          >
            🎤 Start
          </button>

          <button
            onClick={stopListening}
            style={{
              padding: "12px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "8px"
            }}
          >
            Stop
          </button>

          <p style={{ marginTop: "10px" }}>
            {listening ? "Listening..." : "Mic stopped"}
          </p>

          <div style={{
            marginTop: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px"
          }}>
            {answer || "Your speech will appear here..."}
          </div>

        </div>
      )}

      <button
        onClick={submit}
        style={{
          marginTop: "20px",
          padding: "12px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px"
        }}
      >
        Submit
      </button>

    </div>
  );
}