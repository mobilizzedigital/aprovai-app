import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb as BSBreadcrumb } from 'react-bootstrap';

import { cn } from '../utils';

const homeLink = { icon: 'home', url: '/' };

const Breadcrumb = ({ items, expanded = true }) => (
  <div
    className={cn([
      'subheader',
      'bg-primary',
      'pt-4',
      expanded ? 'pb-5' : 'pb-4',
    ])}
  >
    <div className="container">
      <BSBreadcrumb>
        {[homeLink, ...items].map(({ title, icon, url }) => (
          <BSBreadcrumb.Item key={url} linkProps={{ to: url }} linkAs={Link}>
            {icon && <span className={`icon icon-${icon}`} />}
            {title}
          </BSBreadcrumb.Item>
        ))}
      </BSBreadcrumb>
    </div>
  </div>
);

export default Breadcrumb;
