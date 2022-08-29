import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Search1 from '../components/Search1';
import { reset, createOrg, getOrgs } from '../features/org/orgSlice';

const Join = ({ props }) => {
  console.log(props[1]);

  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.org
  );

  var formData, setFormData, name, email, contactNo, desc;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(props);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label>
          <b>
            <h2>Search orgs</h2>
          </b>
        </label>
        <button
          className='btn'
          style={{ padding: '4px 10px' }}
          onClick={() => {
            props[0](false);
            dispatch(reset());
            document.location.reload();
          }}
        >
          X
        </button>
      </div>
      <Search1 details={[props[2], 1]} />
    </>
  );
};

export default Join;
