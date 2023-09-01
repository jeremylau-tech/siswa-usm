import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import MessagePage from "./component/MessagePage";
import UsersPage from "./component/UsersPage";
import InsertPage from "./component/InsertPage";

// Import new page down here (Follow this format to import new page)
import NewPageTest from "./component/NewPageTest";

// Insert new import statement here



// Ignore this function for now 
function NavigationMenu() {
  const location = useLocation();

  const allowedRoutes = ["/", "/insert", "/message", "/users"];

  const shouldShowNavigation = allowedRoutes.includes(location.pathname);

  return shouldShowNavigation ? (
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
  ) : null;
}

// Pay attention to this function
function App() {
  return (
    <Router>
      <div className="App">
        <NavigationMenu />
        <Routes>
          <Route path="/message" element={<MessagePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/insert" element={<InsertPage />} />

           {/* Add new page down here as new route (Use the below format) */}
          <Route path="/newpagetest" element={<NewPageTest />} />

          {/* Add new route here */}
          

        </Routes>
      </div>
    </Router>
  );
}

export default App;
