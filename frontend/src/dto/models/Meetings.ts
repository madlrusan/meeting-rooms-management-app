export interface IMeetings {
    id: number;
    creatorId: number;
    name: string;
    startDateTime: string;
    endDateTime: string;
    participantsId: number[];
}

export const Meetings : IMeetings[] = [
	{
		"id": 1,
		"creatorId": 2,
		"name": " Event 87",
		"startDateTime": "2023-02-22T12:30",
		"endDateTime": "2023-02-22T22:30",
		"participantsId": [1,2,3,4]
	},
	{
		"id": 2,
		"creatorId": 3,
		"name": " Event 87",
		"startDateTime": "2023-02-22T12:30",
		"endDateTime": "2023-02-22T22:30",
		"participantsId": [1,2,3,4]
	},
];
