import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home.jsx";
import Book from "./routes/Book.jsx";
import Taro from "./routes/Taro.jsx";
import FortuneCookie from "./routes/FortuneCookie.jsx";
import LuckyNumber from "./routes/LuckyNumber.jsx";
import Weather from "./routes/Weather.jsx";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/taro" element={<Taro />} />
        <Route path="/fortune" element={<FortuneCookie />} />
        <Route path="/lucky" element={<LuckyNumber />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/result/:id" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
