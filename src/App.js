import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

// pages
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
     <Router>
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/character/:character_id" element={<Detail />}/>
        </Routes>
    </Router>
  );
}

export default App;
