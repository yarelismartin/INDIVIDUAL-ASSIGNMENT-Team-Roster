import { useEffect, useState } from 'react';
import MemberCards from '../components/MemberCards';
import { getMembers } from '../api/memberData';
import { useAuth } from '../utils/context/authContext';
import Search from '../components/Search';

function Home() {
  // needed all memb to filter through them
  const [members, setMembers] = useState([]);
  // needed in order to display the search query
  const [filteredMembers, setFilteredMembers] = useState([]);
  // needed to pull uid
  const { user } = useAuth();

  const getAllMembers = () => {
    // get all memb based on uid then call our setMembers to pass results
    getMembers(user.uid).then((fetchedMembers) => {
      setMembers(fetchedMembers);
      // also need to set  filteredMembers to the fetched member in order to keep our data updated
      setFilteredMembers(fetchedMembers);
    });
  };

  // useEffect hook to fetch all members when the component mounts
  /* useeffct runs after every render of the component, You can control when useEffect runs by providing a dependency array as the second argument. If the values in the dependency array change between renders, the effect will run again If the dependency array is empty, the effect runs only once after the initial render.
*/
  useEffect(() => {
    getAllMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* passed to our search component onKeyUp prop so that we can filter through the target value */
  const filterItems = (query) => {
    if (!query) {
      // If query is empty, show all members
      getAllMembers();
    } else {
      // we grab members because it has the full list of players we then filter based on name and position
      const filtered = members.filter((member) => member.name.toLowerCase().includes(query)
      || member.position.toLowerCase().includes(query));
      /* we then call setFilterdMembers and pass it the resilt of the filter */
      setFilteredMembers(filtered);
    }
  };

  return (
    <>
      {/* pass search the filteritems in order to filter our keyup value */}
      <Search onKeyUp={filterItems} />
      <div
        className="text-center d-flex flex-wrap justify-content-center align-content-center"
        style={{
          gap: '20px',
        }}
      >
        {/* we are mapping through filterdMembers in order for our players to be updated based on latest query. we use this instead of members because all members will be rended is !query is found */}
        {filteredMembers.map((member) => (
          <MemberCards key={member.firebaseKey} memObj={member} onUpdate={getAllMembers} />
        ))}

      </div>
    </>
  );
}

export default Home;
