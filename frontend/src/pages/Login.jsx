import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, message, isError } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [isError, isSuccess, user, navigate, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };
  return (
    <>
      <section className='landing'>
        <div className='dark-overlay'>
          <section
            style={{
              margin: 'auto',
              padding: '40px 20px',
              textAlign: 'center',
              color: 'white',
            }}
          >
            <h1 style={{ fontWeight: 'bold', fontSize: '30px' }}>Login</h1>
            <p style={{ fontSize: '18px' }}>Please login</p>
          </section>
          <div className='container'>
            <form
              style={{ height: '50vh' }}
              onSubmit={onSubmit}
              className='form'
            >
              <div>
                <div className='form-group-1 form-group'>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={email}
                    onChange={onChange}
                    placeholder='Enter your email'
                    required
                  />
                </div>
                <div className='form-group-1 form-group'>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    value={password}
                    onChange={onChange}
                    placeholder='Enter password'
                    required
                  />
                </div>
              </div>

              <div>
                <button className='btn'>Submit</button>
                <br />
                <br />
                <Link style={{ color: 'white' }} to='/register'>
                  Don't have an account? <b>Create one</b>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
