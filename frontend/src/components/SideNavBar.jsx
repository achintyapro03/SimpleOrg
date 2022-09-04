import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { deleteEvent } from '../features/event/eventSlice';
import { useNavigate } from 'react-router-dom';

const SideNavBar = ({ props }) => {
  const [open, setOpen] = useState(false);
  const naviagte = useNavigate();
  const { event } = useSelector((state) => state.event);
  const { org } = useSelector((state) => state.org);

  const onClick1 = () => {
    setOpen(!open);
  };

  const onClick2 = () => {
    dispatch(deleteEvent(event._id));

    naviagte(`/org/${org._id.toString()}`);
    // document.location.reload();
  };

  const dispatch = useDispatch();

  return (
    <>
      <div
        className='sidenav'
        style={{
          width: open ? '25vw' : '60px',
          marginTop: '67px',
          // paddingRight: '60px',
        }}
      >
        {open ? (
          <>
            <div className='sidenav-head'>
              <button
                className=''
                style={{
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  border: 'none',
                  fontSize: '30px',
                  paddingTop: '60px',
                }}
                onClick={onClick1}
              >
                <FaArrowLeft />
              </button>
            </div>
            <div className='sidenav-btn'>
              <button onClick={onClick2}>Delete Event</button>
              <button>Edit Event </button>
            </div>
          </>
        ) : (
          <>
            <button
              className=''
              style={{
                color: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                border: 'none',
                fontSize: '50px',
                paddingLeft: '10px',
              }}
              onClick={onClick1}
            >
              &#9776;
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default SideNavBar;
