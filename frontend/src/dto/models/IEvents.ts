export interface IEvents {
	Id: number;
	Subject: string;
	StartTime: Date;
	EndTime: Date;
	IsAllDay?: boolean;
	RecurrenceRule: string;
	RecurrenceID?: number;
	RecurrenceExceptions?: string;
	Notes: string;
	RoomId: string;
	HostId: string;
}
