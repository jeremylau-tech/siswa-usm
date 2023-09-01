import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import MessagePage from "./component/MessagePage";
import UsersPage from "./component/UsersPage";
import InsertPage from "./component/InsertPage";

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="button-nav">
            <li>
              <Link to="/message" className="button-link">
                Test
              </Link>
            </li>
            <li>
              <Link to="/users" className="button-link">
                Users
              </Link>
            </li>
            <li>
              <Link to="/insert" className="button-link">
                Insert
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/message" element={<MessagePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/insert" element={<InsertPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
