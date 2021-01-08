export function drawDot({context, x, y, radius, color}) {
  context.beginPath();
  context.fillStyle = color;

  context.arc(x, y, radius, 0, 2 * Math.PI, true);

  context.fill();
}

export function getDotsPos(splitDist): number[] {
  let dotsCount = window.innerWidth / splitDist;
  let splitLocs: number[] = Array.from({ length: dotsCount }).fill(0).map((_, idx) => (idx - ((dotsCount - 0.5) / 2)) * splitDist);
  return splitLocs;
}

export function getInPhase(percentage: number) {
  return 3.14 - (percentage * 3.14 / 100);
}

export function generateLoaderConfig(width, height) {
  return {
    amplitude: height / 12,
    frequency: width / 10,
    yoffset: height / 2,
    speed: 25,
    basePhase: 0,
    retardationRate: 0.5,
    dotsDist: width / 10,
    dotRadius: 2 + (width / 600)
  };
}
