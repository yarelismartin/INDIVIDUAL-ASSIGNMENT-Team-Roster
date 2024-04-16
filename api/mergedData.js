import { deleteSingleMember } from './memberData';
import { deleteSingleTeam, getTeamMembers } from './teamData';

const deleteTeamAndMembers = async (teamFirebasekey) => {
  const TeamMembers = await getTeamMembers(teamFirebasekey);
  const deleteMembersPromise = await TeamMembers.map((member) => deleteSingleMember(member.firebaseKey));

  await Promise.all(deleteMembersPromise).then(() => deleteSingleTeam(teamFirebasekey));
};

export default deleteTeamAndMembers;
