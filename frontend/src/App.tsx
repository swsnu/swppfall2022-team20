import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Main from "./containers/Main/Main";
import UserProfile from "./containers/UserProfile/UserProfile";
import ItemReview from "./containers/ItemReview/ItemReview";
import ScrappedItem from "./containers/ScrappedItem/ScrappedItem";
import "./App.css";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Login />} />
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
