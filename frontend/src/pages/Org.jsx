import { useDispatch, useSelector } from 'react-redux';
import { getOrg, reset } from '../features/org/orgSlice';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { FaWpforms, FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import Create from './Create';
import Join2 from './Join2';
import { getAllEvents, reset as reset2 } from '../features/event/eventSlice';
import ViewEvents from '../components/ViewEvents';

const Org = () => {
  const { org, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.org
  );
  const { user } = useSelector((state) => state.auth);
  const { allEvents } = useSelector((state) => state.event);

  const [modalIsOpen, setmodalIsOpen] = useState(false);

  const [opener, setopener] = useState(-1);
  const params = useParams();
  const dispatch = useDispatch();
  const { orgId } = useParams();
  // console.log(org);
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // document.location.reload();

    dispatch(getOrg(orgId));
    dispatch(getAllEvents(orgId));
  }, [orgId]);

  return (
    <>
      <div className='grid-container-2'>
        {/* <div className=''> */}
        <div className='grid-item-2 g2-item1' style={{ overflowY: 'scroll' }}>
          <div
            style={{
              // display: 'flex',
              // justifyContent: 'space-around',
              alignContent: 'left',
              alignItems: 'left',
            }}
          >
            <h5>{org.name}</h5>

            <div
              style={{
                fontSize: '20px',
                alignContent: 'left',
                alignItems: 'left',
              }}
            >
              Contact Number : {org.contactNo}
              <br />
              Creation Date : {new Date(org.createdAt).toLocaleString('en-US')}
              <br />
              Email : {org.email}
              <br />
              <br />
              Description : {org.desc}
              <br />
            </div>
          </div>
        </div>
        <div className='grid-item-2 g2-item2'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}
            className=''
          >
            {user._id === org.admin ? (
              <button
                className='btn btn-primary'
                onClick={() => {
                  setmodalIsOpen(true);
                  setopener(3);
                }}
                style={{
                  margin: '25px',
                }}
              >
                <FaPlus />
                <br />
                <label>Create Event</label>
              </button>
            ) : (
              <></>
            )}

            <button
              className='btn btn-primary'
              onClick={() => {
                setmodalIsOpen(true);
                // dispatch(getAllEvents())detailsdetails;
                setopener(4);
              }}
              style={{
                margin: '25px',
              }}
            >
              <FaWpforms />
              <br />
              <label>Join Event</label>
            </button>
          </div>
        </div>
        <div className='grid-item-2 g2-item3'>
          <ViewEvents />
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        style={{
          overlay: {
            position: 'fixed',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
          },
          content: {
            position: 'fixed',
            width: '65%',
            height: '70vh',
            margin: 'auto',
            border: '2px solid #ccc',

            background: '#e4ff79',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            // padding: '20px',
          },
        }}
      >
        {opener === 3 ? (
          <Create props={[setmodalIsOpen, opener, orgId]} />
        ) : (
          <Join2 props={[setmodalIsOpen, opener, allEvents]} />
          // <></>
        )}
      </Modal>
    </>
  );
};

export default Org;
