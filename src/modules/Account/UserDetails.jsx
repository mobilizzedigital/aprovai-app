import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import UserAvatar from '../../components/UserAvatar';
import Icon from '../../components/Icon';
import UploadUserPictureModal from './UploadUserPictureModal';
import { userSelector } from '../../store';

const UserDetails = () => {
  const [showPictureModal, setPictureModal] = useState(false);
  const user = useSelector(userSelector);

  const handleTogglePictureModal = () => setPictureModal(!showPictureModal);

  return (
    <>
      <div className="mb-4">
        <div className="d-flex">
          <UserAvatar src={user.profilePicture} size={89} />
          <div className="d-flex align-items-center ml-3">
            <h4 className="m-0">{user.name}</h4>
          </div>
        </div>
        <Button
          variant="link"
          className="px-0 mt-1"
          size="sm"
          onClick={handleTogglePictureModal}
        >
          <Icon name={Icon.types.pencil} screenReaderMessage="Editar usuário" />
          Editar foto
        </Button>
      </div>

      <UploadUserPictureModal
        show={showPictureModal}
        handleHide={handleTogglePictureModal}
      />
    </>
  );
};

export default UserDetails;
