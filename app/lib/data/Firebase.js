/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/
import * as firebase from 'firebase';
import {Const} from '../../Config';

const firebaseConfig = {
    ...Const.Firebase
};

firebase.initializeApp(firebaseConfig);
export default firebase;