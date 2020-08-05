import React from 'react';
import { connect } from 'react-redux';
import ComplexControls from './complexControls';
import ComplexTransforms from './complexTransforms';

const ComplexConstructor = () => {
  return(
    <>
      <ComplexControls />
      <ComplexTransforms />
    </>
  );
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(ComplexConstructor);