import React from 'react';

import TeamMemberPermissionsModal from '../../components/modals/TeamMemberPermissionsModal';

const TeamMemberPermissions = ({ show }) => {
  const clients = [
    { id: 1, name: 'Sistema Cilia' },
    { id: 2, name: 'Mobilizze Marketing' },
    { id: 3, name: 'CCD' }
  ];

  return <TeamMemberPermissionsModal show={show} clients={clients} />;
};

export default TeamMemberPermissions;
