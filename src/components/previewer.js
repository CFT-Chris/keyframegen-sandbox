import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import logo from '../logo.svg';
import './previewer.css';
import { Simple } from 'keyframegen';
import { IonFab, IonFabButton, IonIcon, IonFabList, IonToast } from '@ionic/react';
import { copy, logoCss3, logoJavascript, codeWorking } from 'ionicons/icons';

const Previewer = ({ activeType, simpleDuration, activeName, loop, replays }) => {
  const [simpleKeyframes, setSimpleKeyframes] = useState(null);
  const [typeLastApplied, setTypeLastApplied] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState(false);
  const imageRef = useRef();
  const copyToClipboard = data => {
    if ('clipboard' in navigator && typeLastApplied === 'SIMPLE' && simpleKeyframes) {
      navigator.clipboard.writeText(
          data === 'css'
        ? simpleKeyframes.get('css')
        : data === 'js'
        ? `new Simple().set('${activeName}', { duration: ${simpleDuration} })`
        : JSON.stringify(simpleKeyframes.get('webapi'), null, 2))
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
      default:
        break;
    }

    if (activeType === 'SIMPLE') {
      simpleKeyframes
        .set(activeName, { duration: simpleDuration })
        .applyTo(imageRef.current, { loop });
    }

    setTypeLastApplied(activeType);  
  }, [ simpleKeyframes, typeLastApplied, activeType, simpleDuration, activeName, loop, replays ]);

  if (!simpleKeyframes)
    setSimpleKeyframes(new Simple());

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
  replays: state.sharedOptions.replays
});

export default connect(mapStateToProps)(Previewer);