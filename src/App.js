import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Cities from './components/cities/Cities';
import City from './components/city/City';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/cities/1" />} />
            <Route path="/cities" element={<Navigate to="/cities/1" />} />
            <Route path="/cities/:page" element={<Cities/>} />
            <Route path="/cities/city/:id" element={<City/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
