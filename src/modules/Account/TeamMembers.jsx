import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useToasts } from 'react-toast-notifications';
import { useSelector } from 'react-redux';

import List from '../../components/List';
import AddTeamMember from './AddTeamMember';
import Icon from '../../components/Icon';
import { UserAPI } from '../../api';
import { userSelector } from '../../store';

const TeamMembers = ({ team }) => {
  const [members, setMembers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  /** Workaround to force component re-render and refetch the members list :( */
  const [index, setIndex] = useState(0);
  const { addToast } = useToasts();
  const user = useSelector(userSelector);

  const handleToggleAddMember = () => setShowAddModal(!showAddModal);

  const handleRemoveMember = async (id) => {
    const { email } = members.filter((member) => member.id === id)[0];

    try {
      await UserAPI.deleteUser(email);
      addToast('Membro excluído com sucesso!', { appearance: 'success' });
      setMembers([...members.filter((member) => member.id !== id)]);
    } catch (error) {
      addToast(error.message, { appearance: 'error' });
    }
  };

  const handleMemberAdded = () => {
    handleToggleAddMember();
    setIndex(index + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { usuarios },
        } = await UserAPI.getUsersTeam();

        setMembers(usuarios);
      } catch (error) {}
    };

    fetchData();
  }, [index]);

  const items = members.map(({ id, name, email }) => ({
    id,
    leftText: name,
    greyText: `(${email})`,
  }));

  return (
    <>
      <List>
        <List.Header
          title="Membros do time"
          right={
            <Button
              variant="link"
              disabled={user.situation === 'USER_TRIAL_ENDED'}
              onClick={handleToggleAddMember}
            >
              <Icon name={Icon.types.addUser} className="text-primary " />
              Adicionar Membro
            </Button>
          }
        />
        <List.Items
          items={items}
          emptyText="Nenhum membro cadastrado"
          onRemove={handleRemoveMember}
        />
      </List>
      <AddTeamMember
        show={showAddModal}
        onHide={handleToggleAddMember}
        onMemberAdded={handleMemberAdded}
      />
    </>
  );
};

export default TeamMembers;
