import { useState, useEffect } from "react";
import { getApiUrl } from "../../utils/helpers";
import toast from "react-hot-toast";

const ModalContentConfirmSave = ({ setIsOpen, setIsSaved, questionsGroups, assessmentVersionType }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    error && toast.error(error.message);
  }, [error]);

  const updateGroupsOrder = async () => {
    setIsOpen(true);
    setIsSubmitting(true);

    try {
      const response = await fetch(`${getApiUrl()}/assessments/add-new-version`, {
        method: "POST",
        body: JSON.stringify({questionsGroups, assessmentVersionType}),
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        setIsSaved(true);
      }
      setTimeout(() => {
        setIsSaved(false);
        // window.location.reload();
      }, 3000);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSave = async () => {
    await updateGroupsOrder();
    setIsOpen(false);
  };

  return (
    <div className="container modal-container" style={{ height: "100%" }}>
      <p className="modal-title block has-text-centered">Biztosan mented a listát?</p>
      <section className="block country-buttons">
        <div className="has-text-centered">
          Ezzel egy új verzió keletkezik a kérdéssorból az általad kiválaszott felmérés-típushoz.
        </div>
      </section>
      <div className="is-flex is-justify-content-center">
        <button
          onClick={handleSave}
          className={`button is-danger confirm-button mr-2 ${isSubmitting && "is-loading"}`}
          style={{ borderRadius: 0 }}
        >
          Igen
        </button>
        <button onClick={() => setIsOpen(false)} className="button is-primary-darker confirm-button ml-2">
          Mégsem
        </button>
      </div>
    </div>
  );
};

export default ModalContentConfirmSave;
