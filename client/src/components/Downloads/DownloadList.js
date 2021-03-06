import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import { Row, Col } from 'react-bootstrap';

import styles from './styles.module.less';

import DownloadContainer from 'containers/Downloads/DownloadContainer';

class DownloadList extends React.PureComponent {
  render() {
    const downloads = this.props.downloads.map(download => {
      return (
        <DownloadContainer key={download.infoHash}
                           isHidden={download.isHidden}
                           infoHash={download.infoHash}
                           dateAdded={download.dateAdded}
                           state={download.state}
                           progress={download.progress}
                           name={download.name}
                           locks={download.locks} />
      );
    });

    return (
      <Row>
        <Col lg={12}>
          <ul styleName='downloads'>
            {downloads}
          </ul>
        </Col>
      </Row>
    );
  }
}

DownloadList.propTypes = {
  downloads: PropTypes.array.isRequired,
};

export default CSSModules(DownloadList, styles);
