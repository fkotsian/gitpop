const React = require('react');

class Loader extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    );
  };
};

module.exports = Loader;
