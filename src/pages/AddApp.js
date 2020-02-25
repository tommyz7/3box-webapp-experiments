import React from "react";
import AppForm from "./../components/AppForm";

class AddApp extends React.Component {
  savePost = async formData => {
    formData.account = this.props.accounts[0];
    await this.props.thread.post(formData);
    await this.props.getAppsThread();
  }
  render() {
    return (
      <div className="container">
        <h1 style={{ textAlign: "center" }}>Submit your Application!</h1>
        <AppForm savePost={this.savePost} />
      </div>
    );
  }
}
export default AddApp;
