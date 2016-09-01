import React, { PropTypes } from 'react';
import { Router, Route, Redirect } from 'react-router';
import CSSModules from 'react-css-modules';

import { Provider } from 'react-redux';

import InternalPage from 'components/App/InternalPage';

import FilteredDownloads from 'containers/Downloads/FilteredDownloads';
import DownloadContainer from 'containers/Download/DownloadContainer';

import UsersContainer from 'containers/Users/UsersContainer';

import TrackersContainer from 'containers/Trackers/TrackersContainer';
import TrackerContainer from 'containers/Tracker/TrackerContainer';

import styles from 'styles/app.module.less';

function AppContainer(props) {
  return (
    <Provider store={props.store}>
      <Router history={props.history}>
        <Redirect from='/' to='/downloads' />

        <Route path='/' component={InternalPage}>
          <Route path='downloads' component={FilteredDownloads} />
          <Route path='downloads/:infoHash(/:name)' component={DownloadContainer} />

          <Route path='users' component={UsersContainer} />

          <Route path='trackers' component={TrackersContainer} />
          <Route path='trackers/:id' component={TrackerContainer} />
        </Route>
      </Router>
    </Provider>
  );
}

AppContainer.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default CSSModules(AppContainer, styles);
