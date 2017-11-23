/** Created by Krishan Marco Madan [krishanmarco@outlook.com] on 25/10/2017 © **/

import {connect} from 'react-redux'
import ApiClient from '../lib/data/ApiClient';
import DataProvider from '../lib/data/DataProvider';
import DaoUser from "../lib/daos/DaoUser";
import DaoLocation from "../lib/daos/DaoLocation";
import ManagerWeekTimings from "../lib/helpers/ManagerWeekTimings";
import _ from 'lodash';
import {denormObj, mergeWithoutExtend, seconds} from '../lib/HelperFunctions';
import {Const} from "../Config";
import DaoUserLocationStatus from "../lib/daos/DaoUserLocationStatus";




// Top Level Ids ******************************************************************************************************
// Top Level Ids ******************************************************************************************************

// ReduxPool Top Level Type Ids
const POOL_TYPE_CACHE = 'POOL_TYPE_CACHE';
const POOL_TYPE_CACHE_MAP = 'POOL_TYPE_CACHE_MAP';
const POOL_TYPE_API_FORMS = 'POOL_TYPE_API_FORMS';
const POOL_TYPE_LOCAL_FORMS = 'POOL_TYPE_LOCAL_FORMS';


const POOL_ACTION_CACHE_INIT_DATA = 'POOL_ACTION_CACHE_INIT_DATA';
const POOL_ACTION_CACHE_SET_DATA = 'POOL_ACTION_CACHE_SET_DATA';
const POOL_ACTION_CACHE_INVALIDATE_DATA = 'POOL_ACTION_CACHE_INVALIDATE_DATA';


const POOL_ACTION_CACHE_MAP_INIT_DATA = 'POOL_ACTION_CACHE_MAP_INIT_DATA';
const POOL_ACTION_CACHE_MAP_SET_DATA = 'POOL_ACTION_CACHE_MAP_SET_DATA';
const POOL_ACTION_CACHE_MAP_INVALIDATE_DATA = 'POOL_ACTION_CACHE_MAP_INVALIDATE_DATA';
const POOL_ACTION_CACHE_MAP_INVALIDATE_ALL_DATA = 'POOL_ACTION_CACHE_MAP_INVALIDATE_DATA';


const POOL_ACTION_API_FORMS_ON_CHANGE = 'POOL_ACTION_API_FORMS_ON_CHANGE';
const POOL_ACTION_API_FORMS_ON_RESET = 'POOL_ACTION_API_FORMS_ON_RESET';
const POOL_ACTION_API_FORMS_ON_POST = 'POOL_ACTION_API_FORMS_ON_POST';
const POOL_ACTION_API_FORMS_ON_FINISH = 'POOL_ACTION_API_FORMS_ON_FINISH';
const POOL_ACTION_API_FORMS_ON_API_EXCEPTION = 'POOL_ACTION_API_FORMS_ON_API_EXCEPTION';
const POOL_ACTION_API_FORMS_ON_ERROR_DISMISS = 'POOL_ACTION_API_FORMS_ON_ERROR_DISMISS';


const POOL_ACTION_LOCAL_FORMS_ON_CHANGE = 'POOL_ACTION_LOCAL_FORMS_ON_CHANGE';
const POOL_ACTION_LOCAL_FORMS_ON_RESET = 'POOL_ACTION_LOCAL_FORMS_ON_RESET';


// Bottom Level Pool Ids **********************************************************************************************
// Bottom Level Pool Ids **********************************************************************************************

// ReduxPoolCache Ids
export const CACHE_ID_USER_PROFILE = 'CACHE_ID_USER_PROFILE';


// ReduxPoolCacheMap Ids
export const CACHE_MAP_ID_USERS = 'CACHE_ID_USERS_LIST';
export const CACHE_MAP_ID_LOCATION_PROFILES = 'CACHE_MAP_ID_LOCATION_PROFILES';
export const CACHE_MAP_ID_USER_PROFILES = 'CACHE_MAP_ID_USER_PROFILES';


