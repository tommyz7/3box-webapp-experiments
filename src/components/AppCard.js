import React, { Component } from "react";

export default class AppCard extends Component {
  connect = async () => {
    await this.props.ethereum.send({
      method: 'wallet_enable',
      params: [{
        wallet_plugin: { [this.props.post.message.url]: {} },
      }]
    })
  }

  render(){
    return (
    <>
      <div className="col-sm-4">
        <div style={{ padding: "20px" }}>
          <h5>
            {this.props.post.message.name ? this.props.post.message.name : "unknown"}
          </h5>
          <img
            style={{ height: "10vw" }}
            src={
              this.props.post.message.appImage
                ? this.props.post.message.appImage
                : "https://via.placeholder.com/200"
            }
            onError={ev =>
              (ev.target.src =
                "http://www.stleos.uq.edu.au/wp-content/uploads/2016/08/image-placeholder-350x350.png")
            }
          />
          <p>{this.props.post.message.description}</p>
          {this.props.post.message.url && (
            <p>
              <a href={this.props.post.message.url} target="_blank">
                website
              </a>
            </p>
          )}
          {this.props.post.message.account && (
            <div style={{ marginBottom: "10px" }}>
              <p>Submitted by {this.props.post.message.account}</p>
            </div>
          )}
          {this.props.post.message.url && ( <button onClick={this.connect}>Install</button> )}
        </div>
      </div>
      {(this.props.i + 1) % 3 == 0 && <div className="w-100"></div>}
    </>)
  }

}
