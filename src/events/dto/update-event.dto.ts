export class UpdateEventDto {
    title?: string;
    description?: string;
    date?: Date;
    location?: string;
    locationLat?: number;
    locationLon?: number;
    tags?: string[];
}
