export interface FormParams {
  message: string;
}
export interface EmailTemplateParams extends FormParams {
  surname?: string;
  forenames?: string;
  email?: string;
  gmcNumber?: string;
  programmeName?: string;
  localOffice?: string;
  localOfficeEmail?: string | null;
}
