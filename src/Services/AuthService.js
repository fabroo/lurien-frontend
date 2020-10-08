import axios from 'axios'
// const ip = "http://localhost:8080"
const ip = "http://192.168.1.203:8080"

export default {
    login: user => {
        return fetch(`/api/user/login`, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 401)
                return res.json().then(data => data);
            else
                return { isAuthenticated: false, user: { username: "", role: "", dni: "", mail: "", companyID: "", pfp:"" }, error: true };
        })
    },
    register: async user => {

        return await axios.put(`${ip}/api/user/register`, user)
            .then(res => res)
    },
    registerNew: async user => {
        return await axios.post(`${ip}/api/user/registerNew`, user)
            .then(res => res)
    },
    
    logout: () => {
        return fetch(`/api/user/logout`)
            .then(res => res.json())
            .then(data => data);
    },
    getData: async (companyid) => {
        //cambiar con la ip de tu casa
        return await axios.get(`${ip}/api/user/users/` + companyid)
            .then(res => res)

    },
    
    downloadP: async (companyid) => {
        //cambiar con la ip de tu casa
        return await axios.get(`${ip}/api/user/download/` + companyid)
            .then(res => res)

    },
    
    getMod: async () => {
        //cambiar con la ip de tu casa
        return await axios.get(`${ip}/api/user/mod`)
            .then(res => res)

    },
    upload: async (data, user,companyid,dni) => {
        return await axios.post(`${ip}/api/upload/upload/`+companyid+'/'+dni, data)
            .then(res => res)

    },

    uploadPfp: async (data, cmp, dni) => {
        return await axios.post(`${ip}/api/upload/uploadPfp/${cmp}/${dni}`, {
            data
        })
            .then(res => res)

    },
    removeUser: async (id) => {
        //cambiar con la ip de tu casa
        return await axios.get(`${ip}/api/user/delete/` + id)
            .then(res => res)

    },
    getFotos: async (dni) => {
        return await axios.get(`${ip}/api/user/getFotos/` + dni)
            .then(res => res)

    },
    wipeFotos: async (dni, companyid) => {
        return await axios.post(`${ip}/api/upload/wipeFotos/${companyid}/${dni}`)
            .then(res => res)

    },
    addFotos: async (dni, cantidad) => {
        return await axios.post(`${ip}/api/upload/addFotos/` + dni, cantidad)
            .then(res => res)

    },
    isAuthenticated: () => {
        return fetch(`/api/user/authenticated`)
            .then(res => {
                if (res.status !== 401)
                    return res.json().then(data => data);
                else
                    return { isAuthenticated: false, user: { username: "", role: "", dni: "", mail: "", companyid: "",pfp:"" }, error: true };
            });
    }

}