import React, { useState } from 'react';
import { connect } from 'react-redux';
import { IonItem, IonButton, IonIcon, IonLabel, IonPopover, IonList, IonToast } from '@ionic/react';
import { trash, add } from 'ionicons/icons';
import { addTransform, removeTransform } from '../redux/actions';
import * as presets from '../presets/complex';

const ComplexControls = ({ addTransform, removeTransform, complexSerialization }) => {
  const [presetPopoverEvent, setShowPresetPopover] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const exportPreset = () => {
    if ('clipboard' in navigator) {
      navigator.clipboard
        .writeText(JSON.stringify(complexSerialization, null, 2))
        .then(
          () => setShowToast(true)
        );
    }

    setShowPresetPopover(null);
  };
  const applyPreset = (name) => {
    addTransform(presets[name]);
    setShowPresetPopover(null);
  };

  return(
    <>
      <IonItem lines="none">
        <IonButton slot="end" fill="clear" onClick={() => removeTransform({ all: true })}>
          <IonIcon icon={trash} slot="start"></IonIcon>
          <IonLabel>Start over</IonLabel>
        </IonButton>
        <IonButton slot="end" fill="clear" onClick={(e) => { e.persist(); setShowPresetPopover(e); }}>
          <IonIcon icon={add} slot="start"></IonIcon>
          <IonLabel>Add preset ...</IonLabel>
        </IonButton>
        <IonButton slot="end" fill="clear" onClick={() => addTransform()}>
          <IonIcon icon={add} slot="start"></IonIcon>
          <IonLabel>Add transform</IonLabel>
        </IonButton>
      </IonItem>
      <IonPopover
        isOpen={!!presetPopoverEvent}
        onDidDismiss={() => setShowPresetPopover(null)}
        event={presetPopoverEvent}
        >
        <IonList>
          {Object.keys(presets).map(name => (
            <IonItem key={`preset-${name}`} button={true} onClick={() => applyPreset(name)}>{name}</IonItem>
          ))}
          <IonItem button={true} onClick={() => exportPreset()}>Export current as preset ...</IonItem>
        </IonList>
      </IonPopover>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Preset has been copied to the clipboard."
        duration={2000}
        mode="md"
        color="light"
      />
    </>
  );
}

const mapStateToProps = state => ({
  complexSerialization: state.complexTransforms.serialization
});

export default connect(mapStateToProps, { addTransform, removeTransform })(ComplexControls);