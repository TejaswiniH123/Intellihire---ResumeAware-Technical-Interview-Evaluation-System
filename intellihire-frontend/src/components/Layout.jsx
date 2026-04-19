import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>

      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#111827",
        color: "white",
        padding: "20px"
      }}>
        <h2 style={{ marginBottom: "30px" }}>IntelliHire</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
          <Link to="/resume" style={{ color: "white", textDecoration: "none" }}>My Resume</Link>
          <Link to="/interview" style={{ color: "white", textDecoration: "none" }}>New Interview</Link>
          <Link to="/analytics" style={{ color: "white", textDecoration: "none" }}>Analytics</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: "#f3f4f6", padding: "20px" }}>
        <Outlet />
      </div>

    </div>
  );
}