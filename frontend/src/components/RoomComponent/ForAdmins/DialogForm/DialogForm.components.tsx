import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import styled from "styled-components";

export const ButtonsContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const CancelButton = styled(ButtonComponent)`
	background-color: grey !important;
	color: white !important;

	&:hover {
		background-color: lightgrey !important;
		color: black !important;
	}
`;
export const SubmitButton = styled(ButtonComponent)`
	&:hover {
		background-color: #e2bdc9 !important;
		color: black !important;
	}
`;
