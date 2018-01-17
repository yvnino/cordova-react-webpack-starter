import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import App from './src/components/app/app.jsx';

class ReactWebpackCordova extends Component {

  constructor(props) {
    super(props);

    this.onDeviceReady = this.onDeviceReady.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onResume = this.onResume.bind(this);

  }

  // Add listeners to events when device is ready
  onDeviceReady() {
    //document.addEventListener("pause", this.onPause(), false);
    //document.addEventListener("resume", this.onResume(), false);
    // Add similar listeners for other events
  }

  onPause() {
    // Handle the pause event
    //console.log('onPause');
  }

  onResume() {
    // Handle the resume event
    //console.log('onResume');
  }

  componentDidMount() {
   document.addEventListener("deviceready", this.onDeviceReady(), false);
  }

  render() {
    return (
      <div style={{backgroundColor:'#b6e2e0'}}>
        <App />
      </div>
    )
  }
};

ReactDOM.render(
  <ReactWebpackCordova />,
  document.getElementById('ReactTarget')
);
