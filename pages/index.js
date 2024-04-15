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
