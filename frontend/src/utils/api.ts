import { FormValues } from '../components/Wall/types';

const apiUrl =
  process.env.API_URL || 'https://digital-republic-code-challenge.onrender.com';

export const submitFormData = async (formData: FormValues) => {
  try {
    const url = `${apiUrl}/calculate`;
    const response = await fetch(url, {
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
