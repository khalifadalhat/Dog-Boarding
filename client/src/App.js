import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DogDataProvider } from "./context/DogDataContext";
import {RegistrationProvider} from './context/RegistrationContext'
import { DogRegistration } from "./pages/dogInfoPage/DogRegistration";
import DogInfo from "./pages/dogInfoPage/DogInfo";
import { DogInfoScreen } from "./pages/dogInfoPage/DogInfoScreen";
import { DogAdditionalInfo } from "./pages/dogInfoPage/AdditionalInfo";
import SignUpForm from "./auth/signUp/SignUpForm";
import LoginPage from "./auth/Login/Login";
import { DetailsPage } from "./pages/dogInfoPage/DetailsPage";
import { AdditionalDetails } from "./pages/dogInfoPage/AdditionalDetails";

const App = () => {
  return (
    <Router>
      <RegistrationProvider>
        <DogDataProvider>
          <Routes>
            <Route path="/" element={<SignUpForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dog-registration" element={<DogRegistration />} />
            <Route path="/dog-info" element={<DogInfo />} />
            <Route path="/dog-info-screen" element={<DogInfoScreen />} />
            <Route path="/additional-info" element={<DogAdditionalInfo />} />
            <Route path="/details-page" element={<DetailsPage />} />
            <Route path="/additional-details" element={<AdditionalDetails />} />
          </Routes>
        </DogDataProvider>
      </RegistrationProvider>
    </Router>
  );
};

export default App;
