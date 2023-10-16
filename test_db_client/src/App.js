import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MessagePage from "./component/MessagePage";
import UsersPage from "./component/UsersPage";
import InsertPage from "./component/InsertPage";
import Login from "./component/Login";
// Import new page down here (Follow this format to import new page)
import NewPageTest from "./component/NewPageTest";

// Insert new import statement here
import LandingPage from "./component/LandingPage";
import BaucarFormPage from './component/forms/BaucarFormPage'; 
import WangFormPage from './component/forms/WangFormPage'; 
import KhairatFormPage from './component/forms/KhairatFormPage'; 
import PerantiFormPage from './component/forms/PerantiFormPage'; 
import NavBar from "./component/NavBar";
import TermsConditions from "./component/TermsCondition";
import ApplicationListPage from "./component/admin/application/ApplicationListPage";
import EvaluationPage from "./component/admin/evaluation/EvaluationPage";
import AnalyticDashboard from "./component/admin/AnalyticDashboard";
import AdminDashboard from "./component/admin/AdminDashboard";
import UploadPage from "./component/UploadPage";
import AnalyticGraph from "./component/admin/AnalyticGraph";
import TestAllFunction from "./component/TestAllFunction";
import WelcomePage from "./component/WelcomePage";
import VendorListPage from "./component/admin/vendor/VendorListPage";
import CouponPage from "./component/CouponPage";
import FoodApplication from "./component/FoodApplication";
import HistoryFood from "./component/HistoryFood";

// Pay attention to this function
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/message" element={<MessagePage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/insert" element={<InsertPage />} />

           {/* Add new page down here as new route (Use the below format) */}
          <Route path="/newpagetest" element={<NewPageTest />} />
          <Route path="/ApplicationListPage" element={<ApplicationListPage />} />
          <Route path="/TermsConditions" element={<TermsConditions />} />
          <Route path="/EvaluationPage" element={<EvaluationPage />} />
          <Route path="/AnalyticDashboard" element={<AnalyticDashboard />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/UploadPage" element={<UploadPage />} />
          <Route path="/AnalyticGraph" element={<AnalyticGraph />} />
          <Route path="/TestAllFunction" element={<TestAllFunction />} />
          <Route path="/VendorListPage" element={<VendorListPage />} />
          <Route path="/CouponPage" element={<CouponPage />} />
          <Route path="/FoodApplication" element={<FoodApplication />} />
          <Route path="/HistoryFood" element={<HistoryFood />} />

          {/* Add new Landing Page route */}
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/WelcomePage" element={<WelcomePage />} />

          {/* Add new Landing Page route */}
          <Route path="/BaucarFormPage" element={<BaucarFormPage />} />
          <Route path="/KhairatFormPage" element={<KhairatFormPage />} />
          <Route path="/WangFormPage" element={<WangFormPage />} />
          <Route path="/PerantiFormPage" element={<PerantiFormPage />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
