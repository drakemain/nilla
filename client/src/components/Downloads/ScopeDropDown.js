import React from 'react';
import PropTypes from 'prop-types';
import { MenuItem, InputGroup, DropdownButton } from 'react-bootstrap';

import CSSModules from 'react-css-modules';
import styles from './search.module.less';

import MarkedMenuItem from './MarkedMenuItem';

class ScopeDropDown extends React.PureComponent {
  render() {
    const item = (name) => {
      return (
        <MarkedMenuItem eventKey={name} selected={this.props.scope}
                        onSelect={this.props.onChangeScope} key={name}>
          {name}
        </MarkedMenuItem>
      );
    };

    return (
      <InputGroup.Button>
        <DropdownButton id='downloads_scope' title={this.props.scope} styleName='scope'>
          <MenuItem header>Search Scope</MenuItem>
          {['ALL', 'MINE', 'SYSTEM', 'MY LOCKED', 'LOCKED', 'EXPIRING', 'CROSS-SEEDING'].map(item)}
        </DropdownButton>
      </InputGroup.Button>
    );
  }
}

ScopeDropDown.propTypes = {
  onChangeScope: PropTypes.func.isRequired,
  scope: PropTypes.string.isRequired,
};

export default CSSModules(ScopeDropDown, styles);
