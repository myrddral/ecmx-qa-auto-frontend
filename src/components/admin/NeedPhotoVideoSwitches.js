const NeedPhotoVideoSwitches = () => {
  const setIsNeedPhoto = (e) => {
    console.log(e);
  };
  return (
    <div className="is-flex is-justify-content-space-evenly">
      <div className="field">
        <input
          id="isNeedVideo"
          type="checkbox"
          name="isNeedVideo"
          className="switch is-rounded mr-2"
          defaultChecked={true}
          onChange={(e) => setIsNeedPhoto(e.target.checked)}
        />
        <label htmlFor="isNeedVideo">Kép szükséges?</label>
      </div>

      <div className="field">
        <input
          id="isNeedVideo"
          type="checkbox"
          name="isNeedVideo"
          className="switch is-rounded mr-2"
          defaultChecked={true}
          onChange={(e) => setIsNeedPhoto(e.target.checked)}
        />
        <label htmlFor="isNeedVideo">Videó szükséges?</label>
      </div>
    </div>
  );
};

export default NeedPhotoVideoSwitches;
