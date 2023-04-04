import moment from "moment";
export type EventTimeInterval = {
	startTime: string;
	endTime: string;
};

export const getTimeIntervals: () => EventTimeInterval[] = () => {
	const timeIntervals: EventTimeInterval[] = [];
	const startHour = 8;
	const endHour = 19;
	const intervalMinutes = 15;
	for (let i = startHour; i < endHour; i++) {
		for (let j = 0; j < 60; j += intervalMinutes) {
			const startTime = moment().hour(i).minute(j).format("HH:mm");
			const endTime = moment()
				.hour(i)
				.minute(j + intervalMinutes)
				.format("HH:mm");
			timeIntervals.push({ startTime, endTime });
		}
	}
	return timeIntervals;
};
