import React from 'react';
import '../styles/ManagementAdministration/ButtonWithAvatarsStyles.css'

const ButtonWithAvatars = ({ title, avatars, onClick }) => {
  return (
    <div className="button-with-avatars" onClick={onClick}>
      <div className="button-content">
        <div className="titleAvatarButton">{title}</div>
        <div className="avatars">
          {avatars.slice(0, 4).reverse().map((avatar, index) => (
            <img key={index} src={avatar} alt={`Avatar ${index + 1}`} className="avatar" />
          ))}
          {avatars.length > 4 && (
            <span className="more-avatars">+{avatars.length - 4}</span>
          )}
        </div>
      </div>
      <div className="action-button">
        Ver más &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt;
      </div>
    </div>
  );
};

export default ButtonWithAvatars;