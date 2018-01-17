// Base imports
import React, { Component } from 'react';
import {
  Page, Toolbar, ToolbarButton, Icon, Button, ProgressCircular,
  Splitter, SplitterSide, SplitterContent, List, ListItem
} from 'react-onsenui';

// Styling
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  renderToolbar() {
    return (
      <Toolbar>
        <div className='center'>React Cordova Starter</div>
      </Toolbar>
    );
  }

  render() {
    return (
      <div>
        {this.renderToolbar()}
        <div style={{color:'black'}}>Hello React in cordova</div>
      </div>
    );
  }
}
