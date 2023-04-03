import React, { useState } from "react";
import { StatusTypes } from "../../dto/Status.enums";
import { MainContainer, RoomDetails, LeftContainer, ScreenDivider, SmallDivider, ScheduleContainer, HostText, SubjectText, MiddleDivider, StatusText, RoomNameText, RoomCircle, BottomView, DisplayButton, ButtonStyle } from "../../components/MainScreenComponents/MainScreen.Components";
import { ScheduleCard } from "./ScheduleCards";
import { Clock, getButtonText } from "../../components/MainScreenComponents/MainScreen.types";
import { ConfirmModal } from "../../components/ConfirmModal/ConfirmModal";

export const MainScreen = () => {
    // use context --> to get room details
    const [visible, setVisible] = useState(false);
    const GlobalStatus = StatusTypes.Available;
    const ButtonText = getButtonText(GlobalStatus);
    return (
        <MainContainer>
            <LeftContainer status={GlobalStatus}>
                <Clock />
                <SmallDivider />
                <ScheduleContainer>
                    <ScheduleCard  />
                </ScheduleContainer>
            </LeftContainer>
            <ScreenDivider  />
            <RoomDetails>
                <HostText>
                    Hosted by Nume Prenume
                </HostText>
                <SubjectText>Meeting Title</SubjectText>
                <MiddleDivider  />
                <StatusText>
                    {GlobalStatus.toUpperCase()}
                </StatusText>
                <BottomView>
                    <DisplayButton type="solid" buttonStyle={ButtonStyle} onPress={() => {
                        setVisible(true);
                    }}>{ButtonText}</DisplayButton>
                    <RoomCircle status={GlobalStatus}>
                        <RoomNameText>
                            Room Nelson Mandela
                        </RoomNameText>
                    </RoomCircle>
                </BottomView>
            </RoomDetails>
            <ConfirmModal visible={visible} setVisible={setVisible} actionType={ButtonText} /> 
        </MainContainer>
    );
}