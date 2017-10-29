import api from '../../Api/Django';
import {usuarioVerificado} from "./usuarioVerificadoActions";

export const SET_USER_SUCCESS = "SET_USER_SUCCESS";
export const SUBMIT_NEW_PROJECT_SUCCESS = "SUBMIT_NEW_PROJECT_SUCCESS";
export const LOAD_USER_PROJECTS_SUCCESS = "LOAD_USER_PROJECTS_SUCCESS";

export function setUserSuccess(user){
    return {
        type: SET_USER_SUCCESS,
        user
    }
}

export function setUserSuccessPromise(user) {
    return function (dispatch) {
        dispatch(setUserSuccess(user));
        return Promise.resolve();
    }
}

export function submitNewProjectSuccess(project){
    return {
        type: SUBMIT_NEW_PROJECT_SUCCESS,
        project
    }
}

export function setUser(user){
    return async(dispatch, getState)=>{
        try{
            const profile = await api.getSelfProfile();
            user["profile"] = profile;
            const userId = profile.profile.user.id;
            user["projects"] = await api.getUserProjects(userId);
            dispatch(usuarioVerificado());
            dispatch(setUserSuccessPromise(user));
        }catch(e){
            console.error(e);
        }

    }
}

export function signOutSuccess(user) {
    return {type: 'SIGN_OUT', user}
}
export function signOut() {
    return function (dispatch) {
        const user = {};
        dispatch(signOutSuccess(user));
        return Promise.resolve();
    }
}

export function updateUserSuccess(user) {
    return {
        type: "UPDATE_USER_SUCCESS",
        user
    }
}

export function saveUser(id, profileDjango) {
    return async(dispatch,getState)=>{
        try{
            const profile = await api.updateProfile(id,profileDjango);
            let user = getState().user;
            user.profile['profile'] = profile.data;
            dispatch(setUserSuccess(user));
        }catch (e){
            console.error(e);
        }

    }
}

export function cerrarSesion() {
    
}

export function submitNewProject(project){
    return function(dispatch){
        return api.postNewProject(project)
            .then(response=>{
                console.log("guarde?", response);
                dispatch(submitNewProjectSuccess(response));
                return response;
            })
            .catch(e=>console.log(e));

    }
}