// ReduxPoolApiForms Ids
export const FORM_API_ID_LOGIN = 'FORM_API_ID_LOGIN';
export const FORM_API_ID_REGISTER = 'FORM_API_ID_REGISTER';
export const FORM_API_ID_EDIT_USER_PROFILE = 'FORM_API_ID_EDIT_USER_PROFILE';
export const FORM_API_ID_EDIT_USER_LOCATION_STATUS = 'FORM_API_ID_EDIT_USER_LOCATION_STATUS';
export const FORM_API_ID_EDIT_LOCATION_PROFILE = 'FORM_API_ID_EDIT_LOCATION_PROFILE';

// ReduxPoolLocalForms Ids
// export const FORM_LOCAL_ID_PARTIAL_WORKOUT_CREATE = "formLocalWorkoutCreate";

// ReduxPoolModals Ids
// export const MODAL_ID_SELECT_USERS = 'modalSelectUsers';



// ObjectWrappers *****************************************************************************************************
// ObjectWrappers *****************************************************************************************************

export class ReduxPoolCache {

  constructor(cacheId) {

    // Unique pId that identifies this cache out of all the
    // possible objects in objectPoolReducerInitState.cache
    this.cacheId = cacheId;

    // @Nullable
    // The actual data that this cache caches. If null the cache should request/build
    // the data again, else it should return it without requesting it again
    this.data = null;

    // This should be true only when an data is being requsted/built/...
    // and should be set to false right after
    this.loading = false;

    // If one API request for this cache has already been sent out but has not finished
    // yet then this object will be set to the promise returned by the API request.
    // If another request for this same cache then comes through, rather than sending out
    // a duplicate API request, this promise is returned, when the first request is completed
    // even the second request will be fullfilled
    this.loadingPromise = null;
  }

}


class ReduxPoolCacheMap {

  constructor(cacheId) {

    // Unique pId that identifies this cache out of all the
    // possible objects in objectPoolReducerInitState.cache
    this.cacheId = cacheId;

    this.data = {};
  }

}


class ReduxPoolApiForms {

  constructor(formId, apiInput) {

    // Unique pId that identifies this form out of all the
    // possible objects in objectPoolReducerInitState.forms
    this.formId = formId;

    // An object of default value for
    // each field of this form object
    this.apiInput = apiInput;

    // String|null when the form is validated
    // this string should be set (see FormHandlerApi)
    this.validationError = null;

    this.apiResponse = null;
    this.loading = false;
  }

}


class ReduxPoolLocalForms {

  constructor(formId, input) {

    // Unique pId that identifies this form out of all the
    // possible objects in objectPoolReducerInitState.forms
    this.formId = formId;

    // An object of default value for
    // each field of this form object
    this.input = input;

    // String|null when the form is validated
    // this string should be set (see FormHandlerApi)
    this.validationError = null;

  }

}



function build(poolDeclaration) {

  let result = {};

  // for each pool type, add it and its sub pools to the result
  for (let typeId in poolDeclaration) {
    if (poolDeclaration.hasOwnProperty(typeId)) {

      let poolTypeDeclaration = poolDeclaration[typeId];


      // Add the pool type to the result
      result[typeId] = {};


      for (let poolId in poolTypeDeclaration.pools) {
        if (poolTypeDeclaration.pools.hasOwnProperty(poolId)) {

          let poolDeclaration = poolTypeDeclaration.pools[poolId];

          // Add the pool to the result
          result[typeId][poolId] = poolDeclaration.initState();

        }
      }

    }
  }

  return result;
}

function poolIterator(poolDeclaration, poolIds, apply) {

  for (let poolType in poolDeclaration) {
    if (poolDeclaration.hasOwnProperty(poolType)) {

      // Get the whole pool declaration object
      let poolTypeObj = poolDeclaration[poolType];


      for (let poolId in poolTypeObj.pools) {
        if (poolTypeObj.pools.hasOwnProperty(poolId)) {


          if (poolIds.includes(poolId))
            apply(poolType, poolId, poolDeclaration[poolType].pools[poolId]);

        }
      }

    }
  }

}




