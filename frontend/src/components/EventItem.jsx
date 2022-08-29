import { Link } from 'react-router-dom';
import { getEvent } from '../features/event/eventSlice';
import { useDispatch } from 'react-redux';

const EventItem = ({ event }) => {
  // var status = 'no';
  const dispatch = useDispatch();
  return (
    <div className='ticket'>
      <div className=''>
        {new Date(event.createdAt).toLocaleString('en-US')}
      </div>
      <div>{event.name}</div>
      <Link
        to={`/event/${event._id}`}
        className='link-special-2'
        style={{ textAlign: 'center' }}
      >
        View
      </Link>
    </div>
    // <>looser</>
  );
};

export default EventItem;
