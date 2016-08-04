import { connect } from 'react-redux';

import Download from 'components/Download/Download';

import { makeGetFilteredFiles } from 'selectors';

function makeMapStateToProps() {
  const getFilteredFiles = makeGetFilteredFiles();

  return function mapStateToProps(state, props) {
    const infoHash = props.params.infoHash;

    if (!(infoHash in state.downloads) ||
        !(infoHash in state.ui.downloads) ||
        !('files' in state.downloads[infoHash])) {
      return { infoHash };
    }

    const download = state.downloads[infoHash];
    const ui = state.ui.downloads[infoHash];
    const files = getFilteredFiles(state, props);

    return { infoHash, download, ui, files };
  };
}

const DownloadContainer = connect(
  makeMapStateToProps
)(Download);

export default DownloadContainer;
