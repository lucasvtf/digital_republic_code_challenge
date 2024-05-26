import { FormValues } from '../components/Wall/types';

export const submitFormData = async (formData: FormValues) => {
  try {
    const response = await fetch('http://localhost:8000/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    return await response.json();
  } catch (error) {
    throw new Error('Erro ao conectar-se ao servidor.');
  }
};
