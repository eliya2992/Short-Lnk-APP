import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PropTypes from 'prop-types';

// export default class PrivateHeader extends React.Component {
  // onLogout () {
  //   Accounts.logout();
  // }
  // render() {
  //   return (
  //     <div>
  //       <h1>{this.props.title}</h1>
  //       <button onClick={this.onLogout.bind(this)}>Logout</button>
  //     </div>
//     );
//   }
// }

const PrivateHeader = (props) => {
  return (
    <div className="header">
      <div className="header__content">
        <h1 className="header__title">{props.title}</h1>
        <button onClick={() => Accounts.logout()} className="button button--link-text">Logout</button>
      </div>
    </div>
  );
};

PrivateHeader.propTypes = {
  title: React.PropTypes.string.isRequired
};

export default PrivateHeader;
