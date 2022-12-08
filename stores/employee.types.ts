import {
  IEmployee,
  TEmployeeList,
} from "@/api/index.types";
import { IIndexable } from "@/types/interfaces";

export interface IEmployeeState {
  // form
  form: IEmployeeForm;
  // list
  employees: TEmployeeList;
}

export interface IEmployeeForm
  extends IIndexable,
    IEmployee {
  image?: File[];
}
