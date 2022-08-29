import { useState } from 'react';
import Scroll from './Scroll';
import SearchList from './SearchList';
// import

function Search2({ det }) {
  //   console.log(details);

  const details = det[0];
  const cond = det[1];
  const [searchField, setSearchField] = useState('');
  const [searchShow, setSearchShow] = useState(false);

  console.log(details);

  const filteredEvents = details.filter((event) => {
    return event.name.toLowerCase().includes(searchField.toLowerCase());
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
          <SearchList filteredOrgs={[filteredEvents, cond]} />
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
            placeholder='Enter event name/email'
            style={{ marginTop: '10px', marginBottom: '20px' }}
            onChange={handleChange}
          />
        </div>
        {filteredEvents.length === 0 ? (
          <p>No events with the details entered</p>
        ) : (
          searchList()
        )}
      </form>
    </div>
  );
}

export default Search2;
