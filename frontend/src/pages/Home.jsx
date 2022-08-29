import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { useState } from 'react';
import Modal from 'react-modal';
// import CreateOrg from './CreateOrg';
import Create from './Create';
import { FaPlus, FaPlusCircle, FaPlusSquare, FaWpforms } from 'react-icons/fa';
import { getAllOrgs } from '../features/org/orgSlice';
import ViewOrgs from '../components/ViewOrgs';
import Join from './Join';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [modalIsOpen, setmodalIsOpen] = useState(false);

  const [opener, setopener] = useState(-1);

  const { user } = useSelector((state) => state.auth);
  const { allOrgs } = useSelector((state) => state.org);

  // console.log(user);

  // console.log(l);

  // var fields = [['name']];

  if (user) {
    return (
      <>
        <div className='grid-container-1'>
          <div style={{}} className='grid-item-1 g1-item1'>
            <button
              style={{
                fontSize: '30px',
                padding: '20px',
                transform: 'translateY(+40%)',
              }}
              className='link-special-1'
              onClick={() => {
                setmodalIsOpen(true);
                setopener(1);
              }}
            >
              <FaPlus />
              <br />
              <label>Create Org</label>
            </button>
          </div>
          <div style={{}} className='grid-item-1 g1-item2'>
            <button
              style={{
                fontSize: '30px',
                padding: '20px',
                transform: 'translateY(+40%)',
              }}
              className='link-special-1'
              onClick={async () => {
                dispatch(getAllOrgs());
                setmodalIsOpen(true);
                setopener(3);
              }}
            >
              <FaWpforms />
              <br />
              <label>Join Org</label>
            </button>
          </div>

          <div className='grid-item-1 g1-item3'>
            <ViewOrgs />
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
              height: '65vh',
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
          {opener === 1 ? (
            <Create props={[setmodalIsOpen, opener]} />
          ) : (
            <Join props={[setmodalIsOpen, opener, allOrgs]} />
            // <></>
          )}
        </Modal>
      </>
    );
  } else {
    return <></>;
  }
};

export default Home;
