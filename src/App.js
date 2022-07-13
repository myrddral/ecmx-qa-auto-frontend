import "./App.css";
import "./buttons.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from "./components/modal/Modal";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/HomePage";
import Sell from "./components/sell/Sell";
import Buy from "./components/buy/Buy";
import Join from "./components/join/Join";
import Support from "./components/support/Support";
import ChooseInspector from "./components/sell/ChooseInspector";
import EmailSent from "./components/sell/EmailSent";
import OffersArriving from "./components/buy/OffersArriving";
import ModalContentCountryChooser from "./components/modal/ModalContentCountryChooser";
import NotFound from "./components/NotFound";
import Signup from "./components/signup/Signup";
import Admin from "./components/admin/Admin";
import ConfirmAccount from "./components/ConfirmAccount";
import Logs from "./components/backendlog-viewer/Logs";
import Payment from "./components/payment/Payment";
import useStore from "./store/useStore";
import Packages from "./components/payment/Packages";
import Profile from "./components/profile/Profile";
import PasswordReset from "./components/PasswordReset";
import useAuth from "./hooks/useAuth";
import { Toaster } from 'react-hot-toast';
// import { useTranslation } from "react-i18next";

function App() {
  useAuth();
  const baseRouteUrl = "/:locale";
  const [isOpen, setIsOpen] = useState(false);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  // const { i18n } = useTranslation();

  useEffect(() => {
    const loggedInUserJson = localStorage.getItem("currentUser");
    if (loggedInUserJson) {
      const loggedInUser = JSON.parse(loggedInUserJson);
      setCurrentUser(loggedInUser);
    }

    const chosenCountry = localStorage.getItem("chosenCountry");
    // TODO: replace with a listener
    setTimeout(() => {
      if (!chosenCountry) setIsOpen(true);
    }, 100);
  }, [setCurrentUser]);

  const isServerLogsPage = window.location.pathname.includes("/serverlogs");
  const placeholder = <div className="navbar-placeholder" style={{ height: "3.6rem" }} />;

  return (
    <div className="App">
      {isServerLogsPage ? placeholder : <Navbar />}
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <ModalContentCountryChooser setIsOpen={setIsOpen} />
      </Modal>
      <Toaster />
      <div className="content-area">
        <Routes>
          {/* <Route path="/" element={<Navigate to={i18n.language} replace />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path={baseRouteUrl} element={<HomePage />} />
          <Route path={`${baseRouteUrl}/buy`} element={<Buy />} />
          <Route path={`${baseRouteUrl}/buy/offers`} element={<OffersArriving />} />
          <Route path={`${baseRouteUrl}/sell`} element={<Sell />} />
          <Route path={`${baseRouteUrl}/sell/chooseinspector/:postCode`} element={<ChooseInspector />} />
          <Route path={`${baseRouteUrl}/sell/emailsent`} element={<EmailSent />} />
          <Route path={`${baseRouteUrl}/join`} element={<Join />} />
          <Route path={`${baseRouteUrl}/support`} element={<Support />} />
          <Route path={`${baseRouteUrl}/signup`} element={<Signup />} />
          <Route path={`${baseRouteUrl}/profile`} element={<Profile />} />
          <Route path={`${baseRouteUrl}/packages/payment`} element={<Payment />} />
          <Route path={`${baseRouteUrl}/packages`} element={<Packages />} />
          <Route path={`${baseRouteUrl}/admin`} element={<Admin />} />
          <Route path={`/reset`} element={<PasswordReset />} />
          <Route path={`/serverlogs`} element={<Logs />} />
          <Route path={`/confirm-account`} element={<ConfirmAccount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
