import { useEffect } from "react";

const NeedPhotoVideoSwitches = (props) => {
  const { isNeedPhoto, isNeedVideo, setIsNeedPhoto, setIsNeedVideo } = props.props;

  useEffect(() => {
    isNeedPhoto && setIsNeedPhoto(isNeedPhoto);
    isNeedVideo && setIsNeedVideo(isNeedVideo);
  }, [isNeedPhoto, setIsNeedPhoto, setIsNeedVideo, isNeedVideo]);

  return (
    <div className="is-flex is-justify-content-space-evenly">
      <div className="field">
      <label className="mr-2" htmlFor="isNeedPhoto">Kép szükséges?</label>
        <input
          id="isNeedPhoto"
          type="checkbox"
          name="isNeedPhoto"
          className="switch is-rounded"
          defaultChecked={isNeedPhoto}
          onChange={(e) => setIsNeedPhoto(e.target.checked)}
        />
      </div>

      <div className="field">
      <label className="mr-2" htmlFor="isNeedPhoto">Videó szükséges?</label>
        <input
          id="isNeedVideo"
          type="checkbox"
          name="isNeedVideo"
          className="switch is-rounded"
          defaultChecked={isNeedVideo}
          onChange={(e) => setIsNeedVideo(e.target.checked)}
        />
      </div>
    </div>
  );
};

export default NeedPhotoVideoSwitches;
