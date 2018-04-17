/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import {DefaultLoader} from '../Misc';


// Const *************************************************************************************************
// Const *************************************************************************************************

type Props = {
  objects: Array,
  renderChild: Function,
  renderFallback: ?Function
};

// NullableObjects **************************************************************************************
// NullableObjects **************************************************************************************

const NullableObjects = ({objects, renderChild, renderFallback}: Props) => {

  for (let i = 0; i < objects.length; i++)
    if (objects[i] == null)
      return renderFallback();

  return renderChild(objects);
};

const _DefaultLoader = () => <DefaultLoader/>;

NullableObjects.defaultProps = {
  renderFallback: _DefaultLoader
};


export default NullableObjects;

