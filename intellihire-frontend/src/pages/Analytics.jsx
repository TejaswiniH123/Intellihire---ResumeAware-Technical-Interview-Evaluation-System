import { useEffect, useState } from "react";
import API from "../services/api";

export default function Analytics() {

  const [sessions, setSessions] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    API.get("/history/sessions")
      .then(res => setSessions(res.data))
      .catch(err => console.log(err));
  }, []);

  const loadDetails = async (id) => {
    const res = await API.get(`/history/session/${id}`);
    setDetails(res.data);
  };

  return (
    <div className="container">

      <h1>Interview History</h1>

      {sessions.map(s => (
        <div key={s.sessionId} className="card"
             onClick={() => loadDetails(s.sessionId)}
             style={{ cursor: "pointer", marginBottom: "10px" }}>

          <p><b>Session #{s.sessionId}</b></p>
          <p>Score: {Math.round(s.avgScore)}%</p>

        </div>
      ))}

      {details.length > 0 && (
        <div style={{ marginTop: "20px" }}>

          <h2>Session Details</h2>

          {details.map((d, i) => (
            <div key={i} className="card">

              <p><b>Answer:</b> {d.answerText}</p>
              <p>Score: {d.finalScore}%</p>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}