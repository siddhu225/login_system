import Api from "@/services/Api";

export default {
    signupAdmin(params) {
        return Api().post('/signup',params)
    },
    loginUser(params) {
        console.log(params);
        return Api().post('/login',params)
    },
    getUsers(){
        return Api().get('/users')
    },
    signupUser(params) {
        console.log(params);
        return Api().post('/user_signup',params)
    },
    deleteUser(id) {
        console.log(id);
        return Api().delete(`/delete/user/${id._id}`)
    }

};