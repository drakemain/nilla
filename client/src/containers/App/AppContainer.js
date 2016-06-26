import React, { PropTypes } from 'react';
import { Router, Route, Redirect} from 'react-router';
import CSSModules from 'react-css-modules';

import { Provider } from 'react-redux';

import FilteredDownloads from 'containers/Downloads/FilteredDownloads';
import DownloadContainer from 'containers/Download/DownloadContainer';
import App from 'components/App/App';

import styles from 'styles/app.module.less';

const AppContainer = React.createClass({
  propTypes: {
    history: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  },

  render: function() {
    return (
      <Provider store={this.props.store}>
        <Router history={this.props.history}>
          <Redirect from="/" to="/downloads" />

          <Route path="/" component={App}>
            <Route path="downloads" component={FilteredDownloads} />
            <Route path="download/:infohash" component={DownloadContainer} />
          </Route>
        </Router>
      </Provider>
    );
  }
});

module.exports = CSSModules(AppContainer, styles);