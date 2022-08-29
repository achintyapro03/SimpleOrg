import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };
  return (
    <header className='nav'>
      <div>
        <Link className='nav-left' to='/'>
          Home
        </Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='nav-btn' onClick={onLogout}>
              Logout
            </button>
          </li>
        ) : (
          <div className='nav-right-pre'>
            <li className='navlink-right link-special-1'>
              <Link to='/login'>Login</Link>
            </li>
            <li className='navlink-right link-special-2'>
              <Link to='/register'>Register</Link>
            </li>
          </div>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
