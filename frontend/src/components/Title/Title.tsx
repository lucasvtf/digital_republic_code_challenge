import './Title.css';

const Title = () => {
  return (
    <div className='title-container'>
      <h1>
        Calculadora de Tinta{' '}
        <span role='img' aria-label='paint-can'>
          🎨
        </span>
      </h1>
    </div>
  );
};

export default Title;
