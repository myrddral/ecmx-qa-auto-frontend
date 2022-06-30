/* eslint-disable jsx-a11y/anchor-has-content */
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import LogOptionsPanel from "../LogOptionsPanel";
import { isJsonResponse } from "../../utils/helpers";
import { isValidLogJson } from "../../utils/helpers";
import { getApiUrl } from "../../utils/helpers";

const Logs = () => {
  const [logs, setLogs] = useState();
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${getApiUrl()}/logs/${"?" + selectedDate}`);
        if (isJsonResponse(response)) {
          const responseJson = await response.json();
          if (isValidLogJson(responseJson)) setLogs(responseJson);
        }
        //scroll to bottom of logs (scrollToView was slow)
        document.getElementById("tableEndAnchor")?.click();
      } catch (error) {
        throw new Error(error);
      }
    })();
  }, [selectedDate]);

  const handleDateChange = (e) => {
    setLogs(null);
    setSelectedDate(e.target.value);
  };

  // const handleInfoCBChange = (e) => {
  //   console.log(e.target.checked);
  // };

  // const handleErrorCBChange = (e) => {
  //   console.log(e.target.checked);
  // };

  const getLoglevelColor = (logLevel) => {
    switch (logLevel) {
      case "info":
        return "#0078FF";

      case "error":
        return "#FF1C1C";

      default:
        break;
    }
  };

  return (
    <>
      <LogOptionsPanel />
      <header
        className="logs-header"
        style={{ width: "100%", height: 30, backgroundColor: "white", position: "fixed", top: 0 }}
      >
        <p style={{ width: "100%", textAlign: "center", fontWeight: "bold" }}>QA Auto backend log</p>
      </header>
      <div
        className="logoptionspanel is-flex"
        style={{ width: "100%", height: 35, backgroundColor: "white", position: "fixed", top: 30 }}
      >
        <span>Select date:</span>
        <label className="label ml-2 mr-4">
          <input id="date-picker" type="date" onChange={handleDateChange} />
        </label>
        <span>Log level:</span>
        <label className="ml-2">
          <div className="select is-small">
            <select>
              <option defaultValue value={"error"}>
                Error
              </option>
              <option value={"warn"}>Warn</option>
              <option value={"info"}>Info</option>
              <option value={"debug"}>Debug</option>
            </select>
          </div>
        </label>
      </div>
      {logs && (
        <table
          className="table"
          style={{ height: "100%", fontSize: 12, color: "white", backgroundColor: "#333333", marginBottom: 0 }}
        >
          <thead
            style={{ width: "100%", position: "sticky", top: 60, backgroundColor: "white", boxShadow: "1px 1px 1px" }}
          >
            <tr>
              <th>Timestamp</th>
              <th>Level</th>
              <th>Context</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody style={{}}>
            {logs.map((logEntry) => (
              <tr key={uuidv4()} style={{ fontFamily: "JetBrains Mono" }}>
                <td style={{ border: 0, padding: 2 }}>{logEntry.timestamp}</td>
                <td style={{ border: 0, padding: 2, color: `${getLoglevelColor(logEntry.level)}` }}>
                  {logEntry.level}
                </td>
                <td style={{ border: 0, padding: 2 }}>{logEntry.context}</td>
                <td className="is-flex-direction-column" style={{ border: 0, padding: 2 }} width={"70%"}>
                  <div>{logEntry.message}</div>
                  {logEntry.stack && <div>{logEntry.stack[0]}</div>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!logs && (
        <p className="container" style={{ paddingTop: 200 }}>
          No log available for the selected date
        </p>
      )}
      <a id="tableEndAnchor" href="#tableEnd" />
      <div id="tableEnd" />
    </>
  );
};

export default Logs;
