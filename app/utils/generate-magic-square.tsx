export function generateMagicSquare(dob: Date): { square: number[][], magicConstant: number } {
  const A = dob.getDate();
  const B = dob.getMonth() + 1; // JS months 0-11
  const C = Math.floor(dob.getFullYear() / 100);
  const D = Math.floor(dob.getFullYear() % 100);

  // Magic constant for 4x4
  const S = A + B + C + D;

  const square: number[][] = [
    [A, B, C, D],
    [D + 1, C - 1, B - 3, A + 3],
    [B - 2, A + 2, D + 2, C - 2],
    [C + 1, D - 1, A + 1, B - 1]
  ];

  return { square: square, magicConstant: S };
}