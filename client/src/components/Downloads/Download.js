import React from 'react';
import { Link } from 'react-router';
import CSSModules from 'react-css-modules';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import styles from './styles.module.less';

class Download extends React.PureComponent {
  render() {
    const lockedTooltip = (
      <Tooltip id='tooltip_locked'>locked</Tooltip>
    );

    const progressTooltip = (
      <Tooltip id='tooltip_state'>{this.props.state}</Tooltip>
    );

    const lockStatus = () => {
      if (!this.props.user) {
        return null;
      }

      if (this.props.locks.includes(this.props.user.id)) {
        return (
          <OverlayTrigger placement='left' overlay={lockedTooltip}>
            <div styleName='lock-status' />
          </OverlayTrigger>
        );
      }

      return null;
    };

    const maybeHide = this.props.isHidden ? { display: 'none' } : {};
    const isUnseen = this.props.lastSeen && this.props.lastSeen < this.props.dateAdded;
    const nameStyle = isUnseen ? 'unseen' : 'name';

    const encodedName = encodeURIComponent(this.props.name).replace(/%20/g, '+');

    return (
      <li styleName='download' style={maybeHide}>
        <OverlayTrigger placement='right' overlay={progressTooltip}>
          <div styleName='progress'>
            <div styleName={`progress-${this.props.state}`}
                 style={{ height: this.props.progress + '%' }}
                 aria-valuenow={this.props.progress} />
          </div>
        </OverlayTrigger>
        <Link to={`/downloads/${this.props.infoHash}/${encodedName}`} styleName={nameStyle}>
          {this.props.name}
        </Link>
        {lockStatus()}
      </li>
    );
  }
}

Download.propTypes = {
  dateAdded: React.PropTypes.object.isRequired,
  infoHash: React.PropTypes.string.isRequired,
  isHidden: React.PropTypes.bool.isRequired,
  lastSeen: React.PropTypes.object.isRequired,
  locks: React.PropTypes.array.isRequired,
  name: React.PropTypes.string.isRequired,
  progress: React.PropTypes.number.isRequired,
  state: React.PropTypes.oneOf([
    'seeding',
    'closed',
    'downloading',
    'hashing',
    'stopped',
  ]).isRequired,
  user: React.PropTypes.object.isRequired,
};

export default CSSModules(Download, styles);
