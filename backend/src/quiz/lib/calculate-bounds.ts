export default function calculateBounds({
  difficulty,
  efficiency,
  delta,
}: {
  difficulty: number;
  efficiency: number;
  delta: number;
}) {
  if (efficiency >= 0.8) {
    return { lowerBound: difficulty, upperBound: difficulty + 2 * delta };
  } else if (efficiency < 0.5) {
    return { lowerBound: difficulty - 2 * delta, upperBound: difficulty };
  } else {
    return { lowerBound: difficulty - delta, upperBound: difficulty + delta };
  }
}
