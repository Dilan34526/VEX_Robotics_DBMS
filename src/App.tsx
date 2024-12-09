import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LaunchPage } from './components/LaunchPage';
import { ManageEventPage } from './components/ManageEventPage';
import "./App.css"
import { DebugPage } from './components/DebugPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchPage />} />
        <Route path="/manage-event" element={<ManageEventPage />} />
        <Route path="/debug" element={<DebugPage />} />
      </Routes>
    </Router>
  );
}

export default App;