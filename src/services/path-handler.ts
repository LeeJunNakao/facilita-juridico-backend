import { popFind } from '@src/utils/array';

export type Coord = [number, number];
export type IdentifiedPosition = { id: number; position: Coord };

class PathHandlerService {
  calculateDistanceFromOrigin(origin: Coord, position: Coord) {
    const [originX, originY] = origin;
    const [positionX, positionY] = position;

    const distX = originX - positionX;
    const distY = originY - positionY;

    const dist = Math.sqrt(distX ** 2 + distY ** 2);

    return dist;
  }

  calculateNearestPosition(origin: Coord, positions: IdentifiedPosition[]) {
    return positions.reduce(
      (nearest, pos) => {
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
      },
      {
        id: 0,
        distance: 0,
      },
    );
  }

  // Algoritmo do Nearest Neighbor
  calculateBestPath<T extends IdentifiedPosition>(
    origin: Coord,
    positions: T[],
    path: T[] = [],
  ): T[] {
    const nearestIdentifiedDistance = this.calculateNearestPosition(
      origin,
      positions,
    );

    const [nearestPosition, restPositions] = popFind(
      positions,
      (pos) => pos.id === nearestIdentifiedDistance.id,
    );

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

export default PathHandlerService;
