import { useState, useRef } from "react";
import useStore from "../../store/useStore";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Modal from "../modal/Modal";
import ModalContentLogin from "../modal/ModalContentLogin";
import logo from "../../assets/qaauto-logo.png";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const currentUser = useStore((state) => state.currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const { handleLogout } = useAuth();
  const navbarRef = useRef();

  const openLoginModal = () => {
    setIsOpen(true);
  };

  // const hideDropdown = () => {
  //   document.querySelector('.navbar-dropdown').style.display = 'none';
  // }

  // const showDropdown = () => {
  //   document.querySelector('.navbar-dropdown').style.display = 'block';
  // }

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

          <button href="" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navburger">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
        <div className="navbar-menu ml-6">
          <div className="navbar-start">
            <Link className="navbar-item" to={`/${i18n.language}/buy`}>
              Keresek
            </Link>
            <Link className="navbar-item" to={`/${i18n.language}/sell`}>
              Eladok
            </Link>
            <Link className="navbar-item" to={`/${i18n.language}/profile`}>
              Profilom
            </Link>
            {currentUser?.rolecode === "ADMIN" && (
              <div className="navbar-item has-dropdown is-hoverable">
                <Link className="navbar-link" to={""}>
                  Admin menu
                </Link>
                <div className="navbar-dropdown">
                  <Link className="navbar-item" to={`/${i18n.language}/admin/ordering`}>
                    Felmérések szerkesztése
                  </Link>
                  <hr className="navbar-divider" />
                  <a className="navbar-item" href="/">
                    Felhasználók kezelése
                  </a>
                </div>
              </div>
            )}
          </div>
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
