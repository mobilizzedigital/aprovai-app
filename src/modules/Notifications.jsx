import React, { useEffect, useState } from 'react';

import Icon from '../components/Icon';
import Timeline from '../components/Timeline';
import ClickOutsideHandler from '../components/ClickOutsideHandler';
import { NotificationAPI } from '../api';

const Notifications = ({ isDisabled = false }) => {
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);
  const [hasUnreadNotification, setUnreadNotifications] = useState(false);

  const markNotificationsAsRead = () => {
    notifications.forEach(({ id }) => {
      try {
        NotificationAPI.markAsRead(id);
      } catch (e) {}
    });
    setUnreadNotifications(false);
  };

  const handleToggleNotifications = () => {
    const newState = !show;

    setShow(newState);

    if (newState) {
      markNotificationsAsRead();
    }
  };

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const {
          data: { notificacoes, totalRegistros }
        } = await NotificationAPI.getNotifications(10, 0, false);

        setNotifications(notificacoes);

        if (totalRegistros > 0) {
          setUnreadNotifications(true);
        }
      } catch (e) {}
    };

    fetchUnreadNotifications();
  }, []);

  return (
    <div className="position-relative">
      <button
        className={`p-0 border-0 bg-transparent hover-outline-none btn-notification position-relative ${
          hasUnreadNotification ? 'has-unread-notifications' : ''
        }`}
        onClick={handleToggleNotifications}
        disabled={isDisabled}
      >
        <Icon name={Icon.types.bell} className="text-light" />
      </button>

      {show && (
        <ClickOutsideHandler onClose={handleToggleNotifications}>
          <div
            className="position-absolute"
            style={{
              left: 0,
              top: 40,
              transform: 'translateX(-192px)',
              zIndex: 5,
              maxWidth: '100%'
            }}
          >
            <Timeline style={{ width: 400 }}>
              {notifications.length === 0 && (
                <Timeline.Empty message="Você não tem nofiticações!" />
              )}

              {notifications.map(notification => (
                <Timeline.Item
                  key={`notification_${notification.id}`}
                  image={null}
                  author={notification.remetente}
                  message={notification.mensagem}
                  action={''}
                  date={notification.dataCriacao}
                />
              ))}
            </Timeline>
          </div>
        </ClickOutsideHandler>
      )}
    </div>
  );
};

export default Notifications;
