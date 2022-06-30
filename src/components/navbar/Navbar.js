import logo from "../../assets/qaauto-logo.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useStore from "../../store/useStore";
import Modal from "../modal/Modal";
import { useState, useRef } from "react";
import ModalContentLogin from "../modal/ModalContentLogin";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef();

  const openLoginModal = () => {
    setIsOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setCurrentUser();
  };

  return (
    <>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <ModalContentLogin setIsOpen={setIsOpen} />
      </Modal>
      <nav ref={navbarRef} className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand pl-6">
          <a href="/">
            <img src={logo} className="App-logo" alt="logo" />
          </a>

          {/* <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a> */}
        </div>
        <div className="navbar-menu">
          {/* <div className="navbar-start">
            <a className="navbar-item" href="/">
              Home
            </a>
            <a className="navbar-item" href="/">
              Documentation
            </a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link" href="/">
                More
              </a>
              <div className="navbar-dropdown">
                <a className="navbar-item" href="/">
                  About
                </a>
                <a className="navbar-item" href="/">
                  Jobs
                </a>
                <a className="navbar-item" href="/">
                  Contact
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item" href="/">
                  Report an issue
                </a>
              </div>
            </div>
          </div> */}
          <div className="navbar-end pr-6">
            {currentUser ? (
              <div className="navbar-item">
                <button onClick={handleLogout} className="button is-white" style={{ backgroundColor: "transparent" }}>
                  {t("navbar.button.logout")}
                </button>
              </div>
            ) : (
              <>
                <div className="navbar-item">
                  <button
                    onClick={openLoginModal}
                    className="button is-white"
                    style={{ backgroundColor: "transparent" }}
                  >
                    {t("navbar.button.login")}
                  </button>
                </div>
                <div className="navbar-item">
                  <Link to={`/${i18n.language}/signup`}>
                    <button className="button is-primary-darker">{t("navbar.button.signup")}</button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