// ReduxPool Top Level Builders ***************************************************************************************
// ReduxPool Top Level Builders ***************************************************************************************

// The object below declares how the reduxPoolInitState state is built
const ReduxPoolBuilder = {

  // Declare all Top Level Pools (each of the POOL_TYPES)
  [POOL_TYPE_CACHE]: {

    poolActions: {
      [POOL_ACTION_CACHE_INIT_DATA]: (action) => ({
        data: null,
        loading: true,
        loadingPromise: action.loadingPromise
      }),
      [POOL_ACTION_CACHE_SET_DATA]: (action) => ({
        data: action.data,
        loading: false,
        loadingPromise: null
      }),
      [POOL_ACTION_CACHE_INVALIDATE_DATA]: (action) => ({
        data: null,
        loading: false,
        loadingPromise: null
      })
    },

    poolConnect: {

      extraProps: (poolId, pool, stateProps, dispatchProps) => ({
        // No extra props for now
      }),


      mergeMapDispatchToProps: (poolId, pool, dispatch) => ({

        invalidate: () => dispatch({
          poolType: POOL_TYPE_CACHE,
          poolId: poolId,
          type: POOL_ACTION_CACHE_INVALIDATE_DATA
        }),

        initialize: (extraParams) => dispatch((dispatch, getState) => {

          // If the data is already set (or is about to be set [loadingPromise != null]) there is
          // no need to run the request again.

          // If the data has been updated and needs to be requested again, you must
          // use invalidate() and then initialize()


          // Check if the data is set, if it is return
          let reduxPoolCache = getState().reduxPoolReducer[POOL_TYPE_CACHE][poolId];

          if (reduxPoolCache.loadingPromise != null) {
            console.log(`ReduxPool initialize: Requested ${poolId} initialization but already loading.`);
            return reduxPoolCache.loadingPromise;
          }

          if (reduxPoolCache.data !== null)
            return Promise.resolve(reduxPoolCache.data);


          // resolved promise flag
          let promiseResolved = false;

          // Run request or data builder
          let loadingPromise = pool.buildDataSet(dispatch, extraParams)
              .then(buildResultData => {
                promiseResolved = true;

                // Save the result data into the pool
                dispatch({
                  poolType: POOL_TYPE_CACHE,
                  poolId: poolId,
                  type: POOL_ACTION_CACHE_SET_DATA,
                  data: buildResultData
                });

                // Continue the promise chain
                return buildResultData;

              }).catch(apiExceptionResponse => {
                console.log("ReduxPool POOL_ACTION_CACHE_SET_DATA initialize: ", apiExceptionResponse);

                /* todo: remove comment after development
                dispatch({
                  poolType: POOL_TYPE_CACHE,
                  poolId: poolId,
                  type: POOL_ACTION_CACHE_SET_DATA,
                  data: null
                });*/

                // Continue the promise chain
                return apiExceptionResponse;
              });


          // If the promise hasn't resolved immediately then
          // Save loadingPromise to the state, this way, even if [data] is
          // null the next request will not be processed because we know
          // that one has already been sent out
          if (!promiseResolved) {
            return dispatch({
              poolType: POOL_TYPE_CACHE,
              poolId: poolId,
              type: POOL_ACTION_CACHE_INIT_DATA,
              payload: new Promise((resolve, reject) => resolve(loadingPromise)),
              loadingPromise: loadingPromise
            });
          }

          return loadingPromise;
        })

      })

    },

    pools: {
      [CACHE_ID_USER_PROFILE]: {
        initState: () => new ReduxPoolCache(CACHE_ID_USER_PROFILE),
        buildDataSet: (d) => ApiClient.userProfile(d)
      },

    }

  },




  [POOL_TYPE_CACHE_MAP]: {

    poolActions: {
      [POOL_ACTION_CACHE_MAP_INIT_DATA]: (action, state) => (
          Object.assign(state.data, {
            [action.itemId]: Object.assign(new ReduxPoolCache(action.itemId), {
              data: null,
              loading: true,
              loadingPromise: action.loadingPromise
            })
          })
      ),
      [POOL_ACTION_CACHE_MAP_SET_DATA]: (action, state) => (
          Object.assign(state.data, {
            [action.itemId]: Object.assign(new ReduxPoolCache(action.itemId), {
              data: action.data,
              loading: false,
              loadingPromise: null
            })
          })
      ),
      [POOL_ACTION_CACHE_MAP_INVALIDATE_DATA]: (action, state) => {
        delete state.data[action.itemId];
        return state;
      },

      [POOL_ACTION_CACHE_MAP_INVALIDATE_ALL_DATA]: (action) => ({
        data: {},
      })
    },

    poolConnect: {

      extraProps: (poolId, pool, stateProps, dispatchProps) => ({

        get: (itemId, extraParams) => {

          if (!(itemId in stateProps.data)) {
            dispatchProps.initializeItem(itemId, extraParams);
            return null;
          }

          return stateProps.data[itemId].data;
        },


      }),


      mergeMapDispatchToProps: (poolId, pool, dispatch) => ({

        invalidateItem: (itemId) => dispatch({
          poolType: POOL_TYPE_CACHE_MAP,
          poolId: poolId,
          type: POOL_ACTION_CACHE_MAP_INVALIDATE_DATA,
          itemId: itemId
        }),

        invalidateAll: () => dispatch({
          poolType: POOL_TYPE_CACHE_MAP,
          poolId: poolId,
          type: POOL_ACTION_CACHE_MAP_INVALIDATE_ALL_DATA
        }),

        initializeItem: (itemId, extraParams) => dispatch((dispatch, getState) => {

          // If the data is already set (or is about to be set [loadingPromise != null]) there is
          // no need to run the request again.

          // If the data has been updated and needs to be requested again, you must
          // use invalidateItem() and then initializeItem()


          // Check if the data is set, if it is return
          let cacheMapData = getState().reduxPoolReducer[POOL_TYPE_CACHE_MAP][poolId].data;

          if (itemId in cacheMapData) {
            let cacheMapItem = cacheMapData[itemId];

            if (cacheMapItem.loadingPromise != null) {
              console.log(`ReduxPoolCacheMap initializeItem: Requested ${poolId} ${itemId} initialization but already loading.`);
              return cacheMapItem.loadingPromise;
            }


            if (cacheMapItem.data !== null)
              return Promise.resolve(cacheMapItem.data);

          }


          // resolved promise flag
          let promiseResolved = false;

          // Run request or data builder
          let loadingPromise = pool.buildDataSet(dispatch, itemId, extraParams)
              .then(buildResultData => {
                promiseResolved = true;

                // Save the result data into the pool
                dispatch({
                  poolType: POOL_TYPE_CACHE_MAP,
                  poolId: poolId,
                  type: POOL_ACTION_CACHE_MAP_SET_DATA,
                  itemId: itemId,
                  data: buildResultData
                });

                // Continue the promise chain
                return buildResultData;
              })
              .catch(apiExceptionResponse => {
                console.log("ReduxPool POOL_ACTION_CACHE_MAP initializeItem: ", apiExceptionResponse);

                dispatch({
                  poolType: POOL_TYPE_CACHE_MAP,
                  poolId: poolId,
                  type: POOL_ACTION_CACHE_MAP_SET_DATA,
                  itemId: itemId,
                  data: null,
                });

                // Continue the promise chain
                return apiExceptionResponse;
              });


          // If the promise hasn't resolved immediately then
          // Save loadingPromise to th state, this way, even if [data] is
          // null the next request will not be processed because we know
          // that one has already been sent out
          if (!promiseResolved) {
            dispatch({
              poolType: POOL_TYPE_CACHE_MAP,
              poolId: poolId,
              type: POOL_ACTION_CACHE_MAP_INIT_DATA,
              itemId: itemId,
              loadingPromise: loadingPromise
            });
          }

          return loadingPromise;
        })

      })

    },

    pools: {
      [CACHE_MAP_ID_USERS]: {
        initState: () => new ReduxPoolCacheMap(CACHE_MAP_ID_USERS),
        buildDataSet: (d, userId) => DataProvider.usersGetUidProfile(userId)
      },
      [CACHE_MAP_ID_LOCATION_PROFILES]: {
        initState: () => new ReduxPoolCacheMap(CACHE_MAP_ID_LOCATION_PROFILES),
        buildDataSet: (d, locationId) => DataProvider.locationsGetLidProfile(locationId)
      },
      [CACHE_MAP_ID_USER_PROFILES]: {
        initState: () => new ReduxPoolCacheMap(CACHE_MAP_ID_USER_PROFILES),
        buildDataSet: (d, userId) => DataProvider.usersGetUidProfile(userId)
      },

    }

  },




  [POOL_TYPE_API_FORMS]: {

    poolConnect: {

      extraProps: (poolId, pool, stateProps, dispatchProps) => ({
        // No extra props for now
      }),


      mergeMapDispatchToProps: (poolId, pool, dispatch) => ({

        change: (apiInput, validationError) => dispatch({
          poolType: POOL_TYPE_API_FORMS,
          poolId: poolId,
          type: POOL_ACTION_API_FORMS_ON_CHANGE,
          apiInput: apiInput,
          validationError: validationError
        }),

        reset: () => dispatch({
          poolType: POOL_TYPE_API_FORMS,
          poolId: poolId,
          type: POOL_ACTION_API_FORMS_ON_RESET,
          newState: pool.initState()
        }),

        dismissError: () => dispatch({
          poolType: POOL_TYPE_API_FORMS,
          poolId: poolId,
          type: POOL_ACTION_API_FORMS_ON_ERROR_DISMISS
        }),

        post: (extraParams) => dispatch((dispatch, getState) => {

          let formInput = getState().reduxPoolReducer[POOL_TYPE_API_FORMS][poolId].apiInput;
          console.log("posting", formInput);
          dispatch({
            poolType: POOL_TYPE_API_FORMS,
            poolId: poolId,
            type: POOL_ACTION_API_FORMS_ON_POST
          });


          return pool.post(
              // Redux Dispatch Function
              dispatch,

              // data
              formInput,

              // Some post methods like ApiClient.resetPassword
              // require extra parameters that are passed in through
              // this extra nullable object
              extraParams
          )

              .then(apiResponse => {

                // Handle the state change
                dispatch({
                  poolType: POOL_TYPE_API_FORMS,
                  poolId: poolId,
                  type: POOL_ACTION_API_FORMS_ON_FINISH,
                  apiResponse: apiResponse
                });



                // todo: replace 0 with R::return_ok
                if (typeof apiResponse === 'object' && 'formError' in apiResponse)
                  if (apiResponse.formError !== 0)
                    return Promise.reject(apiResponse);


                // Request has completed successfully
                return apiResponse;
              })

              .catch(apiExceptionResponse => {
                // Note: the api has already handled the exception
                // here you should only do form specific actions
                // for example set the button out of its loading state

                // Handle the state change
                dispatch({
                  poolType: POOL_TYPE_API_FORMS,
                  poolId: poolId,
                  type: POOL_ACTION_API_FORMS_ON_API_EXCEPTION
                });

                return apiExceptionResponse;
              });

        })

      })

    },

    poolActions: {
      [POOL_ACTION_API_FORMS_ON_CHANGE]: (action, subState) => ({
        apiInput: mergeWithoutExtend(subState.apiInput, action.apiInput),
        validationError: action.validationError
      }),
      [POOL_ACTION_API_FORMS_ON_RESET]: (action, subState) => (
          action.newState
      ),
      [POOL_ACTION_API_FORMS_ON_POST]: (action, subState) => ({
        loading: true,
        apiResponse: null
      }),
      [POOL_ACTION_API_FORMS_ON_FINISH]: (action, subState) => ({
        loading: false,
        apiResponse: action.apiResponse
      }),
      [POOL_ACTION_API_FORMS_ON_API_EXCEPTION]: (action, subState) => ({
        loading: false,
        apiException: null
      }),
      [POOL_ACTION_API_FORMS_ON_ERROR_DISMISS]: (action, subState) => ({
        apiResponse: Object.assign({}, subState.apiResponse, {formError: null})
      })
    },

    pools: {
      [FORM_API_ID_LOGIN]: {
        post: (d, i) => ApiClient.accountsLogin(i),
        initState: () => new ReduxPoolApiForms(FORM_API_ID_LOGIN, {
          email: 'krishanmarco@outlook.com',
          password: 'MomrpdrbrM93'
        })
      },
      [FORM_API_ID_REGISTER]: {
        post: (d, i) => ApiClient.accountsRegister(i),
        initState: () => new ReduxPoolApiForms(FORM_API_ID_REGISTER, {
          name: '',
          email: '',
          password: '',
          passwordConfirm: ''
        })
      },
      [FORM_API_ID_EDIT_USER_PROFILE]: {
        post: (d, i) => ApiClient.userProfileEdit(i),
        initState: () => new ReduxPoolApiForms(FORM_API_ID_EDIT_USER_PROFILE, denormObj({
          [DaoUser.pSettingPrivacy]: Const.DaoUser.defaultPrivacySettings,
          [DaoUser.pSettingNotifications]: Const.DaoUser.defaultNotificationSettings,
          [DaoUser.pPictureUrl]: '',
          [DaoUser.pPhone]: '',
          [DaoUser.pEmail]: '',
          [DaoUser.pPublicMessage]: ''
        }))
      },
      [FORM_API_ID_EDIT_USER_LOCATION_STATUS]: {
        post: (d, i) => ApiClient.userStatusAdd(i),
        initState: () => new ReduxPoolApiForms(FORM_API_ID_EDIT_USER_LOCATION_STATUS, denormObj(
            DaoUserLocationStatus.createInitialStatus()
        ))
      },
      [FORM_API_ID_EDIT_LOCATION_PROFILE]: {
        post: (d, i) => ApiClient.userLocationsAdminEditLid(i),
        initState: () => new ReduxPoolApiForms(FORM_API_ID_EDIT_LOCATION_PROFILE, denormObj({
          [DaoLocation.pName]: '',
          [DaoLocation.pPictureUrl]: '',
          [DaoLocation.pDescription]: '',
          [DaoLocation.pEmail]: '',
          [DaoLocation.pPhone]: '',
          [DaoLocation.pCapacity]: 0,
          [DaoLocation.pTimings]: ManagerWeekTimings.boolDayDefault,
          [DaoLocation.pAddressCountry]: '',
          [DaoLocation.pAddressState]: '',
          [DaoLocation.pAddressCity]: '',
          [DaoLocation.pAddressPostcode]: '',
          [DaoLocation.pAddressAddress]: '',
          [DaoLocation.pAddressLatLng]: {lat: 37.78825, lng: -122.4324,},
        }))
      },
    }

  },




  [POOL_TYPE_LOCAL_FORMS]: {

    poolConnect: {

      extraProps: (poolId, pool, stateProps, dispatchProps) => ({
        // No extra props for now
      }),

      mergeMapDispatchToProps: (poolId, pool, dispatch) => ({

        change: (input, validationError) => dispatch({
          poolType: POOL_TYPE_LOCAL_FORMS,
          poolId: poolId,
          type: POOL_ACTION_LOCAL_FORMS_ON_CHANGE,
          input: input,
          validationError: validationError
        }),

        reset: () => dispatch({
          poolType: POOL_TYPE_LOCAL_FORMS,
          poolId: poolId,
          type: POOL_ACTION_LOCAL_FORMS_ON_RESET,
          newState: pool.initState()
        }),

      })

    },

    poolActions: {
      [POOL_ACTION_LOCAL_FORMS_ON_CHANGE]: (action, subState) => ({
        input: mergeWithoutExtend(subState.input, action.input),
        validationError: action.validationError
      }),
      [POOL_ACTION_LOCAL_FORMS_ON_RESET]: (action, subState) => (
          action.newState
      )
    },

    pools: {
      /*[FORM_LOCAL_ID_PARTIAL_WORKOUT_CREATE]: {
       initState: () => new ReduxPoolLocalForms(FORM_LOCAL_ID_PARTIAL_WORKOUT_CREATE, {
       pName: "",
       description: "",
       difficulty: 50
       })
       },*/
    },
  }

};


