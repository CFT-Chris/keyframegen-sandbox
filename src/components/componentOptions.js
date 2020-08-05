import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setTransform } from '../redux/actions';
import { IonLabel, IonText, IonCheckbox, IonItem, IonList, IonSelect, IonSelectOption, IonInput } from '@ionic/react';
import './componentOptions.css';
import { TRANSFORM_COMPONENT_TYPES, EASING_TYPES } from '../constants';

const ComponentOptions = ({ index, data, serialization, setTransform }) => {
  const [showControls, setShowControls] = useState(false);
  let [localState, setLocalState] = useState({ ...serialization });
  const toggleControls = () => {
    setShowControls(!showControls);
  };
  const setProperty = (property, { useDefault, value }) => {
    let dataNew;
    
    if (useDefault === true) {
      dataNew = { ...data };
      delete(dataNew[property]);
    }
    else if (useDefault === false || (value !== undefined && JSON.stringify(value) !== JSON.stringify(localState[property]))) {
      let resetFromTo = false;

      if (value !== undefined) {
        resetFromTo = property === 'type' 
          && ((TRANSFORM_COMPONENT_TYPES[value] && !TRANSFORM_COMPONENT_TYPES[localState[property]]) 
            || (!TRANSFORM_COMPONENT_TYPES[value] && TRANSFORM_COMPONENT_TYPES[localState[property]]));

        localState = { ...localState, [property]: value };

        if (resetFromTo) {
          delete(localState.from);
          delete(localState.to);
        }

        setLocalState(localState);
      }

      dataNew = { ...data, [property]: localState[property] };

      if (resetFromTo) {
        delete(dataNew.from);
        delete(dataNew.to);
      }
    }

    if (dataNew)
      setTransform(dataNew, index);
  };

  // Restore from/to with default values from serialization, in case of resetFromTo from a prior dispatch
  if (localState.type === serialization.type) {
    localState.from = localState.from || serialization.from;
    localState.to = localState.to || serialization.to;
  }

  return(
    <IonLabel className="ion-text-wrap">
      <div className={`controlsContainer ${showControls ? 'controlsExpanded' : ''}`}>
        <div className="controlsHeader" onClick={toggleControls}>
          <div className="controlsArrow" >&#9654;</div>
          <span className="componentType">{data.type}</span>
          <IonText color="medium" className="componentSerialization">{
            JSON.stringify(serialization, (k, v) => k !== 'type' ? v : undefined, 1)
          }</IonText>
        </div>
        <div className="controlsBody">
          <IonList>
            {
              Object.keys(serialization).map((property) => (
                <IonItem key={`property-${property}`} lines="none">
                  <IonText slot="start" className="smallLabel propertyText">
                    {property}
                  </IonText>
                  <IonItem slot="start">
                    {property !== 'type'
                      ? (<><IonCheckbox checked={!(property in data)} onIonChange={e => setProperty(property, { useDefault: e.target.checked })} />&nbsp;
                          <IonLabel className="smallLabel">Use default</IonLabel></>)
                      : ''
                    }
                  </IonItem>
                  <IonItem style={{ width: '100%', fontSize: '0.8em' }}>
                    {
                        property === 'type'
                      ? (<IonSelect
                          value={localState[property]} 
                          onIonChange={e => setProperty(property, { value: e.target.value })}
                          interface="popover"
                         >
                          {Object.keys(TRANSFORM_COMPONENT_TYPES).map(type => (
                            <IonSelectOption key={`type-${type}`}>{type}</IonSelectOption>
                          ))}
                        </IonSelect>)
                      : property === 'easing'
                      ? (<IonSelect 
                          value={localState[property]} 
                          onIonChange={e => setProperty(property, { value: e.target.value })}
                          interface="popover"
                        >
                          {EASING_TYPES.map(type => (
                            <IonSelectOption key={`type-${type}`}>{type}</IonSelectOption>
                          ))}
                        </IonSelect>)
                      : (property === 'duration' || property === 'delay')
                      ? (<IonInput 
                          value={localState[property]} 
                          onIonChange={e => setProperty(property, { value: parseInt(e.target.value) })}
                          type="number"
                          step="10"
                          min="0"
                          max="20000"
                          debounce="100"
                        >
                        </IonInput>)
                      : ((property === 'from' || property === 'to') && property in localState)
                      ? (typeof localState[property] === 'number'
                          ? (<><IonInput 
                              value={localState[property]} 
                              onIonChange={e => setProperty(property, { value: parseFloat(e.target.value) })}
                              type="number"
                              step="1"
                              min="-360"
                              max="360"
                              debounce="100"
                            >
                            </IonInput> {'degrees'}</>)
                          : (<>
                              {'x'} <IonInput 
                                  value={localState[property].x} 
                                  onIonChange={e => setProperty(property, { value: { x: parseFloat(e.target.value), y: localState[property].y } })}
                                  type="number"
                                  step="1"
                                  min="-10000"
                                  max="10000"
                                  debounce="100"
                                >
                                </IonInput>
                              {'y'} <IonInput 
                                    value={localState[property].y} 
                                    onIonChange={e => setProperty(property, { value: { x: localState[property].x, y: parseFloat(e.target.value) } })}
                                    type="number"
                                    step="1"
                                    min="-10000"
                                    max="10000"
                                    debounce="100"
                                  >
                                </IonInput>
                            </>)
                        )
                      : (property === 'stiffness' || property === 'bounces')
                      ? (<IonInput 
                            value={localState[property]} 
                            onIonChange={e => setProperty(property, { value: parseInt(e.target.value) })}
                            type="number"
                            step="1"
                            min="0"
                            max="100"
                            debounce="100"
                          >
                          </IonInput>)
                      : <IonText color="medium">Unrecognized property</IonText>
                    }
                  </IonItem>
                </IonItem>
              ))
            }
          </IonList>
        </div>
      </div>      
    </IonLabel>    
  );
}

export default connect(null, { setTransform })(ComponentOptions);