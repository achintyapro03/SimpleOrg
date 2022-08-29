import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrg, reset as reset1 } from '../features/org/orgSlice';
import { createEvent, reset as reset2 } from '../features/event/eventSlice';

import Modal from 'react-modal';
// import

const Create = ({ props }) => {
  const orgId = props[2];
  console.log(props[1]);
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.org
  );
  // const { setmodalIsOpen } = props;

  var formData,
    setFormData,
    name,
    email,
    contactNo,
    desc,
    dateStart,
    dateEnd,
    startTime,
    endTime;

  const [a, setA] = useState({
    name: '',
    email: '',
    contactNo: '',
    desc: '',
  });

  const [b, setB] = useState({
    name: '',
    dateStart: '',
    dateEnd: '',
    startTime: '',
    endTime: '',
    desc: '',
  });

  // const vars = [
  //   [name, email, contactNo, desc],
  //   [name, dateStart, dateEnd, startTime, endTime, desc],
  // ];

  if (props[1] === 1) {
    name = a.name;
    email = a.email;
    contactNo = a.contactNo;
    desc = a.desc;
    formData = a;
    setFormData = setA;
  } else if (props[1] === 3) {
    name = b.name;
    dateStart = b.dateStart;
    dateEnd = b.dateEnd;
    startTime = b.startTime;
    endTime = b.endTime;
    desc = b.desc;

    formData = b;
    setFormData = setB;
  }

  const text = [
    [
      ['* Enter organization name', name, 'name', 1, 1, 'text', 'text'],
      ['* Organization email', email, 'email', 2, 1, 'email', 'email'],
      [
        'Organization ContactNo',
        contactNo,
        'contactNo',
        3,
        0,
        'number',
        'number',
      ],
      ['Description', desc, 'desc', 4, 0, 'text', 'text'],
    ],
    [
      ['* Enter event name', name, 'name', 1, 1, 'text', 'text'],
      ['* Start Date', dateStart, 'dateStart', 2, 1, 'text', 'date'],
      ['* End Date', dateEnd, 'dateEnd', 3, 1, 'text', 'date'],
      ['Start Time', startTime, 'startTime', 4, 0, 'text', 'time'],
      ['End Time', endTime, 'endTime', 5, 0, 'text', 'time'],
      ['Descripiton', desc, 'desc', 6, 0, 'text', 'text'],
    ],
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset1());
    }
  }, [dispatch, isError, reset1]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    var data;
    if (props[1] == 1) {
      data = {
        name,
        email,
        contactNo,
        desc,
      };
      dispatch(createOrg(data));
    } else {
      data = { name, dateStart, dateEnd, startTime, endTime, desc };
      dispatch(createEvent([data, orgId]));
    }

    // dispatch(createOrg());
    console.log(data);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label>
          <b>
            <h2>Create Event</h2>
          </b>
        </label>
        <button
          className='btn'
          style={{ padding: '4px 10px' }}
          onClick={() => {
            props[0](false);
            dispatch(reset1());
            document.location.reload();
          }}
        >
          X
        </button>
      </div>
      <form
        style={{
          height: '55vh',
          textAlign: 'center',
          transform: 'translateY(5%)',
          width: '85%',
        }}
        onSubmit={onSubmit}
        className='form'
      >
        {text[parseInt(props[1] / 2)].map((val) => (
          <div
            className='form-group-2 form-group'
            key={val[3]}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '0px 20px',
            }}
          >
            <label style={{ color: 'white' }}>{val[0]}</label>
            <input
              type={val[6]}
              id={val[2]}
              name={val[2]}
              value={val[1]}
              onChange={onChange}
              // placeholder={val[0]}
              required={val[4]}
              style={{ width: '60%' }}

              // onfocus={`this.type=${val[6]}`}
              // onfocus="(this.type='date')"
            />
          </div>
        ))}
        <div>
          <button className='btn btn-secondary'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
