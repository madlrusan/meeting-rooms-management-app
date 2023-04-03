import { Button, Dialog } from "react-native-paper";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const ActionsContainer =  styled(Dialog.Actions)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const ButtonStyle = {
    width: "20%",
    backgroundColor: "#28353a",
    borderRadius: 20,
    textColor: "#fff",
}
export const ConfirmPin = styled(Dialog.Content)`
    align-items: center;
    text-align: center;
`;
export const ConfirmPinContainer = styled(Dialog)`
    /* height: 600px; */
    z-index:1000;
`;

export const ConfirmModalContainer = styled(Dialog)`
    height: 300px;
    margin-bottom: 30%;
`;

const {height, width} = Dimensions.get('screen');

export const avoidingView = {
    borderRadius: 10,
    flex: 1,
    height: height + 50,
    marginBottom: height + 100,
    paddingBottom: height + 100
    // width: height + 70
}