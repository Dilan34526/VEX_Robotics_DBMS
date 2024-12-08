import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { VexRoboticsLayout } from './components/VexRoboticsLayout';
import { ManageEventPage } from './components/ManageEventPage';
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VexRoboticsLayout />} />
        <Route path="/next-page" element={<ManageEventPage />} />
      </Routes>
    </Router>
  );
}

export default App;