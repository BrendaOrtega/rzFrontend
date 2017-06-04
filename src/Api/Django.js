import $ from "jquery";
import axios from 'axios';


let debug = false;


let url = 'http://pelusina.fixter.org/projects/';
let urlProfiles = 'http://pelusina.fixter.org/profiles/';
let urlRewards = 'http://pelusina.fixter.org/rewards/';
const otra = 'http://perro.com';



if (debug) {
    url = 'http://localhost:8000/projects/';
    urlProfiles = 'http://pelusina.fixter.org/profiles/';
    urlRewards = 'http://localhost:8000/rewards/';


}


const api = {
    postNewProject: (project) => {
        let request = new Request(url, {
            method: 'POST',
            body: JSON.stringify(project),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        return fetch(request)
            .then(r=>{
                console.log(r);
                return r.json();
            })
            .catch(e=>console.log(e));

  },

    jqueryPost: (project) => {
        return $.ajax({
            url:url,
            method:'POST',
            data: project,
            success: function(r){
                console.log('exito', r);
                return r
            },
            error: function(e){
                console.log('error', e)
            }
        });
    },

    getProject: (id) => {
        return fetch(url + id + '/')
            .then(r=>{
                console.log('res',r)
                return r.json();
            })
            .catch(e=>{
                return e
            });
    },

    updateProject: (id, project) => {
        let request = new Request(url + id + '/', {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        return fetch(request)
            .then(handleErrors)
            .then(r=>{
                console.log(r);
                return r.json();
            })
            .catch(e=>{
                console.log(e);
                return e;
            });

    },

    //Axios project requests

    getAxiosAllProjects: () => {

        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: url,
                timeout: 2000,
                headers: {'Content-Type': 'application/json'}
            });
            instance.get()
                .then(function (response) {
                    if (1 === 1)
                        resolve(response);
                })
                .catch(function (error) {
                    console.log(error.response);
                    reject(error);
                });


        });
    },

    getAxiosProject: (id) => {

        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: url,
                timeout: 2000,
                headers: {'Content-Type': 'application/json'}
            });
            instance.get(id + '/')
                .then(function (response) {
                    if (1 === 1)
                        resolve(response);
                })
                .catch(function (error) {
                    console.log(error.response);
                    reject(error);
                });


        });
    },

    //User Profiles

    getProfile: (id) => {
        return fetch(urlProfiles + id + '/')
            .then(handleErrors)
            .then(r=>{
                console.log('res',r);
                return r.json();
            })
            .catch(e=>{
                return e
            });
    },

    updateProfile: (id, profile) => {
        let request = new Request(urlProfiles + id + '/', {
            method: 'PUT',
            body: JSON.stringify(profile),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        return fetch(request)
            .then(handleErrors)
            .then(r=>{
                console.log(r);
                return r.json();
            })
            .catch(e=>{
                console.log(e);
                return e.json();
            });

    },

    // Recompensas


    updateReward: (id, profile) => {
        let request = new Request(urlRewards + id + '/', {
            method: 'PUT',
            body: JSON.stringify(profile),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        return fetch(request)
            // .then(handleErrors)
            .then(fixterErrors)
            .then(r=>{
                return r.json();
            })
            .catch(e=>{
                console.log(e);
                throw Error(e.statusText);


            });

    },

    deleteReward: (id) => {
        let request = new Request(urlRewards + id + '/', {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        return fetch(request)
            .then(handleErrors)
                .then(r=>{
                    console.log(r);
                    return r.json();
                })
                .catch(e=>{
                    console.log('estoy aquí!!!');
                    return e;
                });

    },

    postNewReward: (reward) => {
        let request = new Request(urlRewards, {
            method: 'POST',
            body: JSON.stringify(reward),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        return fetch(request)
            .then(handleErrors)
            .then(r=>{
                console.log(r);
                return r.json();
            })
            .catch(e=>console.log(e));

    },

    //Axios testing:

    putAxiosReward: (id, reward) => {

        return new Promise(function (resolve, reject) {
            const instance = axios.create({
                baseURL: urlRewards,
                timeout: 2000,
                headers: {'Content-Type': 'application/json'}
            });
            instance.put(id + '/', reward)
                .then(function (response) {
                    if (1 === 1)
                        resolve(response);
                })
                .catch(function (error) {
                    console.log('el error: ',error);
                    console.log('respuesta?', error.response.data);
                    reject(error.response.data);
                });


        });
    }

  };

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function fixterErrors(response) {
    return new Promise((res, rej) => {
        if(!response.ok){
            return rej(response);
        }
        return res(response);
    });
}


export default api;
