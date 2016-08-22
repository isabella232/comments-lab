import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

import { setToggler, setTopic, URLFromToggler} from 'playground/PlaygroundActions';

import {themes} from 'playgroundSettings';

import {Grid, Cell, Switch} from 'react-mdl';

@Radium
class CustomizerToggle extends React.Component {

  onTogglerClick() {
    let currentStatus = this.props.toggler.status;
    if (this.props.toggler.offFunction && this.props.toggler.onFunction) {
      this.props.dispatch(currentStatus ? this.props.toggler.offFunction : this.props.toggler.onFunction);
    }
    this.props.dispatch(setToggler(this.props.groupIndex, this.props.togglerIndex, !currentStatus));
    this.setState({ active: !currentStatus });
    this.props.setURL(this.props.togglerIndex, !currentStatus);
  }

  onMouseEnter() {
    if (this.props.toggler.topic) {
      this.props.dispatch(setTopic(this.props.toggler.topic));
    }
  }

  render() {

    return (

      <div style={ [ styles.base, this.props.toggler.status ? styles.active : null ] } onMouseEnter={ this.onMouseEnter.bind(this) } >
        <Grid>
          <Cell col={10}>
            <div style={ styles.descriptionSpan }>{ this.props.toggler.status ? this.props.toggler.label : this.props.toggler.offLabel }</div>
         </Cell>
         <Cell col={2}>
           <Switch ripple color={ '#F77260' } checked={ this.props.toggler.status } onChange={this.onTogglerClick.bind(this)} />
         </Cell>
        </Grid>
        <Grid>
          <Cell col={12}>
            <p style={ styles.description }>
              { this.props.toggler.description }
            </p>
          </Cell>
        </Grid>
      </div>

    );

  }
}

// same as the @connect decorator above
export default CustomizerToggle;

var styles = {
  base: {
    padding: '20px 40px',
    borderBottom: '1px solid #999',
    borderTop: '1px solid #999',
    marginTop: '-1px',
    minHeight: '100px',
    width: '100%',
    transition: 'background .5s',
    cursor: 'pointer',
    backgroundColor: 'rgba(255,255,255,.35)'
  },
  active: {
    backgroundColor: 'white'
  },
  label: {
    display: 'block',
    width: '80px',
    height: '30px',
    borderRadius: '15px',
    marginBottom: '10px',
    border: '1px solid #aaa',
    overflow: 'hidden',
    position: 'relative',
    cursor: 'pointer'
  },
  descriptionSpan: {
    fontWeight: 'bold',
    fontFamily: themes.default.fontFamily,
    fontSize: '14pt',
    lineHeight: '30px'
  },
  description: {
    color: '#666',
    fontFamily: themes.default.fontFamily,
    fontSize: '11pt'
  },
  checkbox: {
    display: 'none'
  },
  switchExtra: {
    'float': 'left',
    margin: '0 10px 0 0',
    fontFamily: themes.default.fontFamily
  }
};
