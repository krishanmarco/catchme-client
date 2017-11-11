/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import React from 'react';
import PropTypes from 'prop-types';
import {Avatar} from './Avatar';



// ListItemWithActionNone *********************************************************************************
// ListItemWithActionNone *********************************************************************************

export const AvatarCircle = ({uri, badge, rkType}) => (
      <Avatar rkType={`circle ${rkType}`} badge={badge} img={{uri: uri}}/>
);

AvatarCircle.propTypes = {
  rkType: PropTypes.string
};

