import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import MemberCards from '../components/MemberCards';
import { getMembers } from '../api/memberData';
import { useAuth } from '../utils/context/authContext';
import Search from '../components/Search';

function Members() {
  // needed all memb to filter through them
  const [members, setMembers] = useState([]);
  // needed in order to display the search query
  const [filteredMembers, setFilteredMembers] = useState([]);
  const { user } = useAuth();

  // Function to fetch all members
  const getAllMembers = async () => {
    const fetchedMembers = await getMembers(user.uid);
    // Set both all members and filtered members to the fetched members
    setMembers(fetchedMembers);
    setFilteredMembers(fetchedMembers);
  };

  // useEffect hook to fetch all members when the component mounts
  // Runs once after the initial render to fetch all members
  // You can control when useEffect runs by providing a dependency array
  // If the dependency array is empty, the effect runs only once after the initial render
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
      // Update filtered members with the filtered array
      setFilteredMembers(filtered);
    }
  };

  return (
    <div className="text-center">
      {/* pass search the filteritems in order to filter our keyup value */}
      <Link href="/member/new" passHref>
        <Button
          className="text-center info"
          style={{
            marginTop: '15px', backgroundColor: '#B6A39E', color: 'black', border: 'none',
          }}
        > Add A Member
        </Button>
      </Link>
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
    </div>
  );
}

export default Members;
