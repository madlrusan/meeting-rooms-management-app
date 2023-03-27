import { Card } from "@mui/material";
import styled from "styled-components";

export const MainContainer  = styled(Card)`
    background: #cecece;
    padding: 2%;
    position: absolute;
    width: 75%;
    height: 75%;
    margin: 10vh 15vw 25vh 16vw;
    border-radius: 5vh !important;
    /* height: 100%;
    width: 80%; */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: stretch;
    justify-content: space-around;
    align-items: center;
    row-gap: 1vh;
    column-gap: 2vh;
`;