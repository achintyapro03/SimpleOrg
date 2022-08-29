import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrgs, reset, getAllOrgs } from '../features/org/orgSlice';
import OrgItem from './OrgItem';

const ViewOrgs = () => {
  const { orgs, isLoading, isSuccess } = useSelector((state) => state.org);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   return () => {
  //     if (isSuccess) {
  //       console.log(isSuccess);
  //     }
  //   };
  // }, [dispatch, isSuccess, reset]);

  useEffect(() => {
    dispatch(getOrgs());
  }, [dispatch, getOrgs]);
  return (
    <>
      <div>
        <h4 style={{ margin: '10px', marginBottom: '30px' }}>Organizations</h4>
      </div>

      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Name</div>
          <div>Active</div>
        </div>
        <div style={{ overflowY: 'scroll', maxHeight: '40vh' }}>
          {orgs.map((org) => (
            <OrgItem key={org._id} org={org} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewOrgs;
