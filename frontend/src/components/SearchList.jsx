import Card from './Card';

function SearchList({ filteredOrgs }) {
  const o = filteredOrgs[0];
  const cond = filteredOrgs[1];
  console.log(': ((');
  console.log(o);
  const filtered = o.map((org) => <Card key={org._id} org={[org, cond]} />);
  return <div>{filtered}</div>;
}

export default SearchList;
