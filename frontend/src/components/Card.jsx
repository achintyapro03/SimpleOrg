import { Link } from 'react-router-dom';
import { joinOrg } from '../features/org/orgSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { joinEvent } from '../features/event/eventSlice';

function Card({ org }) {
  //   console.log(org);
  //   const onClick = (e) => {
  // e.preventDefault();

  //   };
  const o = org[0];
  const cond = org[1];
  const dispatch = useDispatch();
  const { isSuccess } = useSelector((state) => state.org);

  return cond === 1 ? (
    <>
      <div className='title-2'>
        <div>{o.name}</div>
        <div>{o.email}</div>

        <button
          className='link-special-2'
          style={{
            borderColor: 'white',
            color: 'white',
            width: '120px',
            margin: 'auto',
            padding: '8px 0px',
          }}
          onClick={(e) => {
            console.log('hello');
            e.preventDefault();
            try {
              dispatch(joinOrg(o._id));
            } catch {
              toast.error('U have already joined');
            }
            if (isSuccess) toast.info('Event joined');
          }}
        >
          Join
        </button>
      </div>
    </>
  ) : (
    <>
      {' '}
      <div className='title-2'>
        <div>{o.name}</div>
        <div>{o.email}</div>

        <button
          className='link-special-2'
          style={{
            borderColor: 'white',
            color: 'white',
            width: '120px',
            margin: 'auto',
            padding: '8px 0px',
          }}
          onClick={(e) => {
            console.log('hello');
            e.preventDefault();
            try {
              dispatch(joinEvent(o._id));
            } catch {
              toast.error('U have already joined');
            }
            if (isSuccess) toast.info('Event joined');
          }}
        >
          Join
        </button>
      </div>
    </>
  );
}

export default Card;
