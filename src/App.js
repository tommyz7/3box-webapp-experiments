import React, { Component } from "react";
import Box from "3box";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { SPACE_NAME, moderator } from "./Constants";
import AddApp from "./pages/AddApp";
import Home from "./pages/Home";

const getThreeBox = async (address) => {
  const profile = await Box.getProfile(address);
  return profile;
};

export default class App extends Component {

  state = {
    needToAWeb3Browser : false,
  }
  async getAddressFromMetaMask() {
    if (typeof window.ethereum == "undefined") {
      this.setState({ needToAWeb3Browser: true });
    } else {
      window.ethereum.autoRefreshOnNetworkChange = false; //silences warning about no autofresh on network change
      const accounts = await window.ethereum.enable();
      this.setState({ accounts });
    }
  }
  async componentDidMount() {
    await this.getAddressFromMetaMask();
    if (this.state.accounts) {
      // using the address saved in getAddressFromMetaMask func
      // open 3Box buy authenticating a user https://docs.3box.io/build/web-apps/auth/3box
      // This method will trigger the users ETH wallet  to sign a message
      // Once the user has approved, they can update, decrypt, and interact
      // with their 3Box profile store.
      const threeBoxProfile = await getThreeBox(this.state.accounts[0]);
      this.setState({ threeBoxProfile });
    }
    const box = await Box.openBox(this.state.accounts[0], window.ethereum);
    this.setState({ box });
    const space = await this.state.box.openSpace(SPACE_NAME);
    console.log('space', space);
    this.setState({ space });
    // Sync 3Box
    await box.syncDone
    console.log("3Box synced");
    const thread = await space.joinThread("apps_list", {
      firstModerator: moderator,
      members: false
    });
    console.log('thread', thread);
    this.setState({ thread }, () => (this.getAppsThread()));
  }
  async getAppsThread() {
    if (!this.state.thread) {
      console.error("apps thread not in react state");
      return;
    }
    const posts = await this.state.thread.getPosts();
    this.setState({ posts });

    await this.state.thread.onUpdate(async () => {
      const posts = await this.state.thread.getPosts();
      this.setState({ posts });
    })
  }
  render() {

    if(this.state.needToAWeb3Browser){
      return <h1>Please install metamask</h1>
    }

    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/add">Add app</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/add">
              <AddApp
                accounts={this.state.accounts}
                thread={this.state.thread}
                getAppsThread={this.getAppsThread.bind(this)}
              />
              {!this.state.accounts && <h1>Login with metamask</h1>}
            </Route>
            <Route path="/">
              <Home
                posts={this.state.posts}
                space={this.state.space}
                box={this.state.box}
                getAppsThread={this.getAppsThread}
                usersAddress={
                  this.state.accounts ? this.state.accounts[0] : null
                }
                ethereum={window.ethereum}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

class Profile extends Component {
  render() {
    return <h2>Profile </h2>;
  }
}
