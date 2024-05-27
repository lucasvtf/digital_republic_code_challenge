import supertest from 'supertest';
import { StatusCodes } from 'http-status-codes';
import app from '../../src/app';
import { Wall } from 'src/service/paintService';

const request = supertest(app);

describe('PAINT ROUTE', () => {
  it('Should return [200 - OK] when calculate with success', async () => {
    // ARRANGE
    const input: Wall[] = [
      { width: 4, height: 2.2, doors: 1, windows: 0 },
      { width: 4, height: 3, doors: 0, windows: 0 },
      { width: 4, height: 3, doors: 0, windows: 0 },
      { width: 4, height: 3, doors: 0, windows: 0 },
    ];

    // ACT
    const { status, body } = await request
      .post('/calculate')
      .send({ walls: input });

    // ASSERT
    expect(status).toBe(StatusCodes.OK);
    expect(body.tintaNecessaria).toBe('8.66 litros');
    expect(body.latasSugeridas).toMatchObject({
      '0.5L': 3,
      '3.6L': 2,
    });
  });

  it('Should return [422 - UNPROCESSABLE ENTITY] when calculate with wrong parameters', async () => {
    // ARRANGE
    const input: Wall[] = [
      { width: 4, height: 2, doors: 1, windows: 0 },
      { width: 4, height: 3, doors: 0, windows: 0 },
      { width: 4, height: 3, doors: 0, windows: 0 },
      { width: 4, height: 3, doors: 0, windows: 0 },
    ];

    // ACT
    const { status, body } = await request
      .post('/calculate')
      .send({ walls: input });

    // ASSERT
    expect(status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(body.message).toBe(
      'A altura da parede 1 deve ser no mínimo 30cm mais alta que a altura da porta.'
    );
  });
});
