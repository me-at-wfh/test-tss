import React from "react";
import { useHistory } from "react-router-dom";
import { Panel, BackLink } from "nhsuk-react-components";

import chromePrint1 from "../../static/images/chrome-print-1.png";
import chromePrint2 from "../../static/images/chrome-print-2.png";
import edgePrint1 from "../../static/images/edge-print-1.png";
import edgePrint2 from "../../static/images/edge-print-2.png";

const HowToPrintToPDF: React.FunctionComponent = () => {
  const history = useHistory();
  return (
    <div>
      <BackLink style={{ cursor: "pointer" }} onClick={() => history.goBack()}>
        Back
      </BackLink>
      <h2>How to save a Form R as PDF using the browser.</h2>
      <Panel label="Using Google Chrome">
        <ol>
          <li> Open the webpage you want to save. </li>

          <li>
            In the top right corner of the screen, click the three dots to bring
            down the browser menu.
          </li>

          <li> From the dropdown menu, choose "Print." </li>
          <img alt="" style={{ width: "100%" }} src={chromePrint1} />
          <li>
            The Print settings window will appear. Select the first dropdown
            menu, labeled "Destination."
          </li>

          <li> Change the destination to "Save as PDF."</li>
          <img alt="" style={{ width: "100%" }} src={chromePrint2} />
          <li> Click Save and wait for the "Save As" window to appear.</li>

          <li>
            Name the file, select the file destination, and then click "Save."{" "}
          </li>
        </ol>
      </Panel>
      <Panel label="Using Microsoft Edge">
        <ol>
          <li> Open the webpage you want to save. </li>

          <li>
            In the top right corner of the screen, click the three dots to bring
            down the browser menu.
          </li>

          <li> From the dropdown menu, choose "Print." </li>
          <img alt="" style={{ width: "100%" }} src={edgePrint1} />
          <li>
            The Print settings window will appear. Select the first dropdown
            menu beneath "Print."
          </li>

          <li> Change the selection to "Save as PDF."</li>
          <img alt="" style={{ width: "100%" }} src={edgePrint2} />
          <li> Click Save and wait for the "Save As" window to appear.</li>

          <li>
            Name the file, select the file destination, and then click "Save."
          </li>
        </ol>
      </Panel>
    </div>
  );
};

export default HowToPrintToPDF;
