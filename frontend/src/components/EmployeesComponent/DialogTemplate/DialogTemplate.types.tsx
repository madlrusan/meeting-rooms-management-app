import { IEmployee } from "../../../dto/models/IEmployee";

export interface IDialogModel extends IEmployee {
	avatarUrl?: string;
	isAdd?: boolean;
}