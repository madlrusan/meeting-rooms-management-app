import { List } from "@mui/material";
import styled from "styled-components";

export const PermanentMenuList = styled(List)`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: baseline;
    margin-top: auto !important;
`;

export const MenuList = styled(List)`
    display: flex;
    flex-direction: column;
    margin: auto !important;
    gap: 5vh;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-evenly;
    align-items: center;
`;