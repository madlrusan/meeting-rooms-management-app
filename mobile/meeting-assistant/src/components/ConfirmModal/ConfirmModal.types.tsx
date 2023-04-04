import moment from "moment";
import React from "react";

export const getDialogTitle = (actionType: string) => {
	switch (actionType) {
		case "Cancel":
			return "Cancel the meeting";
		case "Start":
			return "Start a meeting now";
	}
};

export const getStartTime = () => {
	return {
		hour: parseInt(moment().format("HH")),
		minutes: parseInt(moment().format("mm")),
	};
};
export const getEndTime = (startTime: { hour: number; minutes: number }) => {
	let diffMinutes = 0;
	if (startTime.minutes < 15) {
		diffMinutes = 15 - startTime.minutes;
	} else if (startTime.minutes < 30) {
		diffMinutes = 30 - startTime.minutes;
	} else if (startTime.minutes < 45) {
		diffMinutes = 45 - startTime.minutes;
	} else diffMinutes = 15 - startTime.minutes;
	let endHour = startTime.hour;
	if (startTime.minutes > 45) {
		endHour = startTime.hour + 1;
	}
	return { endHour, diffMinutes };
};
