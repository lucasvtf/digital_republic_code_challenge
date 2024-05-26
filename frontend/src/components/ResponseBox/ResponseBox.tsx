import './ResponseBox.css';
import { ErrorResponse, ResponseBoxProps, SuccessResponse } from './types';

const ResponseBox = ({ responseData, onClose }: ResponseBoxProps) => {
  const isErrorResponse = 'message' in responseData;

  return (
    <div className={`response-box ${isErrorResponse ? 'error' : 'success'}`}>
      {isErrorResponse ? (
        <p>{(responseData as ErrorResponse).message}</p>
      ) : (
        <>
          <p>
            Tinta necessária:{' '}
            {(responseData as SuccessResponse).tintaNecessaria}
          </p>
          <p>Latas sugeridas:</p>
          {Object.entries((responseData as SuccessResponse).latasSugeridas).map(
            ([size, count]) => (
              <p key={size}>{`${count} ${
                count === 1 ? 'lata' : 'latas'
              } de ${size}`}</p>
            )
          )}
        </>
      )}
      <button className='ok-btn' onClick={onClose}>
        OK
      </button>
    </div>
  );
};

export default ResponseBox;
