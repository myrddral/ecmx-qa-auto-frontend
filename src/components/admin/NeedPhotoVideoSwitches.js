const NeedPhotoVideoSwitches = () => {
  const setIsNeedPhoto = (e) => {
    console.log(e);
  };
  return (
    <div className="is-flex">
      <div className="field">
        <input
          id="isNeedVideo"
          type="checkbox"
          name="isNeedVideo"
          className="switch is-rounded"
          defaultChecked={true}
          onChange={(e) => setIsNeedPhoto(e.target.checked)}
        />
        <label htmlFor="isNeedVideo"> Need photo</label>
      </div>

      <div className="field">
        <input
          id="isNeedVideo"
          type="checkbox"
          name="isNeedVideo"
          className="switch is-rounded"
          defaultChecked={true}
          onChange={(e) => setIsNeedPhoto(e.target.checked)}
        />
        <label htmlFor="isNeedVideo"> Need video</label>
      </div>
    </div>
  );
};

export default NeedPhotoVideoSwitches;
