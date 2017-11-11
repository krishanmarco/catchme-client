/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {DefaultLoader} from '../Misc';

const NullableObjects = ({objects, renderChild, renderFallback}) => {

  for (let i = 0; i < objects.length; i++)
    if (objects[i] == null)
      return renderFallback();

  return renderChild(objects);
};

NullableObjects.defaultProps = {
  renderFallback: () => <DefaultLoader/>
};

NullableObjects.propTypes = {
  renderChild: PropTypes.func.isRequired,
  renderFallback: PropTypes.func,
  objects: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default NullableObjects;

