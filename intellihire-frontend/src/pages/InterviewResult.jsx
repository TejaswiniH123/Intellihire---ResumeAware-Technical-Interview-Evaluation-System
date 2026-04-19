import { useLocation } from "react-router-dom";

export default function InterviewResult() {

  const { state } = useLocation();
  const results = state?.results || [];

  const avg =
    results.reduce((a, b) => a + b.finalScore, 0) / (results.length || 1);

  const getColor = (score) => {
    if (score >= 75) return "green";
    if (score >= 50) return "yellow";
    return "red";
  };

  return (
    <div style={{ padding: "30px" }}>

      <h1>Session Results</h1>

      {/* 🔥 OVERALL */}
      <div className="result-card">
        <h2 className="score-badge">{Math.round(avg)}%</h2>
        <p>Final Score</p>
      </div>

      <h3>Question Breakdown</h3>

      {results.map((r, i) => (
        <div key={i} className="result-card">

          <h4>{r.question}</h4>

          <p><b>Your Answer:</b> {r.answer}</p>

          {/* 🔥 METRICS */}

          <div>
            <p>Keyword Score ({r.keywordScore}%)</p>
            <div className="progress-container">
              <div
                className={`progress-bar ${getColor(r.keywordScore)}`}
                style={{ width: `${r.keywordScore}%` }}
              ></div>
            </div>
          </div>

          <div>
            <p>Length Score ({r.lengthScore}%)</p>
            <div className="progress-container">
              <div
                className={`progress-bar ${getColor(r.lengthScore)}`}
                style={{ width: `${r.lengthScore}%` }}
              ></div>
            </div>
          </div>

          <div>
            <p>Confidence ({r.confidence}%)</p>
            <div className="progress-container">
              <div
                className={`progress-bar ${getColor(r.confidence)}`}
                style={{ width: `${r.confidence}%` }}
              ></div>
            </div>
          </div>

          <p style={{ marginTop: "10px" }}>
            Speaking Speed: <b>{r.wpm} WPM</b>
          </p>

          {r.fillerCount > 0 && (
            <p style={{ color: "red" }}>
              ⚠ Filler words used: {r.fillerCount}
            </p>
          )}

        </div>
      ))}

    </div>
  );
}