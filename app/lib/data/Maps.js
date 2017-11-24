/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import {Icons} from "../../Config";


export default class Maps {


  static _EGenders = [
    {value: 0,     icon: Icons.friendRequestAccept},
    {value: 1,     icon: Icons.friendRequestAccept},
    {value: 2,     icon: Icons.friendRequestAccept}
  ];

  static genderDefault() {
    return Maps._EGenders[2];
  }

  static genderToIcon(value) {
    return _.get(Maps._EGenders, `[${value}].icon`, Maps.genderDefault().icon);
  }





  static _EReputations = [
    {value: 200,        icon: Icons.friendRequestAccept,      name: 'joe'},
    {value: 800,        icon: Icons.friendRequestAccept,      name: 'dude'},
    {value: 3200,       icon: Icons.friendRequestAccept,      name: 'hero'},
    {value: 12800,      icon: Icons.friendRequestAccept,      name: 'vip'},
    {value: 51200,      icon: Icons.friendRequestAccept,      name: 'catcher'},
    {value: Infinity,   icon: Icons.friendRequestAccept,      name: 'su'}
  ];

  static reputationToIcon(value) {
    const rep = Maps._EReputations.filter(r => r.value > value);
    return _.get(rep, '[0].icon', Maps._EReputations[0].icon);
  }





  static _EPrivacySettings = [
      {value: 0,        label: 'Only me'},
      {value: 1,        label: 'My friends'},
      {value: 2,        label: 'Everyone'},
  ];

  static privacyOptions() {
    return Maps._EPrivacySettings.slice(0);
  }


}