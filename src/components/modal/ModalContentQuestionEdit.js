import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import NeedPhotoVideoSwitches from "./NeedPhotoVideoSwitches";
import { getApiUrl } from "../../utils/helpers";

const ModalContentQuestionEdit = ({ selectedQuestion, translations, setIsOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isActive, setIsActive] = useState(selectedQuestion?.ACTIVE || true);
  const answerTypes = useFetch(`${getApiUrl()}/assessments/answer-types`);
  const [currentAnswerType, setCurrentAnswerType] = useState(selectedQuestion?.ANSWER_TYPE.CODE || "");
  const questionGroups = useFetch(`${getApiUrl()}/assessments/question-groups`);
  const [currentQuestionGroup, setCurrentQuestionGroup] = useState(selectedQuestion?.ASSESSMENT_GROUP.CODE || "");
  const answerGroups = useFetch(`${getApiUrl()}/assessments/answer-groups`);
  const [currentAnswerGroup, setCurrentAnswerGroup] = useState(selectedQuestion?.GROUP_ID.ANSWER_OPTION_GROUP_CODE || "");
  const [description, setDescription] = useState(selectedQuestion?.DESCRIPTION || "");
  const [isNeedPhoto, setIsNeedPhoto] = useState(selectedQuestion?.NEED_PHOTO || false);
  const [isNeedVideo, setIsNeedVideo] = useState(selectedQuestion?.NEED_VIDEO || false);
  const [newQuestionTitle, setNewQuestionTitle] = useState("");

//   useEffect(() => {
//     console.log(answerGroups);
//   }, [answerGroups]);

  useEffect(() => {
    !selectedQuestion && answerTypes && setCurrentAnswerType(answerTypes[0].CODE);
    !selectedQuestion && questionGroups && setCurrentQuestionGroup(questionGroups[0].CODE);
    !selectedQuestion && answerGroups && setCurrentAnswerGroup(answerGroups[0].CODE);
  }, [selectedQuestion, answerTypes, questionGroups, answerGroups]);

  const handleSave = async () => {
    setIsSubmitting(true);

    const payload = {
      isActive: isActive,
      currentAnswerType: currentAnswerType,
      currentQuestionGroup: currentQuestionGroup,
      currentAnswerGroup: currentAnswerGroup,
      description: description,
      isNeedPhoto: isNeedPhoto,
      isNeedVideo: isNeedVideo,
      newQuestionTitle: newQuestionTitle,
    };

    try {
      let url = "";
      newQuestionTitle
        ? (url = `${getApiUrl()}/assessments/add-new-question`)
        : (url = `${getApiUrl()}/assessments/edit-question`);

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        //   setIsSaved(true);
        console.log(await response.json());
      }
      setTimeout(() => {
        //   setIsSaved(false);
        // window.location.reload();
      }, 3000);
    } catch (error) {
      console.error(error);
      // setError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container modal-container">
        <p className="is-size-4 block has-text-centered">
          {translations.find((translation) => translation.CODE === selectedQuestion?.CODE)?.TRANSLATION ||
            "Új kérdés hozzáadása"}
        </p>
        {!selectedQuestion && (
          <section className="block">
            <div className="field is-flex is-justify-content-center is-align-items-center">
              <label className="mr-2" htmlFor="question">
                Kérdés
              </label>
              <input
                id="question"
                type="text"
                name="question"
                className="input is-primary"
                placeholder="A kérdés címe"
                value={newQuestionTitle}
                onChange={(e) => setNewQuestionTitle(e.target.value)}
              />
            </div>
          </section>
        )}
        <section className="block">
          <div className="field is-flex is-justify-content-center is-align-items-center">
            <label className="mr-2" htmlFor="isActive">
              Aktív a kérdés?
            </label>
            <input
              id="isActive"
              type="checkbox"
              name="isActive"
              className="switch is-rounded"
              defaultChecked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </div>
        </section>
        <section className="block">
          <NeedPhotoVideoSwitches props={{ isNeedPhoto, setIsNeedPhoto, isNeedVideo, setIsNeedVideo }} />
        </section>
        <section className="block is-flex is-justify-content-space-between">
          <p>Kérdés csoportja</p>
          <span>
            <div className="select is-small">
              <select
                onChange={(e) => setCurrentQuestionGroup(e.target.value)}
                value={currentQuestionGroup}
                style={{ width: 200 }}
              >
                {questionGroups?.map((qGroup) => (
                  <option key={qGroup.CODE}>
                    {/* not working WTF */}
                    {/* {translations.find((translation) => translation.CODE === qGroup.CODE)?.TRANSLATION} */}
                    {qGroup.CODE}
                  </option>
                ))}
              </select>
            </div>
          </span>
        </section>
        <section className="block is-flex is-justify-content-space-between">
          <p>Adható válasz típusa</p>
          <span>
            <div className="select is-small">
              <select
                onChange={(e) => setCurrentAnswerType(e.target.value)}
                value={currentAnswerType}
                style={{ width: 200 }}
              >
                {answerTypes?.map((answerType) => (
                  <option key={answerType.CODE}>{answerType.CODE}</option>
                ))}
              </select>
            </div>
          </span>
        </section>
        {currentAnswerType !== "NONE" && <section className="block is-flex is-justify-content-space-between">
          <p>Adható válasz csoportja</p>
          <span>
            <div className="select is-small">
              <select
                onChange={(e) => setCurrentAnswerGroup(e.target.value)}
                value={currentAnswerGroup}
                style={{ width: 200 }}
              >
                {answerGroups?.map((answerGroup) => (
                  <option key={answerGroup.ANSWER_OPTION_GROUP_CODE}>{answerGroup.ANSWER_OPTION_GROUP_CODE}</option>
                ))}
              </select>
            </div>
          </span>
        </section>}
        <section className="block">
          <p>Leírás</p>
          <span>
            <textarea
              className="textarea is-primary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A kérdéssel kapcsolatos információk"
            />
          </span>
        </section>
        <div className="is-flex is-justify-content-center pt-4 pb-2">
          <button
            onClick={handleSave}
            className={`button is-danger confirm-button mr-2 ${isSubmitting && "is-loading"}`}
            style={{ borderRadius: 0 }}
          >
            Mentés
          </button>
          <button onClick={() => setIsOpen(false)} className="button is-primary-darker confirm-button ml-2">
            Mégsem
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalContentQuestionEdit;
