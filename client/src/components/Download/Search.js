import React from 'react';
import CSSModules from 'react-css-modules';
import {
  Badge,
  Button,
  FormControl,
  Glyphicon,
  InputGroup,
} from 'react-bootstrap';

import styles from './search.module.less';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.handleCollapse = this.handleCollapse.bind(this);
  }

  handleCollapse(_event) {
    this.props.collapse(this.props.infoHash, !this.props.isCollapsed);
  }

  shouldComponentUpdate(nextProps, _nextState) {
    return true;
    // return this.props.isCollapsed !== nextProps.isCollapsed ||
    //   this.props.count !== nextProps.count ||
    //   this.props.filter !== nextProps.filter;
  }

  render() {
    let collapseButton;

    if (this.props.containsFolders) {
      collapseButton = (
        <InputGroup.Button>
          <Button styleName='global-collapse' onClick={this.handleCollapse}>
            <Glyphicon glyph={this.props.isCollapsed ? 'chevron-down' : 'chevron-up'} />
          </Button>
        </InputGroup.Button>
      );
    }

    return (
      <InputGroup styleName='search'>
        {collapseButton}

        <FormControl type='text'
                     placeholder='Search'
                     autoFocus
                     styleName='search-filter'
                     value={this.props.filter}
                     onChange={this.props.onChangeFilter} />

        <InputGroup.Addon>
          <Badge styleName='item-count'>{this.props.count}</Badge>
        </InputGroup.Addon>
      </InputGroup>
    );
  }
}

Search.propTypes = {
  collapse: React.PropTypes.func.isRequired,
  containsFolders: React.PropTypes.bool,
  count: React.PropTypes.number.isRequired,
  filter: React.PropTypes.string.isRequired,
  infoHash: React.PropTypes.string.isRequired,
  isCollapsed: React.PropTypes.bool,
  onChangeFilter: React.PropTypes.func.isRequired,
  onCollapse: React.PropTypes.func.isRequired,
};

export default CSSModules(Search, styles);
