import { useDispatch, useSelector } from 'react-redux';
import { getEvent, reset } from '../features/event/eventSlice';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaWpforms, FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import Create from './Create';
import Join from './Join';
import { getAllEvents, reset as reset2 } from '../features/event/eventSlice';
import ViewEvents from '../components/ViewEvents';

const Event = () => {
  const { org } = useSelector((state) => state.org);
  const { event, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.event
  );

  const [modalIsOpen, setmodalIsOpen] = useState(false);

  const [opener, setopener] = useState(-1);
  const params = useParams();
  const dispatch = useDispatch();
  const { eventId } = useParams();
  // console.log(org);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getEvent(eventId));
    // dispatch(getAllEvents(orgId));
  }, [eventId]);
  return (
    <>
      <div className='event-box'>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div className='title'>
            <div style={{ fontSize: '20px' }}>Event name: {event.name}</div>
            <div style={{ fontSize: '15px' }}>Event org : {org.name}</div>
          </div>
          <div className='title'>
            <div style={{ fontSize: '15px' }}>
              {/* {event.dateStart.slice(0, 10)} */}
            </div>
            {/* <div style={{ fontSize: '15px' }}>{event.dateEnd.slice(0, 10)}</div> */}
          </div>
        </div>
        <div className='content'>
          <div className='cont-inner'>Event Description : {event.desc}</div>
        </div>
      </div>
    </>
  );
};

export default Event;
