import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {

  const [tab, setTab] = useState("overview");
  const [data, setData] = useState([]);
  const [skillGap, setSkillGap] = useState(null);

  // ================= FETCH DATA =================
  useEffect(() => {

    // Skill Gap API
    axios.get("http://localhost:8080/api/analytics/skill-gap")
      .then(res => {
        console.log("SkillGap:", res.data);
        setSkillGap(res.data || {});
      })
      .catch(err => {
        console.log("SkillGap error:", err);
        setSkillGap({});
      });

    // Performance API
    axios.get("http://localhost:8080/api/analytics/performance")
      .then(res => {
        console.log("Performance Data:", res.data);

        const safeData = (res.data || []).map(item => ({
          name: item.name || "Unknown",
          score: Number(item.score) || 0
        }));

        setData(safeData);
      })
      .catch(err => {
        console.log("Performance error:", err);
        setData([]);
      });

  }, []);

  // ================= STYLES =================
  const card = {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  };

  const tabBtn = (active) => ({
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: active ? "#2563eb" : "#e5e7eb",
    color: active ? "white" : "#111",
    fontWeight: "500"
  });

  // ================= UI =================
  return (
    <div style={{ padding: "20px" }}>

      <h1 style={{ marginBottom: "20px" }}>Analytics & Insights</h1>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button style={tabBtn(tab === "overview")} onClick={() => setTab("overview")}>Overview</button>
        <button style={tabBtn(tab === "performance")} onClick={() => setTab("performance")}>Performance</button>
        <button style={tabBtn(tab === "oral")} onClick={() => setTab("oral")}>Oral</button>
        <button style={tabBtn(tab === "written")} onClick={() => setTab("written")}>Written</button>
      </div>

      {/* ================= OVERVIEW ================= */}
      {tab === "overview" && (
        <div style={card}>
          <h3>Overview</h3>
          <p>Welcome to IntelliHire Dashboard 🚀</p>
        </div>
      )}

      {/* ================= PERFORMANCE ================= */}
      {tab === "performance" && (
        <>
          <div style={card}>
            <h3>Domain Expertise</h3>

            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p>No performance data available</p>
            )}
          </div>

          {/* Skill Gap */}
          {skillGap && (
            <div style={{ ...card, marginTop: "20px" }}>
              <h3>Focus Areas</h3>

              <p>
                Weakest Domain:{" "}
                <strong style={{ color: "#2563eb" }}>
                  {skillGap?.weakestDomain || "No Data"}
                </strong>
              </p>

              <p style={{ marginTop: "10px", color: "#475569" }}>
                {skillGap?.recommendation || "No recommendation yet"}
              </p>

              <div style={{ marginTop: "15px" }}>
                {Object.entries(skillGap?.averageScores || {}).map(([domain, score]) => (
                  <span key={domain} style={{
                    marginRight: "10px",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    background:
                      score < 60 ? "#fee2e2" :
                      score < 75 ? "#fef3c7" :
                      "#dcfce7",
                    color:
                      score < 60 ? "#dc2626" :
                      score < 75 ? "#d97706" :
                      "#16a34a",
                    fontSize: "12px"
                  }}>
                    {domain} ({Math.round(score)}%)
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* ================= ORAL ================= */}
      {tab === "oral" && (
        <div style={card}>
          <h3>Oral Analytics</h3>
          <p>Speaking speed, confidence, filler analysis will appear here.</p>
        </div>
      )}

      {/* ================= WRITTEN ================= */}
      {tab === "written" && (
        <div style={card}>
          <h3>Written Analytics</h3>
          <p>Keyword scoring, structure evaluation will appear here.</p>
        </div>
      )}

    </div>
  );
}