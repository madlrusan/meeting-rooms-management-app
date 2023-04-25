export interface IEvents {
	Id: number;
	Subject: string;
	StartTime: Date;
	EndTime: Date;
	IsAllDay?: boolean;
	RecurrenceRule: string;
	RecurrenceID?: number;
	RecurrenceException?: string;
	Description: string;
	RoomId: string;
	HostId: string;
}
