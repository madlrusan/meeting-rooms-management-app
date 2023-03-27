export interface IRoom {
    roomId: number;
    name: string;
    capacity: number;
    type: string;
    color: string;
    features : string[];
    location? : string;
    link?: string;
}