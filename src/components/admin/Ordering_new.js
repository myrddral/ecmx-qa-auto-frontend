import React, { useState, useEffect } from "react";
import ModalContentConfirmSave from "../modal/ModalContentConfirmSave";
import { getApiUrl } from "../../utils/helpers";
import OrderingTypeChooser from "./OrderingTypeChooser";
import QuestionsList from "./QuestionsList";
import Modal from "../modal/Modal";
import "./ordering.css";

const Ordering = () => {
  const [currentVersion, setCurrentVersion] = useState(null);
  const [translations, setTranslations] = useState([]);
  const [questionsGroups, setQuestionsGroups] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowQuestionList, setIsShowQuestionList] = useState(false);

  useEffect(() => {
    const headers = {
      Authorization: localStorage.getItem("token"),
      "Content-Type": "application/json",
    };

    fetchLatestVersionNumber();
    currentVersion && fetchGroups();
    fetchTranslations();
    async function fetchLatestVersionNumber() {
      try {
        const url = `${getApiUrl()}/assessments/get-latest-version-number`;
        const response = await fetch(url, { headers: headers });
        const version = await response.text();
        setCurrentVersion(version);
      } catch (err) {
        console.log(err);
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
        console.log(err);
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
        console.log(err);
      }
    }
  }, [currentVersion]);

  const updateGroupsOrder = async () => {
    setIsOpen(true);
    setIsSubmitting(true);
    const groupsJson = JSON.stringify(questionsGroups);
    const groups = JSON.parse(groupsJson);
    const response = await fetch(`${getApiUrl()}/assessments/add-new-version`, {
      method: "POST",
      body: JSON.stringify(groups),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log(await response.json());
    if (response.ok) {
      setIsSaved(true);
      setIsSubmitting(false);
    }
    setTimeout(() => {
      setIsSaved(false);
      // window.location.reload();
    }, 3000);
  };

  return (
    <>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <ModalContentConfirmSave setIsOpen={setIsOpen} isSaved={isSaved} />
      </Modal>
      {translations && questionsGroups && (
        <>
          <section className="filter-section mt-5 mb-5">
            <div className="container">
              <div className="columns">
                <div className="column is-narrow">
                  <OrderingTypeChooser setIsShowQuestionList={setIsShowQuestionList}/>
                </div>
                <div className="column is-flex is-justify-content-flex-end">
                  <button
                    className={`button is-primary-darker m-4 ${isSubmitting && "is-loading"}`}
                    onClick={() => updateGroupsOrder()}
                  >
                    Mentés
                  </button>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container">
              {isShowQuestionList ? <QuestionsList
                translations={translations}
                questionsGroups={questionsGroups}
                setQuestionsGroups={setQuestionsGroups}
                isSaved={isSaved}
              /> : <div>Válassz kategóriát minden listán.</div>}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Ordering;
