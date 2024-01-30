
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import MessagePage from "./component/MessagePage";
import UsersPage from "./component/UsersPage";
import InsertPage from "./component/InsertPage";
import Login from "./component/authentication/Login";
import LoginSSO from "./component/authentication/LoginSSO";

// Import new page down here (Follow this format to import new page)
import NewPageTest from "./component/NewPageTest";
import Makanan from "./component/MakananPage";
import MaintainancePage from "./component/MaintainancePage";

// Insert new import statement here
import LandingPage from "./component/LandingPage";
import BaucarFormPage from './component/forms/BaucarFormPage';
import WangFormPage from './component/forms/WangFormPage';
import WangNextPage from './component/forms/WangNextPage';
import KhairatFormPage from './component/forms/KhairatFormPage';
import KhairatNextPage from './component/forms/KhairatNextPage';
import PerantiFormPage from './component/forms/PerantiFormPage';
import PerantiNextPage from './component/forms/PerantiNextPage';
import NavBar from "./component/NavBar";
import TermsConditions from "./component/TermsCondition";
import ApplicationListPage from "./component/admin/application/ApplicationListPage";
import EvaluationPage from "./component/admin/evaluation/EvaluationPage";
import BhepaEvaluationPage from "./component/admin/evaluation/BhepaEvaluationPage";
import ArchivePage from "./component/admin/evaluation/ArchivePage";
import AnalyticDashboard from "./component/admin/AnalyticDashboard";
import AdminDashboard from "./component/admin/AdminDashboard";
import UploadPage from "./component/UploadPage";
import AnalyticGraph from "./component/admin/AnalyticGraph";
import TestAllFunction from "./component/TestAllFunction";
import WelcomePage from "./component/WelcomePage";
import VendorListPage from "./component/admin/vendor/VendorListPage";
import CouponPage from "./component/CouponPage";

import FoodApplication from "./component/FoodApplication";
import WangIhsanApplication from "./component/WangIhsanApplication";

import HistoryFood from "./component/HistoryFood";
import InvoicePage from "./component/admin/vendor/InvoicePage";
import ClaimedInvoicePage from "./component/admin/vendor/record/ClaimedInvoicePage";
import UsedCouponList from "./component/admin/vendor/record/UsedCouponList";
import CouponPublicView from "./component/public/CouponPublicView";
import CheckBackend from "./component/CheckBackend";

// Pay attention to this function


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<MaintainancePage />} />

          {/* <Route path="/" element={<WelcomePage />} /> */}
          {/* <Route path="/message" element={<MessagePage />} /> */}
          <Route path="/makanan" element={<Makanan />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/insert" element={<InsertPage />} />

          {/* Add new page down here as new route (Use the below format) */}
          <Route path="/newpagetest" element={<NewPageTest />} />
          <Route path="/ApplicationListPage" element={<ApplicationListPage />} />
          <Route path="/TermsConditions" element={<TermsConditions />} />
          <Route path="/EvaluationPage" element={<EvaluationPage />} />
          <Route path="/BhepaEvaluationPage" element={<BhepaEvaluationPage />} />
          <Route path="/ArchivePage" element={<ArchivePage />} />
          <Route path="/AnalyticDashboard" element={<AnalyticDashboard />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/UploadPage" element={<UploadPage />} />
          <Route path="/AnalyticGraph" element={<AnalyticGraph />} />
          <Route path="/TestAllFunction" element={<TestAllFunction />} />
          <Route path="/VendorListPage" element={<VendorListPage />} />
          <Route path="/CouponPage" element={<CouponPage />} />

          <Route path="/FoodApplication" element={<FoodApplication />} />
          <Route path="/WangIhsanApplication" element={<WangIhsanApplication />} />

          <Route path="/HistoryFood" element={<HistoryFood />} />
          <Route path="/InvoicePage" element={<InvoicePage />} />
          <Route path="/ClaimedInvoicePage" element={<ClaimedInvoicePage />} />
          <Route path="/UsedCouponList" element={<UsedCouponList />} />
          <Route path="/CouponPublicView/:vendorId" element={<CouponPublicView />} />
          <Route path="/CheckBackend" element={<CheckBackend />} />



          {/* Add new Landing Page route */}
          <Route path="/LandingPage" element={<LandingPage />} />
          <Route path="/WelcomePage" element={<WelcomePage />} />

          {/* Add new Landing Page route */}
          <Route path="/Baucar_FormPage" element={<BaucarFormPage />} />
          <Route path="/Khairat_FormPage" element={<KhairatFormPage />} />
          <Route path="/Khairat_NextPage" element={<KhairatNextPage />} />
          <Route path="/Wang_FormPage" element={<WangFormPage />} />
          <Route path="/Wang_NextPage" element={<WangNextPage />} />
          <Route path="/Peranti_FormPage" element={<PerantiFormPage />} />
          <Route path="/Peranti_NextPage" element={<PerantiNextPage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/LoginSSO" element={<LoginSSO />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
