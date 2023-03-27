import { Button, Card, FilledInput, FormGroup } from "@mui/material";
import styled from "styled-components";


export const CardContainer = styled(Card)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5%;
    gap: 50%;
    margin:  5%;
    position: relative;
    border-radius: 32px !important;
    backdrop-filter: blur(50px);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 32px;
    > #rs-wrapper {
        border-radius: 10px !important;
    }
`;

export const InputGroup = styled(FormGroup)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;

    position: relative;
    width: 100%;
`;

export const FormContainer = styled.div`
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    gap:2vh;
`;

export const FormInput = styled(FilledInput)`
    width: 50vw;
`;

export const SubmitButton = styled(Button)`
margin-top: 2vh !important;
    width: 50vw;
`;

