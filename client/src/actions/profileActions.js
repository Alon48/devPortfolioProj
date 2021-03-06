import axios from 'axios';

import {
     GET_PROFILE,
     GET_PROFILES,
     PROFILE_LOADING,
     CLEAR_CURRENT_PROFILE,
     GET_ERRORS,
     SET_CURRENT_USER
    } from './types';

//get current profile
export const getCurrentProfile = () => dispatch  => {
  dispatch(setProfileLoading());
  axios.get('/api/profiles')
  .then(res => 
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  )
  .catch(err => 
    dispatch({
    type: GET_PROFILE,
    payload: {}
  })
);
};

//get profile by handle
export const getProfileByHandle = (handle) => dispatch  => {
  dispatch(setProfileLoading());
  axios.get(`/api/profiles/handle/${handle}`)
  .then(res => 
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  )
  .catch(err => 
    dispatch({
    type: GET_PROFILE,
    payload: null
  })
);
};

//Create profile
export const createProfile= (profileData, history) => dispatch => {
  axios
  .post('/api/profiles', profileData)
  .then(res => history.push('/dashboard'))
  .catch(err => 
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );
};

//add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profiles/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profiles/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete experience
export const deleteExperience = (id) => dispatch => {
  axios
    .delete(`/api/profiles/experience/${id}`)
    .then(res => 
    dispatch ({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//delete education
export const deleteEducation = (id) => dispatch => {
  axios
    .delete(`/api/profiles/education/${id}`)
    .then(res => 
    dispatch ({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all profiles for display
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profiles/all')
    .then(res => 
    dispatch ({
      type: GET_PROFILES,
      payload: res.data
    }))
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};


// Delete account and profile
export const deleteAccount = () => dispatch => {
  if(window.confirm('Are you sure? This CANNOT be undone')) {
      axios
        .delete('/api/profiles')
        .then(res =>
            dispatch({
              type: SET_CURRENT_USER,
              payload: {}
            })
          ).catch( err =>
          dispatch({
            type: GET_ERRORS,
            payload:err.response.data
          })
        )
  }
}


// Profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};