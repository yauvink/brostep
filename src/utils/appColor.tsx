export const generateRandomGradient = (): string => {
  const randomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.floor(Math.random() * 30) + 60; // 60-90%
    const lightness = Math.floor(Math.random() * 20) + 75; // 75-95%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  const angle = Math.floor(Math.random() * 360);
  const color1 = randomColor();
  const color2 = randomColor();

  return `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`;
};
