import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { IonSlides, IonSlide, IonChip, IonLabel, IonIcon, IonList } from '@ionic/react';
import { alertCircle } from 'ionicons/icons';
import { KEYFRAMES_TYPES } from '../constants';
import SimpleSelector from './simpleSelector';
import AnimationControls from './animationControls';
import ComplexConstructor from './complexConstructor';
import './typeSlides.css';

const oSlideOptions = {
  zoom: {
    toggle: false
  },
  centeredSlides: true
};

const TypeSlides = ({ activeType }) => {
  const refSlides = useRef();
  const onSlidesDidLoad = () => {
    refSlides.current.lockSwipes(true);
  };

  useEffect(() => {
    const slideTo = async () => {
      await refSlides.current.lockSwipes(false);
      await refSlides.current.slideTo(Object.keys(KEYFRAMES_TYPES).indexOf(activeType));
      await refSlides.current.lockSwipes(true);
    };
    slideTo();
  }, [activeType]);

  return(
    <IonSlides ref={refSlides} options={oSlideOptions} onIonSlidesDidLoad={() => onSlidesDidLoad()}>
      {Object.keys(KEYFRAMES_TYPES).map(keyframeType => (
        <IonSlide value={keyframeType} key={`slide-keyframes-type-${keyframeType}`}>
          {
              keyframeType === 'SIMPLE'
            ? (<IonList>
                <AnimationControls />
                <SimpleSelector />
              </IonList>)
            : keyframeType === 'COMPLEX'
            ? (<IonList>
                <AnimationControls />
                <ComplexConstructor />
              </IonList>)
            : (<IonChip color="warning">
                <IonIcon icon={alertCircle}></IonIcon>
                <IonLabel>{`Not yet implemented: ${KEYFRAMES_TYPES[keyframeType]} Selector`}</IonLabel>
              </IonChip>)
          }
        </IonSlide>
      ))}
    </IonSlides>
  );
}

const mapStateToProps = state => ({
  activeType: state.keyframesType
});

export default connect(mapStateToProps)(TypeSlides);
