import { useState, useEffect } from "react";

const OrderingTypeChooser = ({ setIsShowQuestionList, setAssessmentVersionType }) => {
  const [location, setLocation] = useState();
  const [fuelType, setFuelType] = useState();
  const [chassisType, setChassisType] = useState();
  const [noOfDoors, setNoOfDoors] = useState();
  const isAllSelected = !!location && !!fuelType && !!chassisType && !!noOfDoors;

  useEffect(() => {
    if (isAllSelected) {
      setIsShowQuestionList(true);
      setAssessmentVersionType({
        locaton: location,
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
          <p className="title is-6 has-text-centered">Felmérés helyszíne</p>
          {isAllSelected && <p className="has-text-centered has-text-weight-bold is-size-6">{location}</p>}
          {!isAllSelected && (
            <select multiple size="4" onChange={(e) => setLocation(e.target.value)} style={{ width: 160 }}>
              <option value="Utca">Utca</option>
              <option value="Emelő">Emelő</option>
              <option value="Akna">Akna</option>
            </select>
          )}
        </div>

        <div className="select is-multiple is-primary mr-3">
          <p className="title is-6 has-text-centered">Üzemanyag típusa</p>
          {isAllSelected && <p className="has-text-centered has-text-weight-bold is-size-6">{fuelType}</p>}
          {!isAllSelected && (
            <select multiple size="4" onChange={(e) => setFuelType(e.target.value)} style={{ width: 160 }}>
              <option value="Benzin">Benzin</option>
              <option value="Dízel">Dízel</option>
              <option value="Elektromos">Elektromos</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Hirdogén">Hirdogén</option>
            </select>
          )}
        </div>

        <div className="select is-multiple is-primary mr-3">
          <p className="title is-6 has-text-centered">Karosszéria típusa</p>
          {isAllSelected && <p className="has-text-centered has-text-weight-bold is-size-6">{chassisType}</p>}
          {!isAllSelected && (
            <select multiple size="4" onChange={(e) => setChassisType(e.target.value)} style={{ width: 160 }}>
              <option value="Kisautó">Kisautó</option>
              <option value="Kombi">Kombi</option>
              <option value="Limuzin/szedán">Limuzin/szedán</option>
              <option value="Sportautó/Coupé">Sportautó/Coupé</option>
              <option value="Cabrio/Roadster">Cabrio/Roadster</option>
              <option value="SUV/Terepjáró">SUV/Terepjáró</option>
              <option value="Pickup">Pickup</option>
              <option value="Kisbusz/Egyterű">Kisbusz/Egyterű</option>
            </select>
          )}
        </div>

        <div className="select is-multiple is-primary">
          <p className="title is-6 has-text-centered">Ajtók száma</p>
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
