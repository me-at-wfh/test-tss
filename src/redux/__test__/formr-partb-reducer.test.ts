import {
  ActionType,
  FormRPartBState,
  FormRPartBListState,
  FormSwitchesState
} from "../types";
import {
  LOAD_FORMR_PARTB_LIST_SUCCESS,
  LOAD_FORMR_PARTB_LIST_FAILURE,
  INITIALIZE_FORMR_PARTB_FAILURE,
  INITIALIZE_FORMR_PARTB_SUCCESS,
  MOVE_TO_SECTION,
  EDIT_FORMR_PARTB,
  LOAD_FORMR_PARTB,
  LOAD_FORM_SWITCHES_SUCCESS,
  LOAD_FORM_SWITCHES_FAILURE
} from "../action_types";
import {
  FormRPartBListReducer,
  FormRPartBReducer,
  FormSwitchesReducer
} from "../reducers/formr-partb-reducer";
import { FormRPartB, FormSwitch } from "../../models/FormRPartB";
import { LifeCycleState } from "../../models/LifeCycleState";

const formrPartB: FormRPartB = {
  traineeTisId: "123",
  forename: "Anthony Mara",
  surname: "Gilliam",
  gmcNumber: "11111111",
  localOfficeName: "Health Education England Thames Valley",
  email: "",
  programmeSpecialty: "ST6",
  prevRevalBody: "",
  currRevalDate: new Date("2021-12-31"),
  prevRevalDate: new Date("2021-12-31"),
  dualSpecialty: "",
  work: [
    {
      endDate: new Date("2020-12-31"),
      site: "Addenbrookes Hospital",
      siteLocation: "Site location",
      startDate: new Date("2020-01-01"),
      trainingPost: "Yes",
      typeOfWork: "In Post ST1 Dermatology"
    }
  ],
  sicknessAbsence: 0,
  parentalLeave: 0,
  careerBreaks: 0,
  paidLeave: 0,
  unauthorisedLeave: 0,
  otherLeave: 0,
  totalLeave: 0,
  isHonest: "",
  isHealthy: "",
  isWarned: "",
  isComplying: "",
  healthStatement: "",
  havePreviousDeclarations: "",
  previousDeclarations: [],
  previousDeclarationSummary: "",
  haveCurrentDeclarations: "",
  currentDeclarations: [],
  currentDeclarationSummary: "",
  compliments: "",
  haveCovidDeclarations: "",
  covidDeclarationDto: null,
  lifecycleState: LifeCycleState.New,
  submissionDate: null,
  lastModifiedDate: null
};

const formSwitches: FormSwitch[] = [{ id: "1", name: "COVID", enabled: false }];

describe("FormRPartBListReducer", () => {
  const initialState: FormRPartBListState = {
    submittedForms: []
  };

  it("should return initial state when no action passed", () => {
    const defaultAction: ActionType = {
      type: "",
      payload: null
    };

    expect(FormRPartBListReducer(undefined, defaultAction)).toEqual(
      initialState
    );
  });

  it("should return updated state when LOAD_FORMR_PARTB_LIST_SUCCESS action passed", () => {
    const state: FormRPartBListState = {
      ...initialState,
      submittedForms: [formrPartB]
    };

    const successAction: ActionType = {
      type: LOAD_FORMR_PARTB_LIST_SUCCESS,
      payload: [formrPartB]
    };

    expect(FormRPartBListReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_FORMR_PARTB_LIST_FAILURE action passed", () => {
    const state: FormRPartBListState = {
      ...initialState
    };

    const failureAction: ActionType = {
      type: LOAD_FORMR_PARTB_LIST_FAILURE,
      payload: null
    };

    expect(FormRPartBListReducer(initialState, failureAction)).toEqual(state);
  });
});

describe("FormRPartBReducer", () => {
  let initialState: FormRPartBState;

  beforeEach(() => {
    initialState = {
      formData: null,
      section: 0
    };
  });

  it("should return initial state when no action passed", () => {
    const defaultAction: ActionType = {
      type: "",
      payload: null
    };

    expect(FormRPartBReducer(undefined, defaultAction)).toEqual(initialState);
  });

  it("should return updated state when LOAD_FORMR_PARTB action passed", () => {
    const state: FormRPartBState = {
      ...initialState,
      formData: formrPartB,
      section: 0
    };

    const successAction: ActionType = {
      type: LOAD_FORMR_PARTB,
      payload: formrPartB
    };

    expect(FormRPartBReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when INITIALIZE_FORMR_PARTB_SUCCESS action passed", () => {
    const state: FormRPartBState = {
      ...initialState,
      formData: formrPartB,
      section: 0
    };

    const successAction: ActionType = {
      type: INITIALIZE_FORMR_PARTB_SUCCESS,
      payload: formrPartB
    };

    expect(FormRPartBReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when INITIALIZE_FORMR_PARTB_FAILURE action passed", () => {
    const failureAction: ActionType = {
      type: INITIALIZE_FORMR_PARTB_FAILURE,
      payload: null
    };

    expect(FormRPartBReducer(initialState, failureAction)).toEqual(
      initialState
    );
  });

  it("should return updated state when MOVE_TO_SECTION action passed", () => {
    const state: FormRPartBState = {
      ...initialState,
      section: 3
    };

    const successAction: ActionType = {
      type: MOVE_TO_SECTION,
      payload: 3
    };

    expect(FormRPartBReducer(initialState, successAction)).toEqual(state);
  });

  it("should return the same state when EDIT_FORMR_PARTB action passed", () => {
    const state: FormRPartBState = {
      ...initialState,
      section: 3
    };

    const successAction: ActionType = {
      type: EDIT_FORMR_PARTB,
      payload: 3
    };

    expect(FormRPartBReducer(state, successAction)).toEqual(state);
  });
});

describe("FormSwitchesReducer", () => {
  const initialState: FormSwitchesState = {
    formSwitches: []
  };

  it("should return initial state when no action passed", () => {
    const defaultAction: ActionType = {
      type: "",
      payload: null
    };

    expect(FormSwitchesReducer(undefined, defaultAction)).toEqual(initialState);
  });

  it("should return updated state when LOAD_FORM_SWITCHES_SUCCESS action passed", () => {
    const state: FormSwitchesState = {
      ...initialState,
      formSwitches
    };

    const successAction: ActionType = {
      type: LOAD_FORM_SWITCHES_SUCCESS,
      payload: formSwitches
    };

    expect(FormSwitchesReducer(initialState, successAction)).toEqual(state);
  });

  it("should return updated state when LOAD_FORM_SWITCHES_FAILURE action passed", () => {
    const state: FormSwitchesState = {
      ...initialState
    };

    const failureAction: ActionType = {
      type: LOAD_FORM_SWITCHES_FAILURE,
      payload: null
    };

    expect(FormSwitchesReducer(initialState, failureAction)).toEqual(state);
  });
});
