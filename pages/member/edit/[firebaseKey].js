import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MemberForm from '../../../components/forms/MemberForm';
import { getSingleMember } from '../../../api/memberData';

export default function UpdateMember() {
  /* when on this page  we need to pull that memeber based in the firebasekey key */
  const [editItem, setEditItem] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (
    <div>
      <MemberForm memObj={editItem} />
    </div>
  );
}
