import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions/cluster';
import store from '../../store';
import { Link } from 'react-router';


const mapStateToProps = (state) => {
  const data = {
    cluster: state.clusterDetail.cluster,
  };
  if (data.cluster !== undefined) {
    data.applications = state.clusterDetail.applications;
    data.roles = state.clusterDetail.roles;
  }
  return data;
};


const Cluster = React.createClass({
  propTypes: {
    cluster: React.PropTypes.object,
    applications: React.PropTypes.array,
    roles: React.PropTypes.array,
    params: React.PropTypes.object,

  },

  componentWillMount() {
    store.dispatch(actions.get(this.props.params.clusterId));
  },

  componentWillUnmount() {
    store.dispatch(actions.reset());
  },

  render() {
    const c = this.props.cluster;
    if (c === undefined) {
      return <div></div>;
    }
    return (
      <div>
        <ul className="item__list">
          <li className="item__heading">Name: {c.name}</li>
          <li className="item__child">
            <Link to={`/clusters/${this.props.params.clusterId}/applications/`}>
              Applications
            </Link>
          </li>
          <li className="item__child">
              <b className="item__fragment item__fragment--bold">Roles: </b>
              <span className="item__value">{
                  c.roles.length ?
                  c.roles.map((role) => <span key={role.name}>{role.name} </span>) :
                  'No roles right now'
              }</span>
          </li>
        </ul>
        <Link to={`/clusters/${this.props.params.clusterId}/edit/`}>Edit</Link>
      </div>
    );
  },
});

export default connect(mapStateToProps, actions)(Cluster);