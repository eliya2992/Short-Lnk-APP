import { Meteor } from 'meteor/meteor';
import React from 'react';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinksListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      justCopied: false
    };
  }
  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on('success', () => {
      this.setState({ justCopied: true });
      setTimeout(() => this.setState({ justCopied: false }), 1250);
    }).on('error', () => {
      alert('Unable to copy, copy manually');
    })
  }
  componentWillUnmount() {
    this.clipboard.destroy();
  }
  renderStats() {
      const visitMessage = this.props.visitedCount === 1 ? 'Visit' : 'Visits';
      let visitedMessage = null;
      if(typeof this.props.lastVisitedAt === 'number') {
        visitedMessage = `(visited  ${moment(this.props.lastVisitedAt).fromNow()})`
      }
      return (
      <p className="item___message">
        {this.props.visitedCount} {visitMessage} {visitedMessage}
      </p>
    );
  }
  render() {
    return (
      <div className="item">
        <h2>{this.props.url}</h2>
        <p className="item___message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <a href={this.props.shortUrl} target="_blank" className="button button--link button--pill">
          Visit
        </a>
        <button ref="copy" data-clipboard-text={this.props.shortUrl} className="button button--pill">
          {this.state.justCopied ? 'Copied' : 'Copy'}
        </button>
        <button onClick={() => Meteor.call('links.setVisibility', this.props._id, !this.props.visible)} className="button button--pill">
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
}

LinksListItem.propTypes = {
  _id: React.PropTypes.string.isRequired,
  url: React.PropTypes.string.isRequired,
  visible: React.PropTypes.bool.isRequired,
  userId: React.PropTypes.string.isRequired,
  shortUrl: React.PropTypes.string.isRequired,
  visitedCount: React.PropTypes.number,
  lastVisitedAt: React.PropTypes.number
};
