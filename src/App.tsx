import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LaunchPage } from './components/LaunchPage';
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LaunchPage />} />
      </Routes>
    </Router>
  );
}

export default App;