import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import CSSModules from 'react-css-modules';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { withRouter } from 'react-router';

import { userCan } from 'common';

import styles from './header.module.less';

const LinkContainerWithRouter = withRouter(LinkContainer);

class Header extends React.PureComponent {
  render() {
    let uploadButton;

    if (this.props.currentUser && userCan(this.props.currentUser, 'upload')) {
      uploadButton = (
        <NavItem eventKey={2} onClick={this.props.onUpload}>Upload</NavItem>
      );
    }

    let trackersButton;

    if (this.props.currentUser && userCan(this.props.currentUser, 'trackers:read')) {
      trackersButton = (
        <LinkContainerWithRouter to='/trackers'>
          <NavItem eventKey={3}>Trackers</NavItem>
        </LinkContainerWithRouter>
      );
    }

    let usersButton;

    if (this.props.currentUser && userCan(this.props.currentUser, 'users:read')) {
      usersButton = (
        <LinkContainerWithRouter to='/users'>
          <NavItem eventKey={4}>Users</NavItem>
        </LinkContainerWithRouter>
      );
    }

    return (
      <Navbar styleName={this.props.isDragging ? 'dragging' : 'navbar'}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='https://github.com/blaenk/nilla'>NILLA</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainerWithRouter to='/downloads'>
              <NavItem eventKey={1}>Download</NavItem>
            </LinkContainerWithRouter>

            {uploadButton}
            {trackersButton}
            {usersButton}
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={5} onClick={this.props.onLogout}>
              Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  isDragging: React.PropTypes.bool.isRequired,
  onLogout: React.PropTypes.func.isRequired,
  onUpload: React.PropTypes.func.isRequired,
};

export default CSSModules(Header, styles);
