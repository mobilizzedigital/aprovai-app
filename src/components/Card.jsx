import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ children, link }) => (
  <Link className="text-decoration-none" to={link}>
    <div className="card bg-light rounded shadow py-3 px-4 mb-2 d-flex flex-row">
      {children}
    </div>
  </Link>
);

const Image = ({ src }) => (
  <div className="d-flex align-items-center">
    <img className="card-image mr-3 rounded" src={src} alt="" />
  </div>
);

const Body = ({ children }) => <div>{children}</div>;

const Title = ({ children }) => (
  <h3 className="card-title font-weight-medium mb-2">{children}</h3>
);

const Text = ({ children }) => <p className="card-text mb-1">{children}</p>;

Card.Image = Image;
Card.Body = Body;
Card.Title = Title;
Card.Text = Text;

export default Card;
