import React from "react";
import { BounceLoader } from "react-spinners";
import AppCard from "./../components/AppCard";

export default class Home extends React.Component {
  render() {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        <h1 className="brand-font" style={{ fontSize: "4rem" }}>
          Distribute
        </h1>
        <p>The Decentralised App Store.</p>
        <div className="row" style={{ marginTop: "10%" }}>
          {(!this.props.posts || this.props.posts.length < 1) && (
            <div style={{ width: "60px", margin: "auto" }}>
              <BounceLoader color={"blue"} />
            </div>
          )}
          <div className="container">
            <div className="row">
              {this.props.posts &&
                this.props.posts.map((post, i) => {
                  return (
                      <AppCard
                        ethereum={this.props.ethereum}
                        post={post}
                        key={i}
                        threeBox={this.props.threeBox}
                        space={this.props.space}
                        box={this.props.box}
                        usersAddress={this.props.usersAddress}
                        i={i} />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
