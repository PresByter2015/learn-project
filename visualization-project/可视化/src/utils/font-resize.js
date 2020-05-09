function calculateZoom(width, height, baseWidth, baseHeight) {
  return Math.min(width / baseWidth, height / baseHeight);
}

export { calculateZoom };
