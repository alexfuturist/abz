import * as axios from 'axios';

const instance = axios.create({
    baseURL: "https://frontend-test-assignment-api.abz.agency/api/v1/",
    // headers: {
    //     "API-KEY": "18021664-8191-4731-8d37-bfc58504d56d"
    // }
});

// export const authAPI = {
//     me() {
//         return (
//             instance.get(`auth/me`)
//         )
//     },
//     login(email, password, rememberMe, captcha=null) {
//         return (
//             instance.post(`auth/login`, {
//                 email,
//                 password,
//                 rememberMe,
//                 captcha
//             })
//         )
//     },
//     logout() {
//         return (
//             instance.delete(`auth/login`)
//         )
//     }
// };

// export const securityAPI = {
//     getCaptchaUrl () {
//         return (
//             instance.get(`security/get-captcha-url`)
//         )
//     }
// };

// export const profileAPI = {
//     getProfile(userId) {
//         return (
//             instance.get(`profile/${userId}`)
//         )
//     },
//     getStatus(userId) {
//         return (
//             instance.get(`profile/status/${userId}`)
//         )
//     },
//     updateStatus(status) {
//         return (
//             instance.put(`profile/status`, {
//                 status: status
//             })
//         )
//     },
//     updatePhoto(photoFile) {
//         const formData = new FormData();
//         formData.append("image", photoFile);

//         return (
//             instance.put(`profile/photo`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             })
//         )
//     },
//     saveProfile(profile) {
//         return (
//             instance.put(`profile`, profile)
//         )
//     }
// };

// export const usersAPI = {
//     getUsers(currentPage = 1, pageSize = 10) {
//         return (
//             instance.get(`users?page=${currentPage}&count=${pageSize}`)
//             .then(response => {
//                 return response.data
//             })
//         )
//     },
//     unfollow(id) {
//         return (
//             instance.delete(`follow/${id}`)
//         )
//     },
//     follow(id) {
//         return (
//             instance.post(`follow/${id}`)
//         )
//     }
// };

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



// var formData = new FormData();
// // file from input type='file' var fileField = document.querySelector('input[type="file"]'); 
// // formData.append('position_id', 2); 
// // formData.append('name', 'Jhon'); 
// // formData.append('email', 'Jhon@gmail.com'); 
// // formData.append('phone', '+380955388485'); 
// // formData.append('photo', fileField.files[0]);
// fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 'Token': token, 
// get token with GET api/v1/token method }, }) 
// .then(function(response) { return response.json(); }) 
// .then(function(data) { console.log(data); 
// if(data.success) { // process success response } else { // proccess server errors } }) .catch(function(error) { // proccess network errors });