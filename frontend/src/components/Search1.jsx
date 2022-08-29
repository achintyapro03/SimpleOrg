import { useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';
// import

function Search1({ details }) {
  const o = details[0];
  const cond = details[1];
  const [searchField, setSearchField] = useState('');
  const [searchShow, setSearchShow] = useState(false);

  // console.log(details);

  const filteredOrgs = o.filter((org) => {
    return (
      org.name.toLowerCase().includes(searchField.toLowerCase()) ||
      org.email.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
    if (e.target.value === '') {
      setSearchShow(false);
    } else {
      setSearchShow(true);
    }
  };

  function searchList() {
    if (searchShow) {
      return (
        <Scroll>
          <SearchList filteredOrgs={[filteredOrgs, cond]} />
        </Scroll>
      );
    }
  }

  return (
    <div>
      <form
        style={{ width: '100%', height: '45vh', textAlign: 'center' }}
        className=''
      >
        <div className='form-group-2 form-group'>
          <input
            type='search'
            placeholder='Enter org name/email'
            style={{ marginTop: '10px', marginBottom: '20px' }}
            onChange={handleChange}
          />
        </div>
        {filteredOrgs.length === 0 ? (
          <p>No orgs with the details entered</p>
        ) : (
          searchList()
        )}
      </form>
    </div>
  );
}

export default Search1;

{
  /* <section>
<div>
  <h2>Look for orgs</h2>
</div>
<div>
  <input
    type='search'
    placeholder='Search Organizations'
    onChange={handleChange}
  />
</div>
{searchList()}
</section> */
}
