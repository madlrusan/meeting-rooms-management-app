import { DialogActions, DialogTitle, FormGroup, Input } from "@mui/material";
import styled from "styled-components";

export const DialogHeader = styled(DialogTitle)`
	margin-right: 25px !important;
`;

export const InputGroup = styled(FormGroup)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	padding: 20px 0px 0px 0px;

	position: relative;
	width: 100%;
`;
export const FormInput = styled(Input)`
	width: 100%;
	&::after {
		border-bottom: 2px solid #e3165b !important;
	}
`;

export const DialogFooter = styled(DialogActions)`
	display: flex;
	flex-direction: row;
	justify-content: space-between !important;
`;
