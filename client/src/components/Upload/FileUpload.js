import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Collapse,
  Checkbox,
  Glyphicon,
  Label,
  ProgressBar,
} from 'react-bootstrap';
import CSSModules from 'react-css-modules';
import filesize from 'filesize';

import FolderItem from './FolderItem';

import styles from './upload.module.less';

import { setFileStart } from 'actions';

const StartCheckbox = connect(
  null,
  (dispatch, ownProps) => {
    return {
      onChange(event) {
        dispatch(setFileStart(ownProps.file, event.target.checked));
      },
    };
  }
)(Checkbox);

class FileUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: false,
    };

    this.handleCollapse = this.handleCollapse.bind(this);
  }

  handleCollapse() {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  }

  componentWillMount() {
    this.props.parseFile();
  }

  render() {
    let torrentInfo;

    if (this.props.file.parsed) {
      const trackers = this.props.file.parsed.announce.map((url, index) => {
        return (
          <li key={index}>
            {url}
          </li>
        );
      });

      const files = this.props.file.parsed.files.map((f, index) => {
        if (f.path.startsWith(this.props.file.parsed.name + '/')) {
          f.path = f.path.slice(this.props.file.parsed.name.length + 1);
        }

        f.pathComponents = f.path.split('/');
        f.index = index;

        return f;
      }).sort((a, b) => {
        return a.path.toLocaleLowerCase().localeCompare(b.path.toLocaleLowerCase());
      });

      const wrappedName = this.props.file.parsed.name.replace(/\./g, '\u200b.');

      torrentInfo = (
        <div styleName='parsed-section'>
          <div>
            <h2 styleName='torrent-name'>
              {wrappedName}
            </h2>

            <div styleName='torrent-meta'>
              <span styleName='infoHash'>
                {this.props.file.parsed.infoHash}
              </span>

              <span styleName='torrent-separator'>—</span>

              <span styleName='torrent-size'>
                {filesize(this.props.file.parsed.length)}
              </span>
            </div>
          </div>

          <div className='torrent-info'>
            <div styleName='torrent-trackers'>
              <h3>Trackers</h3>

              <ol>
                {trackers}
              </ol>
            </div>

            <div styleName='torrent-files'>
              <h3>Files ({this.props.file.parsed.files.length})</h3>

              <FolderItem isRoot depth={0} files={files} />
            </div>
          </div>
        </div>
      );
    }

    let fileControls;

    if (this.props.file.progress > 0) {
      fileControls = (
        <div className='upload-progress'>
          <ProgressBar styleName='upload-progress'
                       now={this.props.file.progress}
                       label={`${this.props.file.progress}%`} />
        </div>
      );
    } else {
      fileControls = (
        <div>
          <StartCheckbox inline file={this.props.file} defaultChecked={this.props.file.start}>
            start
          </StartCheckbox>

          <Button bsStyle='danger' bsSize='xsmall' styleName='file-button' title='remove'
                  onClick={this.props.onRemove}>
            <Glyphicon glyph='remove' />
          </Button>

          <Button bsStyle='success' bsSize='xsmall' styleName='file-button' title='upload'
                  onClick={this.props.onSubmit}>
            <Glyphicon glyph='arrow-up' />
          </Button>
        </div>
      );
    }

    const fileInfo = (
      <div styleName='file-section'>
        <div styleName='file-info' onClick={this.handleCollapse}>
          <Glyphicon className={this.props.styles['collapse-mark']}
                     glyph={this.state.isCollapsed ? 'chevron-down' : 'chevron-up'} />

          <span styleName='name'>
            {this.props.file.backingFile.name}
          </span>

          <Label styleName='size'>
            {filesize(this.props.file.backingFile.size)}
          </Label>
        </div>

        <div>
          {fileControls}
        </div>
      </div>
    );

    return (
      <li styleName='file'>
        {fileInfo}

        <Collapse in={!this.state.isCollapsed}>
          <div>
            {torrentInfo}
          </div>
        </Collapse>
      </li>
    );
  }
}

FileUpload.propTypes = {
  file: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  parseFile: PropTypes.func.isRequired,
  styles: PropTypes.object,
};

export default CSSModules(FileUpload, styles);
