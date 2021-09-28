import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Details } from "nhsuk-react-components";
import { ProgrammePanel } from "./ProgrammePanel";
import { ProgrammeMembership } from "../../../models/ProgrammeMembership";

interface IProgramProps {
  programmeMemberships: ProgrammeMembership[];
}

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(22),
    fontWeight: theme.typography.fontWeightBold,
    margin: "0px"
  },
  sectionPadding: {
    padding: theme.typography.pxToRem(20)
  }
}));

const Programmes: React.FC<IProgramProps> = ({ programmeMemberships }) => {
  const classes = useStyles();
  return (
    programmeMemberships && (
      <Details expander>
        <Details.Summary>Programmes</Details.Summary>
        <Details.Text>
          <div className={classes.root}>
            {programmeMemberships.length === 0 ? (
              <div>You are not assigned to any programme</div>
            ) : (
              programmeMemberships.map(
                (
                  programmeMembership: ProgrammeMembership,
                  index: string | number | undefined
                ) => (
                  <ProgrammePanel
                    key={index}
                    programmeMembership={programmeMembership}
                  />
                )
              )
            )}
          </div>
        </Details.Text>
      </Details>
    )
  );
};

export default Programmes;
