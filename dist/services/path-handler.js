"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const array_1 = require("../utils/array");
class PathHandlerService {
    calculateDistanceFromOrigin(origin, position) {
        const [originX, originY] = origin;
        const [positionX, positionY] = position;
        const distX = originX - positionX;
        const distY = originY - positionY;
        const dist = Math.sqrt(distX ** 2 + distY ** 2);
        return dist;
    }
    calculateNearestPosition(origin, positions) {
        return positions.reduce((nearest, pos) => {
            const distance = this.calculateDistanceFromOrigin(origin, pos.position);
            if (nearest.id === 0) {
                return { id: pos.id, distance };
            }
            if (distance < nearest.distance) {
                return {
                    id: pos.id,
                    distance,
                };
            }
            return nearest;
        }, {
            id: 0,
            distance: 0,
        });
    }
    // Algoritmo do Nearest Neighbor
    calculateBestPath(origin, positions, path = []) {
        const nearestIdentifiedDistance = this.calculateNearestPosition(origin, positions);
        const [nearestPosition, restPositions] = (0, array_1.popFind)(positions, (pos) => pos.id === nearestIdentifiedDistance.id);
        if (!nearestPosition) {
            return path;
        }
        if (restPositions.length === 0) {
            return [...path, nearestPosition];
        }
        return this.calculateBestPath(nearestPosition.position, restPositions, [
            ...path,
            nearestPosition,
        ]);
    }
}
exports.default = PathHandlerService;
