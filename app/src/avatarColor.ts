const hash = (s: string): number => {
  let h:number = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h) + s.charCodeAt(i) | 0;
  return Math.abs(h);
};
export const colorForAuthor = (name: string): string =>
  `hsl(${hash(name) % 360}, 70%, 45%)`;
