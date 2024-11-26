import { Injectable } from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {AnalyzeEventDto} from "./dto/analyze-event.dto";

@Injectable()
export class EventAnalysisService {
    constructor(private readonly prisma: PrismaService) {}

    /**
     * Analyzes the most similar event based on the provided details of the new event.
     * @param newEventDetails - Details of the new event.
     */
    async analyzeSimilarity(newEventDetails: AnalyzeEventDto) {
        const { locationLat, locationLon, tags } = newEventDetails;

        // Fetch all events to calculate similarity
        const events = await this.prisma.event.findMany({
            include: { tags: true },
        });

        let mostSimilarEvent = null;
        let highestSimilarityScore = 0;

        // Iterate through each event to calculate similarity score
        for (const event of events) {
            const tagScore = this.calculateTagSimilarity(tags, event.tags.map((tag) => tag.name));
            const locationScore = this.calculateLocationSimilarity(locationLat, locationLon, event.locationLat, event.locationLon);

            // Weight for scoring (you can adjust these weights)
            const similarityScore = tagScore * 0.6 + locationScore * 0.4;

            if (similarityScore > highestSimilarityScore) {
                highestSimilarityScore = similarityScore;
                mostSimilarEvent = event;
            }
        }

        return {
            mostSimilarEvent,
            similarityScore: highestSimilarityScore,
        };
    }

    /**
     * Calculates tag similarity using a Jaccard-like approach.
     * @param tags1 - Tags of the new event.
     * @param tags2 - Tags of an existing event.
     */
    private calculateTagSimilarity(tags1: string[], tags2: string[]): number {
        const set1 = new Set(tags1);
        const set2 = new Set(tags2);

        const intersection = [...set1].filter((tag) => set2.has(tag)).length;
        const union = new Set([...tags1, ...tags2]).size;

        return union === 0 ? 0 : intersection / union;
    }

    /**
     * Calculates location similarity based on geographical distance.
     * @param lat1 - Latitude of the new event.
     * @param lon1 - Longitude of the new event.
     * @param lat2 - Latitude of the existing event.
     * @param lon2 - Longitude of the existing event.
     */
    private calculateLocationSimilarity(lat1: number, lon1: number, lat2: number, lon2: number): number {
        if (lat1 == null || lon1 == null || lat2 == null || lon2 == null) {
            return 0; // Return 0 similarity if any location is missing
        }

        const distance = this.getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2);
        const maxDistance = 500; // Set a max distance threshold for scoring

        return Math.max(0, 1 - distance / maxDistance); // Normalize to a range of 0 to 1
    }

    /**
     * Calculates distance between two geographical points using the Haversine formula.
     * @param lat1 - Latitude of the first point.
     * @param lon1 - Longitude of the first point.
     * @param lat2 - Latitude of the second point.
     * @param lon2 - Longitude of the second point.
     */
    private getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in kilometers
    }

    /**
     * Converts degrees to radians.
     * @param deg - Angle in degrees.
     */
    private deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }
}
