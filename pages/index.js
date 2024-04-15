import { useEffect, useState } from 'react';
import MemberCards from '../components/MemberCards';
import { getMembers } from '../api/memberData';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [members, setMembers] = useState([]);

  const { user } = useAuth();

  const getAllMembers = () => {
    getMembers(user.uid).then(setMembers);
  };

  useEffect(() => {
    getAllMembers();
  });

  return (
    <div
      className="text-center d-flex flex-wrap justify-content-center align-content-center"
      style={{
        gap: '20px',
      }}
    >
      {members.map((member) => (
        <MemberCards key={member.firebaseKey} memObj={member} onUpdate={getAllMembers} />
      ))}

    </div>
  );
}

export default Home;

/* 1. a state for members is needed in order to keep track of the current state of members
2. we need user because in out api call function we will need to access the uid with the useAuth
3. useeffct runs after every render of the component, You can control when useEffect runs by providing a dependency array as the second argument. If the values in the dependency array change between renders, the effect will run again If the dependency array is empty, the effect runs only once after the initial render.
4. before calling our component we need to map through it by using our state varible and then w/in the compnent we assign the key, memObj and onUpdate props */
