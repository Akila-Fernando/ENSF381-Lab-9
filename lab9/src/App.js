import './App.css';
import Login from './Login.js';
import HousePricePredictor from './HousePricePredictor.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/predict" element={<HousePricePredictor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
