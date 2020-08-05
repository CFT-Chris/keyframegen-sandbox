import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import logo from '../logo.svg';
import './previewer.css';
import { Simple, Complex } from 'keyframegen';
import { IonFab, IonFabButton, IonIcon, IonFabList, IonToast } from '@ionic/react';
import { copy, logoCss3, logoJavascript, codeWorking } from 'ionicons/icons';

const Previewer = ({ activeType, simpleDuration, activeName, loop, replays, complexSerialization, complexTransforms }) => {
  const [simpleKeyframes, setSimpleKeyframes] = useState(null);
  const [complexKeyframes, setComplexKeyframes] = useState(null);
  const [typeLastApplied, setTypeLastApplied] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState(false);
  const imageRef = useRef();
  const copyToClipboard = data => {
    if ('clipboard' in navigator) {
      const keyframes = typeLastApplied === 'SIMPLE'
        ? simpleKeyframes
        : complexKeyframes;
      let complexComponents;

      if (typeLastApplied === 'COMPLEX') {
        complexComponents = complexTransforms.map(transform => 
          `  .${transform.type}(` 
          + (Object.keys(transform).length > 1 
            ? JSON.stringify(transform, (k, v) => k !== 'type' ? v : undefined)
            : '')
          + ')'
        ).join('\n');
      }

      navigator.clipboard.writeText(
          data === 'css'
        ? keyframes.get('css')
        : data === 'api'
        ? JSON.stringify(keyframes.get('webapi'), null, 2)
        : typeLastApplied === 'SIMPLE'
        ? `new Simple().set('${activeName}', { duration: ${simpleDuration} })`
        : `new Complex()\n${complexComponents}`)
      .then(
        () => setShowToast(true)
      )
      .catch(
        () => setShowError(true)
      );
    }
    else
      setShowError(true);
  };

  useEffect(() => {
    switch (typeLastApplied) {
      case 'SIMPLE':
        simpleKeyframes.abort();
        break;
      case 'COMPLEX':
        complexKeyframes.abort();
        break;
      default:
        break;
    }

    if (activeType === 'SIMPLE') {
      simpleKeyframes
        .set(activeName, { duration: simpleDuration })
        .applyTo(imageRef.current, { loop });
    }
    else if (activeType === 'COMPLEX') {
      complexKeyframes
        .clear()
        .deserialize(complexSerialization)
        .applyTo(imageRef.current, { loop });
    }

    setTypeLastApplied(activeType);  
  }, [ simpleKeyframes, complexKeyframes, typeLastApplied, activeType, simpleDuration, activeName, loop, replays, complexSerialization ]);

  if (!simpleKeyframes)
    setSimpleKeyframes(new Simple());

  if (!complexKeyframes)
    setComplexKeyframes(new Complex());

  return(
    <div className="previewerContainer">
      <img ref={imageRef} src={logo} className="logo" alt="logo" />
      <IonFab>
        <IonFabButton title="Copy to clipboard">
          <IonIcon icon={copy} />
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton title="Copy as CSS3" onClick={() => copyToClipboard('css')}><IonIcon icon={logoCss3} /></IonFabButton>
          <IonFabButton title="Copy as Web API Keyframes" onClick={() => copyToClipboard('api')}><IonIcon icon={codeWorking} /></IonFabButton>
          <IonFabButton title="Copy as JavaScript code" onClick={() => copyToClipboard('js')}><IonIcon icon={logoJavascript} /></IonFabButton>
        </IonFabList>
      </IonFab>
      <IonToast
        isOpen={showToast}
        onDidDismiss={() => setShowToast(false)}
        message="Code has been copied to the clipboard."
        duration={2000}
        mode="md"
        color="light"
      />
      <IonToast
        isOpen={showError}
        onDidDismiss={() => setShowError(false)}
        message="Could not copy to clipboard."
        duration={2000}
        mode="md"
        color="danger"
      />
    </div>
  );
}

const mapStateToProps = state => ({
  activeType: state.keyframesType,
  simpleDuration: state.simpleDuration,
  activeName: state.keyframesType === 'SIMPLE'
    ? state.simpleName
    : null,
  loop: state.sharedOptions.loop,
  replays: state.sharedOptions.replays,
  complexSerialization: state.complexTransforms.serialization,
  complexTransforms: state.complexTransforms.data,
});

export default connect(mapStateToProps)(Previewer);