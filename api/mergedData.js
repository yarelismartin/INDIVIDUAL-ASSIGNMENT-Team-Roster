import { deleteSingleMember } from './memberData';
import { deleteSingleTeam, getSingleTeam, getTeamMembers } from './teamData';

const deleteTeamAndMembers = async (teamFirebasekey) => {
  const TeamMembers = await getTeamMembers(teamFirebasekey);
  const deleteMembersPromise = await TeamMembers.map((member) => deleteSingleMember(member.firebaseKey));

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
  const TeamMembers = await getTeamMembers(teamFirebasekey);

  return { ...team, members: TeamMembers };
};

export { deleteTeamAndMembers, viewTeamDetails };
