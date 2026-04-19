import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InterviewConfig() {

  const [mode, setMode] = useState("MIXED");
  const navigate = useNavigate();

  const startInterview = () => {
    navigate("/interview/session", { state: { mode } });
  };

  return (
    <div style={styles.container}>

      <h1>Configure Interview</h1>
      <p>Set up your next practice session</p>

      <div style={styles.card}>

        <h3>Interview Format</h3>

        <div style={styles.options}>
          {["ORAL", "WRITTEN", "MIXED"].map((m) => (
            <div
              key={m}
              onClick={() => setMode(m)}
              style={{
                ...styles.option,
                border: mode === m ? "2px solid #2563eb" : "1px solid #ccc"
              }}
            >
              {m}
            </div>
          ))}
        </div>

        <button style={styles.button} onClick={startInterview}>
          Start Interview
        </button>

      </div>
    </div>
  );
}

const styles = {
  container: { padding: "30px" },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px"
  },
  options: {
    display: "flex",
    gap: "10px",
    margin: "20px 0"
  },
  option: {
    padding: "20px",
    borderRadius: "10px",
    cursor: "pointer"
  },
  button: {
    padding: "12px",
    width: "100%",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px"
  }
};