const ModalContentConfirmSave = ({ setIsOpen, isSaved }) => {
  

  return (
    <div className="container modal-container" style={{ height: "100%" }}>
      <p className="modal-title block has-text-centered">Biztosan mented a listát?</p>
      <section className="block country-buttons">
        <div className="has-text-centered">Ezzel egy új verzió keletkezik a kérdéssorból az általad kiválaszott felmérés-típushoz.</div>
      </section>
      <div className="is-flex is-justify-content-center">
      <button onClick={()=>setIsOpen(false)} className="button is-danger confirm-button mr-2" style={{borderRadius: 0}}>
        Igen
      </button>
      <button onClick={()=>setIsOpen(false)} className="button is-primary-darker confirm-button ml-2">
        Mégsem
      </button>
      </div>
    </div>
  );
};

export default ModalContentConfirmSave;
