import React from 'react';
import { Meteor } from 'meteor/meteor';
import Modal from 'react-modal';
// import { Links } from '../api/links';

export default class AddLink extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        url: '',
        isOpen: false,
        error: ''
    }
  }
  onSubmit(e) {
    const url = this.state.url;
    e.preventDefault();

    Meteor.call('links.insert' , url, (err, res) => {
      if(!err) {
        this.handleModalClose();
      } else {
        this.setState({error: err.reason})
      }
    });
    // Links.insert({ url, userId: Meteor.userId() });

  }
  onChange(e) {
    this.setState({
      url: e.target.value
    })
  }
  handleModalClose(){
    this.setState({
      url: '',
      isOpen: false,
      error: ''
    });
  }
  render() {
    return (
      <div>
        <button onClick={() => this.setState({isOpen: true})} className="button">+ Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal">
          <h1>Add Link:</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
            <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
              <input
                type="text"
                placeholder="URL"
                value={this.state.url}
                onChange={this.onChange.bind(this)}
                ref="url"/>
              <button className="button">Add Link</button>
              <button
                type="button"
                onClick={this.handleModalClose.bind(this)}
                className="button button--secondary">
                  Cancel
              </button>
            </form>

        </Modal>
      </div>
    );
  }
}
