import React from 'react';
import { connect } from 'react-redux';
import { setSimpleActive } from '../redux/actions';
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/react';
import { Simple } from 'keyframegen';

const SimpleSelector = ({ setSimpleActive, activeName }) => (
  <IonItem lines="none">
    <IonLabel>Effect</IonLabel>
    <IonSelect interface="popover" value={activeName} onIonChange={e => setSimpleActive(e.target.value)}>
      {Object.keys(Simple.EffectClasses).map(effectName => (
        <IonSelectOption key={`simple-effect-${effectName}`} value={effectName}>{`${effectName[0]}`.toUpperCase() + effectName.slice(1)}</IonSelectOption>
      ))}
    </IonSelect>
  </IonItem>
);

const mapStateToProps = state => ({
  activeName: state.simpleName
});

export default connect(mapStateToProps, { setSimpleActive })(SimpleSelector);