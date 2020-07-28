import React from 'react';
import { connect } from 'react-redux';
import { setOptions, replayAnimation } from '../redux/actions';
import { IonItem, IonLabel, IonCheckbox, IonInput, IonButton, IonIcon } from '@ionic/react';
import { reload } from 'ionicons/icons';

const AnimationControls = ({ setOptions, replayAnimation, activeType, simpleDuration, loop }) => (
  <>
    <IonItem lines="none">
      <IonLabel>Duration</IonLabel>
      <IonInput 
        slot="end"
        type="number" 
        min="0" 
        max="10000"
        debounce="100"
        step="10"
        onIonChange={e => setOptions({ duration: parseInt(e.target.value) })}
        value={activeType === 'COMPLEX' ? 0 : simpleDuration}
        readonly={activeType === 'COMPLEX'}
        style={{ textAlign: 'right' }}
      />
    </IonItem>
    <IonItem lines="none">
      <IonLabel>Loop</IonLabel>
      <IonButton 
        slot="end" 
        fill="clear" 
        disabled={loop}
        onClick={() => replayAnimation()}
      >
        <IonIcon icon={reload} slot="start"></IonIcon>
        <IonLabel slot="end">Replay</IonLabel>
      </IonButton>
      <IonCheckbox onIonChange={e => setOptions({ loop: e.target.checked })}></IonCheckbox>
    </IonItem>
  </>
);

const mapStateToProps = state => ({
  activeType: state.keyframesType,
  simpleDuration: state.simpleDuration,
  loop: state.sharedOptions.loop
});

export default connect(mapStateToProps, { setOptions, replayAnimation })(AnimationControls);