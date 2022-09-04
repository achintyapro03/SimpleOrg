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
import SideNavBar from '../components/SideNavBar';
const Event = () => {
  const { org } = useSelector((state) => state.org);
  const { user } = useSelector((state) => state.auth);
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
  }, [eventId]);

  var { event, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.event
  );
  // console.log(event);

  return (
    <>
      {org.admin.toString() === user._id.toString() ? <SideNavBar /> : <></>}

      <div className='event-box' style={{ marginLeft: '60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div className='titlex'>
            <div style={{ fontSize: '20px' }}>Event name: {event.name}</div>
            <div style={{ fontSize: '15px' }}>Event org : {org.name}</div>
          </div>
          <div className='titlex'>
            <div style={{ fontSize: '15px' }}>
              Start Date: {event.dateStart.slice(0, 10)}
            </div>
            <div style={{ fontSize: '15px' }}>
              End Date: {event.dateEnd.slice(0, 10)}
            </div>
          </div>
        </div>
        <div className='content'>
          <div className='cont-inner'>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <b> Event Description </b>
            </div>{' '}
            {event.desc}
          </div>
        </div>
      </div>
    </>
  );
};

export default Event;
