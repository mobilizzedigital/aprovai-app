import React from 'react';
import { format } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';

import { cn } from '../utils';
import UserAvatar from './UserAvatar';
import Icon from './Icon';

const Timeline = ({ children, ...rest }) => (
  <section className="timeline rounded shadow bg-light p-3 pr-4 mb-3" {...rest}>
    {children}
  </section>
);

const icons = {
  send: Icon.types.paperPlane,
  adjust: Icon.types.settings,
  view: Icon.types.eye,
  approve: Icon.types.checkMark,
};

const Item = ({ image, author, message, comment, action, date }) => (
  <div className="timeline-item d-flex mb-3">
    <div className="pr-4 position-relative">
      <UserAvatar src={image} size={27} />
      <span
        className={cn([
          'rounded',
          'position-absolute',
          'timeline-icon',
          'd-flex',
          'justify-content-center',
          'align-items-center',
          `timeline-icon-${action}`,
        ])}
      >
        <Icon name={icons[action]} />
      </span>
    </div>

    <div className="border-bottom timeline-content pb-1 flex-fill">
      <p className="timeline-message">
        <b>{author}</b> {message} em{' '}
        {format(new Date(date), "dd 'de' MMMM 'às' hh:mm", { locale: ptBr })}
      </p>
      {comment && (
        <p className="timeline-comment text-default p-3 rounded">{comment}</p>
      )}
    </div>
  </div>
);

const Empty = ({ message }) => (
  <div className="border-bottom timeline-content pb-1 border-0 text-center">
    <p className="timeline-message">{message}</p>
  </div>
);

Timeline.Item = Item;
Timeline.Empty = Empty;

export default Timeline;
