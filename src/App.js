import React, { Component } from "react";
import { getUsers, getOrganizations } from "./api";

class App extends Component {
  state = {
    loading: true,
    selectedOrg: null
  };
  users = [];
  organizations = [];
  componentDidMount() {
    getUsers()
      .then((users) => (this.users = users))
      .then(() => getOrganizations())
      .then((organizations) => (this.organizations = organizations))
      .then(() => this.setState({ loading: false }));
  }

  selectOrg = (org) => {
    this.setState({ selectedOrg: org });
  };

  resetSelectedOrg = () => {
    this.setState({ selectedOrg: false });
  };

  render() {
    if (this.state.loading) {
      return "Loading...";
    }

    // let users = [];
    let res = this.users.map((item) => {
      const org = this.organizations.find((o) => o.id === item.organizaiton)
        .name;
      return (
        <div className="user-list-item" id={item.id}>
          <div>name: {item.name}</div>
          <div onClick={() => this.selectOrg(org)}>org: {org}</div>
        </div>
      );
    });

    if (this.state.selectedOrg) {
      // users = [];

      this.users
        .filter(
          (item) =>
            item.organizaiton ===
            this.organizaitons.fund((o) => o.name === this.state.selectedOrg).id
        )
        .map((item) => (
          <div className="user-list-item" key={item.id}>
            <div>name: {item.name}</div>
            <div>org: {this.state.selectedOrg}</div>
          </div>
        ));
    }

    return (
      <div>
        {this.state.selectedOrg && (
          <button onClick={() => this.resetSelectedOrg()}>
            reset selected org
          </button>
        )}
        {/* <div className="user-list">{users}</div> */}
        <div>{res}</div>
      </div>
    );
  }
}

export default App;
