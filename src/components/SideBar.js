import React from 'react';
import '../styles/SideBarStyles.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeOption: 'home'
    };
  }

  setActiveOption = (option) => {
    this.setState({ activeOption: option });
  }

  render() {
    return (
      <div className="sidebar">
        <ul>
          <li>
            <a href="/" className="sidebar-link">
              <span className="square"></span> Home
            </a>
          </li>
          <li>
            <a href="/visualizador-unidades" className="sidebar-link">
              <span className="square"></span> Visualizador de Unidades
            </a>
          </li>
          <li>
            <a href="/dashboard" className="sidebar-link">
              <span className="square"></span> Dashboard
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
