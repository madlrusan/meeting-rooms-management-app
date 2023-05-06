import React, { useEffect, useState } from "react";
import { ClockText, DateText } from "./MainScreen.Components";
import moment from "moment";
import { StatusTypes } from "../../dto/enums/Status.enums";

export const Clock = () => {
	// const now = new Date(2023,3,26,9,5,0);
	const [time, setTime] = useState(moment().format("hh:mm:ss"));
	const [date, setDate] = useState(moment().format("DDD, D MMM YYYY"));
	useEffect(() => {
		const interval_time = setInterval(() => {
			setTime(moment().format("HH:mm:ss"));
		}, 500);
		const interval_date = setInterval(() => {
			setDate(moment().format("ddd, D MMM YYYY"));
		}, 500);
		return () => {
			clearInterval(interval_time);
			clearInterval(interval_date);
		};
	}, []);
	return (
		<>
			<ClockText>{time}</ClockText>
			<DateText>{date}</DateText>
		</>
	);
};

export const getButtonText = (status: StatusTypes) => {
	switch (status) {
		case StatusTypes.Busy:
			return "Cancel";
		case StatusTypes.Available:
			return "Start";
		case StatusTypes.Reserved:
			return "Start";
	}
};
