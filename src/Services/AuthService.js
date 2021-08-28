import axios from 'axios'
// const ip = "http://localhost:8080"
require('dotenv').config()
// const ip = `http://${process.env.REACT_APP_IP}:8080`
const ip = `https://backend.lurien.team`

export default {
    login: user => {
        return fetch(`${ip}/api/user/login`, {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Accept": 'application/json',
        'Content-Type': 'application/json',
            }
        }).then(async res => {
            if (res.status !== 401) {
                console.log("res", await res)
                let data = await res.json().then(data => data);
                localStorage.setItem("user", JSON.stringify(data))
                return data;
            } else
                return { isAuthenticated: false, user: { username: "", role: "", dni: "", mail: "", companyID: "", pfp: "", qrLink: "" }, error: true };
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

    getManUser: async (area) => {
        //cambiar con la ip de tu casa
        return await axios.get(`${ip}/api/user/manUser/${area}`)
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
    upload: async (data, companyid, dni) => {
        return await axios.post(`${ip}/api/upload/upload/` + companyid + '/' + dni, { data })
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
        return fetch(`${ip}/api/user/authenticated`)
            .then(res => {
                if (res.status !== 401) {
                    console.log("el authenticate me dio", res)
                    return res.json().then(data => data);
                }
                else {
                    console.log("el authenticate me dio", res)
                    return { isAuthenticated: false, user: { username: "", role: "", dni: "", mail: "", companyid: "", pfp: "", qrLink: "" }, error: true };
                }
            });
    }

}