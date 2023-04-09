import { Card } from "@mui/material";
import styled from "styled-components";

export const MainContainer = styled(Card)`
	background: #cecece;
	padding: 2%;
	position: fixed;
	height: 75%;
	margin: 100px 5% 25% 280px;
	display: flex;
	flex-flow: row wrap;
	place-content: stretch space-around;
	-webkit-box-align: center;
	align-items: center;
	gap: 1vh 2vh;
	border-radius: 5vh !important;
`;
