import {
  CalculatePaintRequirements,
  Wall,
} from '../../src/service/paintService';

describe('CalculatePaintRequirements Class', () => {
  it('Should throw when a room does not contain exactly four walls', () => {
    // ARRANGE
    const input: Wall[] = [{ width: 4, height: 3, doors: 1, windows: 1 }];

    // ASSERT
    expect(() => new CalculatePaintRequirements(input)).toThrow(
      'Uma sala deve conter exatamente 4 paredes.'
    );
  });

  it('Should throw when area of doors and windows exceed 50%', () => {
    // ARRANGE
    const input: Wall[] = [
      { width: 0.5, height: 3, doors: 1, windows: 1 },
      { width: 60, height: 3, doors: 1, windows: 1 },
      { width: 4, height: 3, doors: 1, windows: 1 },
      { width: 4, height: 3, doors: 1, windows: 1 },
    ];

    // ASSERT
    expect(() => new CalculatePaintRequirements(input)).toThrow(
      'A área de portas e janelas na parede 1 não pode exceder 50% da área da parede.'
    );
  });

  it('Should throw when the wall is not between 1 and 50 square meters', () => {
    // ARRANGE
    const input: Wall[] = [
      { width: 0.5, height: 1, doors: 0, windows: 0 },
      { width: 100, height: 0.6, doors: 0, windows: 0 },
      { width: 4, height: 3, doors: 0, windows: 0 },
      { width: 4, height: 3, doors: 0, windows: 0 },
    ];

    // ASSERT
    expect(() => new CalculatePaintRequirements(input)).toThrow(
      'A parede 1 deve ter entre 1 e 50 metros quadrados.'
    );
  });

  it('Should throw when doors are not 30cm taller than the height of the door', () => {
    // ARRANGE
    const input: Wall[] = [
      { width: 4, height: 2, doors: 1, windows: 0 },
      { width: 4, height: 3, doors: 0, windows: 0 },
      { width: 4, height: 3, doors: 0, windows: 0 },
      { width: 4, height: 3, doors: 0, windows: 0 },
    ];

    // ASSERT
    expect(() => new CalculatePaintRequirements(input)).toThrow(
      'A altura da parede 1 deve ser no mínimo 30cm mais alta que a altura da porta.'
    );
  });

  it('Should calculate with success', () => {
    // ARRANGE
    const input: Wall[] = [
      { width: 4, height: 2.2, doors: 1, windows: 0 },
      { width: 4, height: 3, doors: 0, windows: 0 },
      { width: 4, height: 3, doors: 0, windows: 0 },
      { width: 4, height: 3, doors: 0, windows: 0 },
    ];

    // ACT
    const service = new CalculatePaintRequirements(input);
    const result = service.calculate();

    // ASSERT
    expect(result.necessaryPaint).toBe('8.66 litros');
    expect(result.suggestedCans).toMatchObject({ '0.5L': 3, '3.6L': 2 });
  });
});