// Redux **************************************************************************************************************
// Redux **************************************************************************************************************

// ReduxPool initial state, all ids should be unique in this object
// Foreach pool that needs to exist initialize it using
// its pId as key and the associated Object-Wrapper as its value
const reduxPoolInitState = build(ReduxPoolBuilder);



export function reduxPoolReducer(state = reduxPoolInitState, action) {


  if ('poolType' in action && 'poolId' in action) {

    return Object.assign({}, state, {
      [action.poolType]: Object.assign({}, state[action.poolType], {
        [action.poolId]: Object.assign({}, state[action.poolType][action.poolId], (
            ReduxPoolBuilder[action.poolType].poolActions[action.type](action, state[action.poolType][action.poolId])
        ))
      })
    });

  }


  return state;

}




// ReduxPoolSubscribers ***********************************************************************************************
// ReduxPoolSubscribers ***********************************************************************************************

export function poolConnect(presentationalComponent, mapStateToProps, mapDispatchToProps, poolIds) {
  return connect(
      // mapStateToProps
      subscribeStateToPools(mapStateToProps, poolIds),

      // mapDispatchToProps
      subscribeDispatchToPools(mapDispatchToProps, poolIds),

      // mergeProps
      (stateProps, dispatchProps, ownProps) => {

        // Initialize the merge result with the props
        // that were passed in from the component
        let mergeResult = Object.assign({}, stateProps, dispatchProps, ownProps);

        poolIterator(
            // Pool declaration to iterate over
            ReduxPoolBuilder,

            // Pool ids to call the 3rd param function on
            poolIds,

            // Callback function to apply to each pool Id
            (poolType, poolId, pool) => {

              mergeResult[poolId] = Object.assign(
                  // Merge the sub-pool state props
                  stateProps[poolId],

                  // Merge the sub-pool dispatch props
                  dispatchProps[poolId],

                  // Merge the sub-pool extra props
                  ReduxPoolBuilder[poolType].poolConnect.extraProps(poolId, pool, stateProps[poolId], dispatchProps[poolId])
              )

            }
        );

        return mergeResult;

      }
  )(presentationalComponent);
}




