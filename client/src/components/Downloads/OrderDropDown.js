import React from 'react';
import PropTypes from 'prop-types';
import {
  Dropdown,
  Glyphicon,
  InputGroup,
  MenuItem,
} from 'react-bootstrap';

import CSSModules from 'react-css-modules';
import styles from './search.module.less';

import MarkedMenuItem from './MarkedMenuItem';

class OrderDropDown extends React.PureComponent {
  render() {
    const item = (name) => {
      return (
        <MarkedMenuItem eventKey={name} selected={this.props.order}
                        onSelect={this.props.onChangeOrder} key={name}>
          {name}
        </MarkedMenuItem>
      );
    };

    return (
      <InputGroup.Button>
        <Dropdown id='sort_order'>
          <Dropdown.Toggle noCaret styleName='sort'>
            <Glyphicon glyph='sort' />
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ left: 'auto', right: 0 }}>
            <MenuItem header>Sort By</MenuItem>
            {['NAME', 'RECENT'].map(item)}
          </Dropdown.Menu>
        </Dropdown>
      </InputGroup.Button>
    );
  }
}

OrderDropDown.propTypes = {
  onChangeOrder: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
};

export default CSSModules(OrderDropDown, styles);
