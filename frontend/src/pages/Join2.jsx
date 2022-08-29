import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Search2 from '../components/Search2';
// import { reset, createOrg, getOrgs } from '../features/org/orgSlice';

const Join = ({ props }) => {
  console.log('noooo');
  console.log(props);

  const { user } = useSelector((state) => state.event);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.org
  );

  var formData, setFormData, name, email, contactNo, desc;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(props);

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }
  // }, [isError]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label>
          <b>
            <h2>Search Events</h2>
          </b>
        </label>
        <button
          className='btn'
          style={{ padding: '4px 10px' }}
          onClick={() => {
            props[0](false);
            document.location.reload();
          }}
        >
          X
        </button>
      </div>
      <Search2 det={[props[2], 2]} />
    </>
  );
};

export default Join;
