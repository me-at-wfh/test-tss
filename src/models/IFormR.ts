import { LifeCycleState } from "./LifeCycleState";

export interface IFormR {
  id?: string;
  submissionDate: Date | null;
  lastModifiedDate: Date | null;
  lifecycleState: LifeCycleState;
}
