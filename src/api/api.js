import * as axios from 'axios';

const instance = axios.create({
    baseURL: "https://frontend-test-assignment-api.abz.agency/api/v1/",
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
        )
    }
};

export const formAPI = {
    getPositions() {
        return (
            instance.get(`positions`)
            .then(response => {
                return response.data
            })
        )
    },
    getToken() {
        return (
            instance.get(`token`)
            .then(response => {
                return response.data
            })
        )
    },
    registerUser(token, {position, name, email, phone, photo}) {
        const formData = new FormData();

        formData.append('position_id', position);
        formData.append('name', name); 
        formData.append('email', email); 
        formData.append('phone', phone); 
        formData.append('photo', photo);

        return (
            instance.post(`users`, formData, {
                headers: {
                    'Token': token
                }
            })
        )
    }
};