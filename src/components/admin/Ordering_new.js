import React, { useState, useEffect } from "react";
import ModalContentConfirmSave from "../modal/ModalContentConfirmSave";
import { getApiUrl } from "../../utils/helpers";
import OrderingTypeChooser from "./OrderingTypeChooser";
import QuestionsList from "./QuestionsList";
import ModalContentQuestionEdit from "../modal/ModalContentQuestionEdit";
import Modal from "../modal/Modal";
import toast from "react-hot-toast";
import useFetch from "../../hooks/useFetch";
import "./ordering.css";

const Ordering = () => {
  // const [currentVersion, setCurrentVersion] = useState(null);
  const translations = useFetch(`${getApiUrl()}/assessments/translations`);
  const [questions, setQuestions] = useState([]);
  const [isSaved, setIsSaved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isShowQuestionList, setIsShowQuestionList] = useState(false);
  const [versionFilterDetails, setVersionFilterDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    isSaved && toast.success("Változtatások sikeresen elmentve!");
  }, [isSaved]);

  useEffect(() => {
    error && toast.error(error.toString());
  }, [error]);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    };

    (async () => {
      versionFilterDetails && (await fetchQuestions());
    })();

    // async function fetchLatestVersionNumber() {
    //   try {
    //     const url = `${getApiUrl()}/assessments/get-latest-version-number`;
    //     const response = await fetch(url, { headers: headers });
    //     const version = await response.text();
    //     setCurrentVersion(version);
    //   } catch (err) {
    //     setError(err);
    //   }
    // }

    async function fetchQuestions(version) {
      try {
        let url = "";
        version
          ? (url = `${getApiUrl()}/assessments/question-list/${version}`)
          : (url = `${getApiUrl()}/assessments/question-list`);
        const response = await fetch(url, { headers: headers });
        const questions = await response.json();
        if (!version) {
          questions.forEach((questions, i) => {
            questions.QUESTION_ORDER = i + 1;
          });
        }
        questions.sort((a, b) => a.QUESTION_ORDER - b.QUESTION_ORDER);
        setQuestions(questions);
      } catch (err) {
        setError(err);
      }
    }
  }, [isShowQuestionList, versionFilterDetails]);

  const handleSaveClick = () => {
    setIsEditMode(false);
    setIsOpen(true);
  };

  const handleNewQuestionClick = () => {
    setIsEditMode(true);
    setIsOpen(true);
  };

  return (
    <>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        {!isEditMode ? (
          <ModalContentConfirmSave
            setIsOpen={setIsOpen}
            setIsSaved={setIsSaved}
            questions={questions}
            versionFilterDetails={versionFilterDetails}
          />
        ) : (
          <ModalContentQuestionEdit setIsOpen={setIsOpen} translations={translations} />
        )}
      </Modal>
      <>
        <section className="filter-section mt-5 mb-5" style={{ maxWidth: 1000, margin: "auto" }}>
          <div className="container">
            <div className="columns is-flex">
              <div className="column is-narrow">
                <OrderingTypeChooser
                  setIsShowQuestionList={setIsShowQuestionList}
                  setAssessmentVersionType={setVersionFilterDetails}
                />
              </div>
              <div className="column is-flex is-justify-content-flex-end">
                {isShowQuestionList && (
                  <div className="buttons are-small is-flex is-flex-direction-column">
                    <button className={`button is-primary-darker is-fullwidth`} onClick={handleSaveClick}>
                      <span className="icon mr-2">
                        <i className="fas fa-lg fa-floppy-disk"></i>
                      </span>
                      Új verzió mentése
                    </button>
                    <button className={`button is-primary-darker is-fullwidth`} onClick={handleNewQuestionClick}>
                      <span className="icon mr-2">
                        <i className="fas fa-lg fa-plus"></i>
                      </span>
                      Kérdés hozzáadása
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            {isShowQuestionList ? (
              <QuestionsList
                translations={translations}
                questions={questions}
                setQuestions={setQuestions}
                isSaved={isSaved}
                isEditMode={isEditMode}
              />
            ) : (
              <section className="section">
                <header className="block has-text-centered has-text-weight-light is-size-5 pt-6">
                  Válassz kategóriát minden listán a kérdések megjelenítéséhez.
                </header>
              </section>
            )}
          </div>
        </section>
      </>
    </>
  );
};

export default Ordering;
