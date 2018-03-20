/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import _ from 'lodash';
import React from 'react';
import {RkTextInput as _RkTextInput, RkStyleSheet, RkText} from 'react-native-ui-kitten';
import {denormObj} from '../../../lib/HelperFunctions';
import {Picker, StyleSheet, Switch, View} from 'react-native';
import {Validate} from "../../../lib/helpers/Validator";
// todo: refactor with Flow after having flow-typed ReduxPool

export const RkTextInput = ({rkType, style, errorCode, ...props}) => {

  let rowOverride = {};
  if (rkType === 'row')
    rowOverride = {paddingVertical: 0, marginVertical: 0};

  return (
      <View style={[styles.row, rowOverride, style]}>
        <_RkTextInput {...props} rkType={rkType}/>
        {errorCode !== 0 && (<RkText rkType='danger  small'>{Validate.mapErrorCodeToMessage(errorCode)}</RkText>)}
      </View>
  );
};


export const RkSwitch = ({title, style, textProps, ...props}) => (
    <View style={[style, styles.row]}>
      <RkText {...textProps} rkType='header6'>{title}</RkText>
      <Switch {...props} style={styles.switch}/>
    </View>
);


export const RkMultiChoice = ({title, textProps, options = [], style, ...props}) => (
    <View style={[style, styles.row]}>
      <RkText {...textProps} rkType='header6'>{title}</RkText>
      <Picker
          {...props}
          mode={Picker.MODE_DROPDOWN}
          style={{width: 140}}>
        {options.map((item) => <Picker.Item key={item.value} {...item}/>)}
      </Picker>
    </View>
);


export const RkTextInputFromPool = ({pool, field, rkType, style, ...props}) => (
    <RkTextInput
        value={String(_.get(pool, `apiInput.${field}`, false) || '')}
        errorCode={_.get(pool, `apiResponse.${field}`, 0)}
        onChangeText={text => pool.change(denormObj({[field]: text}))}
        rkType={rkType}
        style={style}
        {...props}/>
);


export const RkSwitchFromPool = ({pool, field, title, textProps, style, ...props}) => (
    <RkSwitch
        value={_.get(pool, `apiInput.${field}`, true)}
        onValueChange={value => pool.change(denormObj({[field]: value}))}
        {...props}
        style={style}
        title={title}
        textProps={textProps}/>
);


export const RkMultiChoiceFromPool = ({pool, field, title, textProps, options, style, ...props}) => (
    <RkMultiChoice
        selectedValue={_.get(pool, `apiInput.${field}`, options[0].value)}
        onValueChange={value => pool.change(denormObj({[field]: value}))}
        title={title}
        textProps={textProps}
        options={options}
        style={style}
        {...props}/>
);

const styles = RkStyleSheet.create(theme => ({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderColor: theme.colors.border.base,
    alignItems: 'center',
    // borderBottomWidth: StyleSheet.hairlineWidth
  }
}));

