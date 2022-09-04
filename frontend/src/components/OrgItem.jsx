import { Link } from 'react-router-dom';

const OrgItem = ({ org }) => {
  var status = 'no';
  // console.log(org.events);
  if (org.events[1].length !== 0) status = 'yes';
  return (
    <div className='title title-container'>
      <div className=''>{new Date(org.createdAt).toLocaleString('en-US')}</div>
      <div>{org.name}</div>
      <div className={`status status-${status}`}>{status}</div>
      <Link
        to={`/org/${org._id}`}
        className='link-special-2'
        style={{ textAlign: 'center' }}
      >
        View
      </Link>
    </div>
  );
};

export default OrgItem;
