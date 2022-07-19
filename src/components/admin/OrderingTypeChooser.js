import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const OrderingTypeChooser = ({ setIsShowQuestionList, setAssessmentVersionType }) => {
  const { t } = useTranslation();
  const [location, setLocation] = useState();
  const [fuelType, setFuelType] = useState();
  const [chassisType, setChassisType] = useState();
  const [noOfDoors, setNoOfDoors] = useState();
  const isAllSelected = !!location && !!fuelType && !!chassisType && !!noOfDoors;
  const translationPrefix = 'admin.questionEditor.typeChooser'

  useEffect(() => {
    if (isAllSelected) {
      setIsShowQuestionList(true);
      setAssessmentVersionType({
        location: location,
        fuelType: fuelType,
        chassisType: chassisType,
        noOfDoors: noOfDoors,
      });
    } else if (!isAllSelected) {
      setIsShowQuestionList(false);
    }
  }, [isAllSelected, setIsShowQuestionList, setAssessmentVersionType, chassisType, fuelType, location, noOfDoors]);

  const clearSelection = () => {
    setLocation(null);
    setFuelType(null);
    setChassisType(null);
    setNoOfDoors(null);
  };

  return (
    <>
      <div
        className={`assessment-type-selector${isAllSelected && "-closed pointer-cursor"}`}
        style={{ height: 180, transition: "0.4s height" }}
        onClick={isAllSelected ? clearSelection : undefined}
      >
        <div className="select is-multiple is-primary mr-3">
          <p className="title is-6 has-text-centered">{t(`${translationPrefix}.inspectionLocation`)}</p>
          {isAllSelected && <p className="has-text-centered has-text-weight-bold is-size-6">{location}</p>}
          {!isAllSelected && (
            <select multiple size="4" onChange={(e) => setLocation(e.target.value)} style={{ width: 160 }}>
              <option value="street">{t(`${translationPrefix}.street`)}</option>
              <option value="lift">{t(`${translationPrefix}.lift`)}</option>
              <option value="inspection_pit">{t(`${translationPrefix}.inspectionPit`)}</option>
            </select>
          )}
        </div>

        <div className="select is-multiple is-primary mr-3">
          <p className="title is-6 has-text-centered">{t(`${translationPrefix}.fuelType`)}</p>
          {isAllSelected && <p className="has-text-centered has-text-weight-bold is-size-6">{fuelType}</p>}
          {!isAllSelected && (
            <select multiple size="4" onChange={(e) => setFuelType(e.target.value)} style={{ width: 160 }}>
              <option value="gasoline">{t(`${translationPrefix}.gasoline`)}</option>
              <option value="diesel">{t(`${translationPrefix}.diesel`)}</option>
              <option value="electric">{t(`${translationPrefix}.electric`)}</option>
              <option value="hybrid">{t(`${translationPrefix}.hybrid`)}</option>
              <option value="hydrogen">{t(`${translationPrefix}.hydrogen`)}</option>
            </select>
          )}
        </div>

        <div className="select is-multiple is-primary mr-3">
          <p className="title is-6 has-text-centered">{t(`${translationPrefix}.chassisType`)}</p>
          {isAllSelected && <p className="has-text-centered has-text-weight-bold is-size-6">{chassisType}</p>}
          {!isAllSelected && (
            <select multiple size="4" onChange={(e) => setChassisType(e.target.value)} style={{ width: 160 }}>
              <option value="small_car">{t(`${translationPrefix}.smallCar`)}</option>
              <option value="estate">{t(`${translationPrefix}.estate`)}</option>
              <option value="saloon">{t(`${translationPrefix}.saloon`)}</option>
              <option value="sports_car_coupe">{t(`${translationPrefix}.sportsCarCoupe`)}</option>
              <option value="cabrio_roadster">{t(`${translationPrefix}.cabrioRoadster`)}</option>
              <option value="suv_offroad">{t(`${translationPrefix}.suvOffroad`)}</option>
              <option value="pickup">{t(`${translationPrefix}.pickup`)}</option>
              <option value="van_minibus">{t(`${translationPrefix}.vanMinibus`)}</option>
            </select>
          )}
        </div>

        <div className="select is-multiple is-primary">
          <p className="title is-6 has-text-centered">{t(`${translationPrefix}.noOfDoors`)}</p>
          {isAllSelected && <p className="has-text-centered has-text-weight-bold is-size-6">{noOfDoors}</p>}
          {!isAllSelected && (
            <select multiple size="4" onChange={(e) => setNoOfDoors(e.target.value)} style={{ width: 160 }}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          )}
        </div>
      </div>
    </>
  );
};

export default OrderingTypeChooser;
