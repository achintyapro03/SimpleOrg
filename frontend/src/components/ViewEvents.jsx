import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEvents, reset, getAllEvents } from '../features/event/eventSlice';
import EventItem from './EventItem';

const ViewEvents = ({ getAllEvents }) => {
  const { events, isLoading, isSuccess } = useSelector((state) => state.event);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <>
      <div>
        <h4 style={{ margin: '10px', marginBottom: '30px' }}>Events</h4>
      </div>

      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Name</div>
          <div>Active</div>
        </div>
        <div style={{ overflowY: 'scroll', maxHeight: '40vh' }}>
          {events.map((event) => (
            <EventItem key={event._id} event={event} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewEvents;
