import Entity from "./entity";

export default interface User extends Entity {
    uid: string;
    lat: number;
    lng: number;
    lastUpdate: number;
}