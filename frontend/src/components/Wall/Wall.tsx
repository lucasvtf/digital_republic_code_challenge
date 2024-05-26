import { useState } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import './Wall.css';
import { FormValues } from './types';
import ResponseBox from '../ResponseBox/ResponseBox';
import { ErrorResponse, SuccessResponse } from '../ResponseBox/types';
import { submitFormData } from '../../utils/api';

const WallForm = () => {
  const { register, control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      walls: Array(4).fill({ height: 0, width: 0, doors: 0, windows: 0 }),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'walls',
  });

  const [response, setResponse] = useState<
    SuccessResponse | ErrorResponse | null
  >(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const responseData = await submitFormData(data);
      setResponse(responseData);
      if (!responseData.message) {
        reset();
      }
    } catch (error) {
      setResponse({ message: 'Erro ao enviar os dados.' });
    }
  };

  const closeResponseBox = () => {
    setResponse(null);
  };

  return (
    <form className='form-container' onSubmit={handleSubmit(onSubmit)}>
      <div className='walls-container'>
        {fields.map((wall, index) => (
          <div className='wall-card' key={wall.id}>
            <h3>Parede {index + 1}</h3>
            <label>
              Altura:
              <input
                type='number'
                step='0.01'
                {...register(`walls.${index}.height`, { required: true })}
              />
            </label>
            <label>
              Comprimento:
              <input
                type='number'
                step='0.01'
                {...register(`walls.${index}.width`, { required: true })}
              />
            </label>
            <label>
              Número de portas:
              <input
                type='number'
                {...register(`walls.${index}.doors`, {
                  required: true,
                  min: 0,
                })}
              />
            </label>
            <label>
              Número de janelas:
              <input
                type='number'
                {...register(`walls.${index}.windows`, {
                  required: true,
                  min: 0,
                })}
              />
            </label>
          </div>
        ))}
      </div>
      <div className='button-container'>
        <button type='submit' className='submit-btn'>
          Enviar
        </button>
      </div>
      {response && (
        <ResponseBox responseData={response} onClose={closeResponseBox} />
      )}
    </form>
  );
};

export default WallForm;
