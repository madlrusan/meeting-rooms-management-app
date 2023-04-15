export interface IRoom {
    roomId: string;
    roomName: string;
    roomCapacity: number;
    roomType: string;
    color?: string;
    roomFeatures? : string[];
    roomLocation? : string;
    roomLink?: string;
    roomEmail: string;
    roomPassword: string;
}