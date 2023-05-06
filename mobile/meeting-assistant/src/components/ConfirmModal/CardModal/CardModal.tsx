import { ConfirmModalContainer, avoidingView } from "../ConfirmModal.components";
import { getDialogTitle } from "../ConfirmModal.types";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { Button, Dialog } from "react-native-paper";
export type CardModalProps = {
	visible: boolean;
	setVisible: (value: boolean) => void;
	actionType: string;
};
export const CardModal = (props: CardModalProps) => {
	const { visible, setVisible, actionType } = props;
	const DialogTitle = getDialogTitle(actionType);
	return (
		<ConfirmModalContainer
			visible={visible}
			isFromCard={true}
		>
			<KeyboardAvoidingView
				contentContainerStyle={avoidingView}
				behavior={Platform.OS === "ios" ? "padding" : "height"}
			>
				<Dialog.Title>{DialogTitle}</Dialog.Title>
			</KeyboardAvoidingView>
		</ConfirmModalContainer>
	);
};
