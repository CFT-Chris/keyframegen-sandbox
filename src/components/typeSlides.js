import React from 'react';
import { connect } from 'react-redux';
import { IonSlides, IonSlide, IonChip, IonLabel, IonIcon } from '@ionic/react';
import { alertCircle } from 'ionicons/icons';
import { KEYFRAMES_TYPES } from '../constants';

const oSlideOptions = {
  zoom: {
    toggle: false
  },
  centeredSlides: true
};

class TypeSlides extends React.Component {
  constructor(props) {
    super(props);
    this.ionSlides = React.createRef();
  }

  async componentDidUpdate() {
    await this.ionSlides.current.lockSwipes(false);
    await this.ionSlides.current.slideTo(Object.keys(KEYFRAMES_TYPES).indexOf(this.props.activeType));
    await this.ionSlides.current.lockSwipes(true);
  }

  onSlidesDidLoad() {
    this.ionSlides.current.lockSwipes(true);
  }

  render = () => (
    <IonSlides ref={this.ionSlides} options={oSlideOptions} onIonSlidesDidLoad={this.onSlidesDidLoad.bind(this)}>
      {Object.keys(KEYFRAMES_TYPES).map(keyframeType => (
        <IonSlide value={keyframeType} key={`slide-keyframes-type-${keyframeType}`}>
          <IonChip color="warning">
            <IonIcon icon={alertCircle}></IonIcon>
            <IonLabel>{`Not yet implemented: ${KEYFRAMES_TYPES[keyframeType]} Selector`}</IonLabel>
          </IonChip>
        </IonSlide>
      ))}
    </IonSlides>
  );
} 

const mapStateToProps = state => ({
  activeType: state.keyframesType
});

export default connect(mapStateToProps)(TypeSlides);
