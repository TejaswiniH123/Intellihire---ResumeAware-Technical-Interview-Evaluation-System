import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Resume from "./pages/Resume";
import Interview from "./pages/Interview";
import Analytics from "./pages/Analytics";
import InterviewConfig from "./pages/InterviewConfig";
import InterviewSession from "./pages/InterviewSession";
import InterviewResult from "./pages/InterviewResult";

const NotFound = () => <h2>Page Not Found</h2>;

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔥 MAIN LAYOUT WRAPPER */}
        <Route element={<Layout />}>

          <Route path="/" element={<Dashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/interview" element={<InterviewConfig />} />
<Route path="/interview/session" element={<InterviewSession />} />
<Route path="/interview/result" element={<InterviewResult />} />
          <Route path="/analytics" element={<Analytics />} />

        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;