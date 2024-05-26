interface IPaintRequirements {
  calculate(): any;
}

export type Wall = {
  width: number;
  height: number;
  doors: number;
  windows: number;
};

export type CalculateResult = {
  necessaryPaint: string;
  suggestedCans: Record<string, number>;
};

export class CalculatePaintRequirements implements IPaintRequirements {
  private walls: Wall[];
  private portArea: number;
  private windowArea: number;
  private coveragePerLiter: number;
  private availableCans: number[];

  constructor(walls: Wall[]) {
    this.portArea = 0.8 * 1.9;
    this.windowArea = 2.0 * 1.2;
    this.coveragePerLiter = 5;
    this.availableCans = [18, 3.6, 2.5, 0.5];
    this.checkWallsLength(walls);
    this.checkPaintRequirements(walls);
  }

  private checkWallsLength(walls: Wall[]): void {
    if (walls.length !== 4) {
      throw new Error('Uma sala deve conter exatamente 4 paredes.');
    }
  }

  private checkPaintRequirements(walls: Wall[]): void {
    this.walls = walls.map(({ width, height, doors, windows }, index) => {
      const wallArea = this.calculateSquareArea(height, width);
      const wallWindowArea =
        this.calculateSquareArea(doors, this.portArea) +
        this.calculateSquareArea(windows, this.windowArea);
      if (wallArea < 1 || wallArea > 50) {
        throw new Error(
          `A parede ${index + 1} deve ter entre 1 e 50 metros quadrados.`
        );
      }
      if (wallWindowArea > wallArea * 0.5) {
        throw new Error(
          `A área de portas e janelas na parede ${
            index + 1
          } não pode exceder 50% da área da parede.`
        );
      }
      if (doors > 0 && height <= 1.9 + 0.3) {
        throw new Error(
          `A altura da parede ${
            index + 1
          } deve ser no minimo 30cm mais alta que a altura da porta.`
        );
      }
      return { width, height, doors, windows };
    });
  }

  private calculateSquareArea(height: number, width: number): number {
    return height * width;
  }

  public calculate(): CalculateResult {
    const necessaryPaint = this.calculateRequiredPaint();
    const suggestedCans = this.suggestCans(necessaryPaint);

    return {
      necessaryPaint: `${necessaryPaint.toFixed(2)} litros`,
      suggestedCans,
    };
  }

  private calculateRequiredPaint(): number {
    const totalArea = this.walls.reduce(
      (acc, wall) => acc + this.calculateWallArea(wall),
      0
    );
    return totalArea / this.coveragePerLiter;
  }

  private calculateWallArea(wall: Wall): number {
    const wallArea = this.calculateSquareArea(wall.width, wall.height);
    const wallWindowArea =
      this.calculateSquareArea(wall.doors, this.portArea) +
      this.calculateSquareArea(wall.windows, this.windowArea);
    return wallArea - wallWindowArea;
  }

  private suggestCans(necessaryPaint: number): Record<string, number> {
    const suggestedCans: Record<string, number> = {};
    for (const can of this.availableCans) {
      const quantity = Math.floor(necessaryPaint / can);
      if (quantity > 0) {
        suggestedCans[`${can}L`] = quantity;
        necessaryPaint -= quantity * can;
      }
    }

    if (necessaryPaint > 0) {
      suggestedCans[`${this.availableCans[this.availableCans.length - 1]}L`] =
        (suggestedCans[
          `${this.availableCans[this.availableCans.length - 1]}L`
        ] || 0) + 1;
    }
    return suggestedCans;
  }
}
