import { useState, useEffect } from "react";
import axios from "axios";

export default function Interview() {

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [evaluation, setEvaluation] = useState(null);

  // Fetch questions
  useEffect(() => {
    axios.get("http://localhost:8080/api/interview/start")
      .then(res => {
        console.log("Questions:", res.data);
        setQuestions(res.data || []);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = async () => {

    if (!answer) {
      setMessage("Please write an answer");
      return;
    }

    setLoading(true);

    try {
const res = await axios.post("http://localhost:8080/api/evaluate", null, {
  params: {
    answer: answer,
    keywords: "java,oop"
  }
});

setEvaluation(res.data);

      setMessage("Answer submitted");

      setAnswer("");

      // Move to next question
      setCurrentIndex(prev => prev + 1);

    } catch (err) {
      console.log(err);
      setMessage("Error submitting answer");
    }

    setLoading(false);
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="container">

      <div className="card">

        <h2 className="title">Technical Interview</h2>

        {currentQuestion ? (
          <>
            <p style={{ fontWeight: "500", marginBottom: "15px" }}>
              Q{currentIndex + 1}. {currentQuestion.question_text}
            </p>

            <textarea
              rows="5"
              placeholder="Write your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                marginBottom: "15px"
              }}
            />

            <button className="btn" onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit Answer"}
            </button>

            {evaluation && (
  <div style={{
    marginTop: "20px",
    padding: "15px",
    borderRadius: "10px",
    background: "#f1f5f9"
  }}>
    <h4>Evaluation Result</h4>

    <p>Score: {evaluation.finalScore}</p>
    <p>Keyword Score: {evaluation.keywordScore}</p>
    <p>Length Score: {evaluation.lengthScore}</p>
    <p>Structure Score: {evaluation.structureScore}</p>
  </div>
)}

            {message && (
              <p style={{ marginTop: "10px" }}>{message}</p>
            )}
          </>
        ) : (
          <p>No more questions 🎉</p>
        )}

      </div>
    </div>
  );
}