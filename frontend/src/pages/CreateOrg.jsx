import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrg, reset } from '../features/org/orgSlice';
import Modal from 'react-modal';

const CreateOrg = ({ props }) => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.org
  );
  // const { setmodalIsOpen } = props;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNo: '',
    desc: '',
  });

  const { name, email, contactNo, desc } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate('/');
    }
    dispatch(reset());
  }, [dispatch, navigate, isError, isLoading, isSuccess]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const orgData = {
      name,
      email,
      contactNo,
      desc,
    };

    dispatch(createOrg(orgData));
  };
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label>
          <b>
            <h2>Create organization</h2>
          </b>
        </label>
        <button
          className='btn'
          style={{ padding: '4px 10px' }}
          onClick={() => props(false)}
        >
          X
        </button>
      </div>
      <form
        style={{ height: '45vh', textAlign: 'center' }}
        onSubmit={onSubmit}
        className='form'
      >
        <div>
          <div className='form-group-2 form-group'>
            <input
              type='name'
              id='name'
              name='name'
              value={name}
              onChange={onChange}
              placeholder='* Enter organization name'
              required
            />
          </div>
          <div className='form-group-2 form-group'>
            <input
              type='email'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='* Organization email'
              required
            />
          </div>
          <div className='form-group-2 form-group'>
            <input
              type='contactNo'
              id='contactNo'
              name='contactNo'
              value={contactNo}
              onChange={onChange}
              placeholder='  Organization contactNo'
            />
          </div>
          <div className='form-group-2 form-group'>
            <input
              type='desc'
              id='desc'
              name='desc'
              value={desc}
              onChange={onChange}
              placeholder='  Description'
            />
          </div>
        </div>

        <div>
          <button className='btn'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrg;
