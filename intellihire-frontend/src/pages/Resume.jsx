import { useState } from "react";
import axios from "axios";

export default function Resume() {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {

    if (!file) {
      setMessage("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(
        "http://localhost:8080/api/resume/upload",
        formData
      );

      setMessage("Resume uploaded successfully");
    } catch (err) {
      setMessage("Upload failed");
    }
  };

  return (
    <div className="container">

      <div className="card">

        <h2 className="title">Upload Your Resume</h2>
        <p className="subtitle">
          Upload your resume to generate personalized interview questions.
        </p>

        <div className="upload-box">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p style={{ marginTop: "10px", color: "#9ca3af" }}>
            PDF files only
          </p>
        </div>

        <button className="btn" onClick={handleUpload}>
          Upload Resume
        </button>

        {message && (
          <p style={{ marginTop: "15px", textAlign: "center" }}>
            {message}
          </p>
        )}

      </div>
    </div>
  );
}