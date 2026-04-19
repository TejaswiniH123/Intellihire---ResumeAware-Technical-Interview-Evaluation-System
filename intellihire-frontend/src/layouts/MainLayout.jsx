import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#111827",
        color: "white",
        padding: "20px"
      }}>
        <h2>IntelliHire</h2>

        <nav style={{ marginTop: "20px" }}>
          <Link to="/">Dashboard</Link><br/><br/>
          <Link to="/resume">Resume</Link><br/><br/>
          <Link to="/interview">Interview</Link><br/><br/>
          <Link to="/analytics">Analytics</Link>
        </nav>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "20px", background: "#f9fafb" }}>
        {children}
      </div>
    </div>
  );
}