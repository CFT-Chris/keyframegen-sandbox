import React from 'react';
import { connect } from 'react-redux';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { setType } from '../redux/actions';
import { KEYFRAMES_TYPES } from '../constants';
import './typeSlides.css';

const TypeSelector = ({ setType, activeType }) => (
  <IonSegment onIonChange={e => setType(e.target.value)} value={activeType}>
    {Object.keys(KEYFRAMES_TYPES).map(keyframeType => (
      <IonSegmentButton value={keyframeType} key={`keyframes-type-${keyframeType}`}>
        <IonLabel>{KEYFRAMES_TYPES[keyframeType]}</IonLabel>
      </IonSegmentButton>
    ))}
  </IonSegment>
);
  
const mapStateToProps = state => ({
  activeType: state.keyframesType
});

export default connect(mapStateToProps, { setType })(TypeSelector);