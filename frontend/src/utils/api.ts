import { FormValues } from '../components/Wall/types';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';

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
