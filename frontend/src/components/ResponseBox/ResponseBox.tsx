import './ResponseBox.css';
import { ResponseBoxProps } from './types';

const ResponseBox = ({ message, type, onClose }: ResponseBoxProps) => {
  return (
    <div className={`response-box ${type}`}>
      <p>{message}</p>
      <button className='ok-btn' onClick={onClose}>
        OK
      </button>
    </div>
  );
};

export default ResponseBox;
