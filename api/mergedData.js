import { deleteSingleMember } from './memberData';
import { deleteSingleTeam, getSingleTeam, getTeamMembers } from './teamData';

const deleteTeamAndMembers = async (teamFirebasekey) => {
  const teamMembers = await getTeamMembers(teamFirebasekey);
  const deleteMembersPromise = await teamMembers.map((member) => deleteSingleMember(member.firebaseKey));
  console.warn(teamMembers, deleteMembersPromise);

  await Promise.all(deleteMembersPromise).then(() => deleteSingleTeam(teamFirebasekey));
};

/* const viewTeamDetails = (teamfirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleTeam(teamfirebaseKey), getTeamMembers(teamfirebaseKey)])
    .then(([teamObject, teamMemberArray]) => {
      resolve({ ...teamObject, members: teamMemberArray });
    }).catch((error) => reject(error));
});
 */
const viewTeamDetails = async (teamFirebasekey) => {
  const team = await getSingleTeam(teamFirebasekey);
  const teamMembers = await getTeamMembers(teamFirebasekey);

  return { ...team, members: teamMembers };
};

export { deleteTeamAndMembers, viewTeamDetails };
