import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import './Wall.css';
import { FormValues } from './types';

const Wall = () => {
  const { register, control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      walls: Array(4).fill({ height: 0, width: 0, doors: 0, windows: 0 }),
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'walls',
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
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
            <button
              type='button'
              className='remove-btn'
              onClick={() => remove(index)}
            >
              Remover parede
            </button>
          </div>
        ))}
      </div>
      <div className='button-container'>
        <button
          type='button'
          className='add-btn'
          onClick={() => append({ height: 0, width: 0, doors: 0, windows: 0 })}
        >
          Adicionar parede
        </button>
        <button type='submit' className='submit-btn'>
          Enviar
        </button>
      </div>
    </form>
  );
};

export default Wall;
