import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
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

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  return (
    // <>
    //   <section>
    //     <h1>Register</h1>
    //     <p>Please create an account</p>
    //   </section>

    //   <section>
    //     <form onSubmit={onSubmit}>
    //       <div>
    //         <input
    //           type='text'
    //           id='name'
    //           name='name'
    //           value={name}
    //           onChange={onChange}
    //           placeholder='Enter your name'
    //           required
    //         />
    //       </div>

    //       <div>
    //   <input
    //     type='email'
    //     id='email'
    //     name='email'
    //     value={email}
    //     onChange={onChange}
    //     placeholder='Enter your email'
    //     required
    //   />
    // </div>
    //       <div>
    //   <input
    //     type='password'
    //     id='password'
    //     name='password'
    //     value={password}
    //     onChange={onChange}
    //     placeholder='Enter password'
    //     required
    //   />
    // </div>

    //       <div>
    //   <input
    //     type='password'
    //     id='password2'
    //     name='password2'
    //     value={password2}
    //     onChange={onChange}
    //     placeholder='Confirm password'
    //     required
    //   />
    // </div>
    //       <div>
    //         <button>Submit</button>
    //       </div>
    //     </form>
    //   </section>
    // </>

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
            <h1 style={{ fontWeight: 'bold', fontSize: '30px' }}>Register</h1>
            <p style={{ fontSize: '18px' }}>Please create an account</p>
          </section>
          <div className='container'>
            <form
              style={{ height: '55vh' }}
              onSubmit={onSubmit}
              className='form'
            >
              <div>
                <div className='form-group-2 form-group'>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={name}
                    onChange={onChange}
                    placeholder='Enter your name'
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
                    placeholder='Enter your email'
                    required
                  />
                </div>
                <div className='form-group-2 form-group'>
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
                <div className='form-group-2 form-group'>
                  <input
                    type='password'
                    id='password2'
                    name='password2'
                    value={password2}
                    onChange={onChange}
                    placeholder='Confirm password'
                    required
                  />
                </div>
              </div>

              <div>
                <button className='btn'>Submit</button>
                <br />
                <br />
                <Link style={{ color: 'white' }} to='/login'>
                  Already have an account? <b>Sign In Now!!</b>
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
