export interface LocalOfficeContact {
  name: string;
  email: string | null;
}

export const localOfficeContacts: LocalOfficeContact[] = [
  {
    name: "Health Education England East Midlands",
    email: "TIS.EM@hee.nhs.uk"
  },
  {
    name: "Health Education England East of England",
    email: "TIS.EOE@hee.nhs.uk"
  },
  { name: "Health Education England Kent, Surrey and Sussex", email: null },
  {
    name: "Health Education England North Central and East London",
    email: null
  },
  {
    name: "Health Education England North East",
    email: "InformationTeam.NE@hee.nhs.uk"
  },
  {
    name: "Health Education England North West",
    email: "medicine.nw@hee.nhs.uk"
  },
  { name: "Health Education England North West London", email: null },
  { name: "Health Education England South London", email: null },
  {
    name: "Health Education England South West",
    email: "TISQueries.sw@hee.nhs.uk"
  },
  { name: "Health Education England Thames Valley", email: null },
  { name: "Health Education England Wessex", email: null },
  {
    name: "Health Education England West Midlands",
    email: "TIS.WM@hee.nhs.uk"
  },
  {
    name: "Health Education England Yorkshire and the Humber",
    email: "TIS.yh@hee.nhs.uk"
  },
  { name: "London LETBs", email: null },
  { name: "West of England", email: "noreply@hee.nhs.uk" }
];
