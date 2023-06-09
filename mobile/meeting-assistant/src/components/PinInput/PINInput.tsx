import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { LabelPINContainer, PINLabel } from "../ConfirmModal/ConfirmModal.components";
type PINProps = {
	value: string;
	setValue: (value: string) => void;
}
export const PINInput = (props: PINProps) => {
	const {value, setValue} = props;
	const [pins, setPins] = useState(["", "", "", ""]);
	const refs = [
		useRef<TextInput>(null),
		useRef<TextInput>(null),
		useRef<TextInput>(null),
		useRef<TextInput>(null),
	];

	const handleChangeText = (text: string, index: number) => {
		// Ensure input is numeric and limit to 1 digit
		const cleanedText = text.replace(/[^0-9]/g, "").substring(0, 1);

		const newPins = [...pins];
		newPins[index] = cleanedText;
		setPins(newPins);

		// Move focus to next input
		if (index < 3 && cleanedText) {
			refs[index + 1].current?.focus();
		}

		// Combine the entered digits and update the parent component's value
		const newValue = newPins.join("");
		setValue(newValue);
	};


	const renderPINInputs = () => {
		const inputs = [];
		for (let i = 0; i < 4; i++) {
			inputs.push(
				<View
					key={i}
					style={[styles.pinInput, pins[i] ? styles.pinInputFilled : null]}>
					<TextInput
						ref={refs[i]}
						style={styles.pinInputText}
						maxLength={1}
						keyboardType="numeric"
						secureTextEntry
						value={pins[i]}
						onChangeText={(text) => handleChangeText(text, i)}
						onSubmitEditing={() => {
							// Move focus to next input
							if (i < 3 && pins[i]) {
								refs[i + 1].current?.focus();
							}
						}}
					/>
				</View>
			);
		}
		return inputs;
	};

	return (
		<LabelPINContainer>
			<PINLabel>Enter your PIN</PINLabel>
			<View style={styles.container}>{renderPINInputs()}</View>
		</LabelPINContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	pinInput: {
		borderWidth: 1,
		borderRadius: 5,
		marginHorizontal: 5,
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	pinInputFilled: {
		backgroundColor: "transparent",
	},
	pinInputText: {
		fontSize: 24,
	},
});

export default PINInput;
