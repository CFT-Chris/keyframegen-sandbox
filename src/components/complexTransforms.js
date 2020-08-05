import React from 'react';
import { connect } from 'react-redux';
import { removeTransform, reorderTransform } from '../redux/actions';
import { IonReorderGroup, IonItem, IonButton, IonIcon, IonReorder } from '@ionic/react';
import { close } from 'ionicons/icons';
import ComponentOptions from './componentOptions';

const ComplexTransforms = ({ transforms, serialization, removeTransform, reorderTransform }) => {
  const doReorder = event => {
    reorderTransform(event.detail.from, event.detail.to);
    event.detail.complete();
  };
  return(
    <IonReorderGroup disabled={false} onIonItemReorder={e => doReorder(e)}>
      {transforms.map((transform, index) => (
        <IonItem key={`transform-${index}`} lines="none">
          <IonReorder slot="start" />
          <IonButton slot="start" fill="clear" onClick={() => removeTransform({ from: index, to: index })}>
            <IonIcon icon={close} slot="icon-only"></IonIcon>
          </IonButton>          
          <ComponentOptions index={index} data={transform} serialization={serialization[index]} />
        </IonItem>
      ))}
    </IonReorderGroup>
  );
}

const mapStateToProps = state => ({
  transforms: state.complexTransforms.data,
  serialization: state.complexTransforms.serialization
});

export default connect(mapStateToProps, { removeTransform, reorderTransform })(ComplexTransforms);