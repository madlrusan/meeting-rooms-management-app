import { IMeetings } from "./Meetings";
import { IRoom } from "./IRooms";

export interface IRoomWithMeetings {
    room: IRoom;
    meetings: IMeetings[];
}
