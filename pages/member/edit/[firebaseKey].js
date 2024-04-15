/* import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import MemberForm from '../../../components/forms/MemberForm';
import { getSingleMember } from '../../../api/memberData';

export default function updateMember() {
  const [editItem, setEditItem] = useState();
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleMember(firebaseKey).then(setEditItem);
  });

  return (
    <div>
      <MemberForm memObj={editItem} />
    </div>
  );
}
 */