function subscribeStateToPools(mapStateToProps, poolIds) {
  return (state) => {

    // initialize the result with the default input mapDispatchToProps
    let mapStateToPropsResult = mapStateToProps(state);


    poolIterator(
        // Pool Builder
        ReduxPoolBuilder,

        // Pool ids to call the 3rd param function on
        poolIds,

        // Function to apply to each pool
        (poolType, poolId) => {

          let poolState = state.reduxPoolReducer[poolType][poolId];

          // Merge the current result with the found pool
          mapStateToPropsResult = Object.assign({}, mapStateToPropsResult, {[poolId]: poolState});

        }
    );


    return mapStateToPropsResult;

  };
}


function subscribeDispatchToPools(mapDispatchToProps, poolIds) {
  return (dispatch) => {

    // initialize the result with the default input mapDispatchToProps
    let mapDispatchToPropsResult = mapDispatchToProps(dispatch);



    poolIterator(
        // Pool Builder
        ReduxPoolBuilder,

        // Pool ids to call the 3rd param function on
        poolIds,

        // Function to apply to each pool
        (poolType, poolId) => {

          let poolDispatch = ReduxPoolBuilder[poolType].poolConnect.mergeMapDispatchToProps(
              // Pass the pool pId (needed dispatch pool specific actions)
              poolId,

              // Pass the pool object, (needed so the function can access)
              // properties in its child pools
              ReduxPoolBuilder[poolType].pools[poolId],


              // Pass in a the dispatch function
              dispatch
          );



          // Merge the current result with all the indicated pools
          mapDispatchToPropsResult = Object.assign({}, mapDispatchToPropsResult, {[poolId]: poolDispatch})

        }
    );


    return mapDispatchToPropsResult;
  };
}