import React from "react";
import { Fieldset, Label } from "nhsuk-react-components";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Create from "./Create";
import List from "./List";
import View from "./View";
import Confirm from "./Confirm";
import ScrollTo from "../ScrollTo";
const FormRPartB: React.FC = () => {
  return (
    <div>
      <ScrollTo />
      <Fieldset>
        <Fieldset.Legend isPageHeading>Form R (Part B)</Fieldset.Legend>
        <Label>
          Self-declaration for the Revalidation of Doctors in Training
        </Label>
      </Fieldset>
      <BrowserRouter>
        <Switch>
          <Route path="/formr-b/create" component={Create} />
          <Route path="/formr-b/confirm" component={Confirm} />
          <Route path="/formr-b/:id" component={View} />
          <Route path="/" component={List} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default FormRPartB;
