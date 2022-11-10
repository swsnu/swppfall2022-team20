import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/Signup";
import Register from "./pages/Register/Register";
import Main from "./pages/Main";
import UserProfile from "./pages/UserProfile";
import ItemReview from "./pages/ItemReview";
import ScrappedItem from "./pages/ScrappedItem";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/register" element={<Register />} />
            <Route path="/main" element={<Main />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/:id/review" element={<ItemReview />} />
            <Route path="/scrap" element={<ScrappedItem />} />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
