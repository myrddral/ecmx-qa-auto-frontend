import bulmaQuickview from "../../../node_modules/bulma-quickview/dist/js/bulma-quickview.min.js";
import "../../../node_modules/bulma-quickview/dist/css/bulma-quickview.min.css";
import { useEffect } from "react";
import NeedPhotoVideoSwitches from "./NeedPhotoVideoSwitches";

const QuickView = ({ selectedQuestion, translations }) => {
  useEffect(() => {
    bulmaQuickview.attach();
  }, []);

  useEffect(() => {
    console.log(selectedQuestion);
  }, [selectedQuestion]);

  return (
    <>
      <div id="quickviewDefault" className="quickview" style={{ backgroundColor: "#f3f3f3" }}>
        <header className="quickview-header">
          <p className="title has-text-weight-medium">
            {translations.find((translation) => translation.CODE === selectedQuestion)?.TRANSLATION}
          </p>
          <span className="delete" data-dismiss="quickview"></span>
        </header>

        <div className="quickview-body p-4">
          <NeedPhotoVideoSwitches />
        </div>

        {/* <footer className="quickview-footer" style={{ backgroundColor: "transparent" }}></footer> */}
      </div>
    </>
  );
};

export default QuickView;
