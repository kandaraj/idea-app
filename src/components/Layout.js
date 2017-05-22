import React from 'react';
import Header from './common/Header';
import HomePage from '../components/home/HomePage';
import About from '../components/about/AboutPage';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signOut} from '../actions/authActions';
import {Tabbar, Tab, Page, Toolbar} from 'react-onsenui';

class TabPage extends React.Component {
  render() {
    return (
      <Page>
        <Toolbar>
          <div className="center">{this.props.title}</div>
        </Toolbar>


        <p style={{padding: '25px 10px'}}>
          This is the <strong>{this.props.title}</strong> page!
        </p>


        <div>
          Hello
          <Header signOut={this.props.actions.signOut} auth={this.props.auth} loading={this.props.loading} user={this.props.user} />
        </div>
      </Page>
    );
  }
}

class Layout extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.renderTabs = this.renderTabs.bind(this);
  }

  renderTabs() {
    const sections = [
      'Home',
      'Comments',
      'Settings'
    ];

    return sections.map((section) => {
      return {
        content: <TabPage key={section} title={section}
                          actions={this.props.actions} auth={this.props.auth}
                          loading={this.props.loading} user={this.props.user}/>,
        tab: <Tab key={section} label={section} />
      };
    });
  }

  render() {
    const {auth, actions, loading, user} = this.props;
    return (

        <Tabbar
          initialIndex={1}
          renderTabs={this.renderTabs}
        />

    );
  }
}

Layout.propTypes =  {
  children: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired,
  auth: React.PropTypes.object.isRequired,
  user: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    auth: state.auth,
    user: state.user,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({signOut}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
