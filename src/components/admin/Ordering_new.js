import React, { useState, useEffect } from "react";
import ModalContentConfirmSave from "../modal/ModalContentConfirmSave";
import { getApiUrl } from "../../utils/helpers";
import OrderingTypeChooser from "./OrderingTypeChooser";
import QuestionsList from "./QuestionsList";
import Modal from "../modal/Modal";
import toast from "react-hot-toast";
import "./ordering.css";

const Ordering = () => {
  const [currentVersion, setCurrentVersion] = useState(null);
  const [translations, setTranslations] = useState([]);
  const [questionsGroups, setQuestionsGroups] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowQuestionList, setIsShowQuestionList] = useState(false);
  const [assessmentVersionType, setAssessmentVersionType] = useState(null);
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

    fetchLatestVersionNumber();
    currentVersion && isShowQuestionList && fetchGroups();
    fetchTranslations();

    async function fetchLatestVersionNumber() {
      try {
        const url = `${getApiUrl()}/assessments/get-latest-version-number`;
        const response = await fetch(url, { headers: headers });
        const version = await response.text();
        setCurrentVersion(version);
      } catch (err) {
        setError(err);
      }
    }

    async function fetchGroups() {
      try {
        const url = `${getApiUrl()}/assessments/questionGroupTree/${currentVersion}`;
        const response = await fetch(url, { headers: headers });
        const groups = await response.json();
        groups.sort((a, b) => a.QUESTION_GROUP_ORDER - b.QUESTION_GROUP_ORDER);
        groups.map((group) => group.ASSESSMENTS_QUESTIONS.sort((a, b) => a.QUESTION_ORDER - b.QUESTION_ORDER));
        setQuestionsGroups(groups);
      } catch (err) {
        setError(err);
      }
    }

    // Fetching translations
    async function fetchTranslations() {
      try {
        const url = `${getApiUrl()}/assessments/translations`;
        const response = await fetch(url, { headers: headers });
        const translations = await response.json();
        setTranslations(translations);
      } catch (err) {
        setError(err);
      }
    }
  }, [currentVersion, isShowQuestionList]);

  return (
    <>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <ModalContentConfirmSave
          setIsOpen={setIsOpen}
          setIsSaved={setIsSaved}
          questionsGroups={questionsGroups}
          assessmentVersionType={assessmentVersionType}
        />
      </Modal>
      <>
        <section className="filter-section mt-5 mb-5">
          <div className="container">
            <div className="columns">
              <div className="column is-narrow">
                <OrderingTypeChooser
                  setIsShowQuestionList={setIsShowQuestionList}
                  setAssessmentVersionType={setAssessmentVersionType}
                />
              </div>
              <div className="column is-flex is-justify-content-flex-end">
                {isShowQuestionList && (
                  <button className={`button is-primary-darker m-4`} onClick={() => setIsOpen(true)}>
                    Mentés
                  </button>
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
                questionsGroups={questionsGroups}
                setQuestionsGroups={setQuestionsGroups}
                isSaved={isSaved}
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
