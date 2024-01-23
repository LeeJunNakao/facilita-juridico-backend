import PathHandlerService, {
  Coord,
  IdentifiedPosition,
} from '@src/services/path-handler';

describe('Test path ', () => {
  const sut = new PathHandlerService();
  const positions: IdentifiedPosition[] = [
    { id: 1, position: [5, 3] },
    { id: 2, position: [2, 7] },
    { id: 3, position: [1, 2] },
    { id: 4, position: [0, 5] },
    { id: 5, position: [3, 2] },
  ];

  test('Calculate distances from center', () => {
    const origin: Coord = [0, 0];

    const points: Coord[] = [
      [5, 3],
      [-7, 2],
      [-7, -8],
      [5, -1],
    ];

    const expectedDistances = [
      Math.sqrt(34),
      Math.sqrt(53),
      Math.sqrt(113),
      Math.sqrt(26),
    ];

    const calculatedDistances = points.map((pos) =>
      sut.calculateDistanceFromOrigin(origin, pos),
    );

    expect(calculatedDistances).toEqual(expectedDistances);
  });

  test('Calculate nearest position', () => {
    const origin: Coord = [0, 0];

    const nearestCalculated = sut.calculateNearestPosition(origin, positions);

    expect(nearestCalculated.id).toEqual(3);

    const distances = positions.map((p) =>
      sut.calculateDistanceFromOrigin(origin, p.position),
    );
    const nearestDistance = Math.min(...distances);

    expect(nearestCalculated.distance).toBe(nearestDistance);
  });

  test('Calculate best path', () => {
    const origin: Coord = [0, 0];

    const bestPath = sut.calculateBestPath(origin, positions);

    expect(bestPath.map((i) => i.id)).toEqual([3, 5, 1, 2, 4]);
  });
});
