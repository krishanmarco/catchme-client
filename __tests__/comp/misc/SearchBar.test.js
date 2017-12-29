/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 17/12/17 © **/
import React from 'react';
import 'react-native';
import renderer from 'react-test-renderer';
import {SearchBar} from '../../../app/comp/Misc';


describe('comp/misc/SearchBar.js', () => {

  it('renders', () => {
    renderer.create(
        <SearchBar onChange={() => {}}/>
    );
  });


});

