// we mention link heare which api i have to call



 
const BASE_URL=process.env.REACT_APP_BASE_URL
console.log("BASE_URL:", BASE_URL);

export const categories ={
    CATEGORIES_API: BASE_URL + "/course/showAllCategories" ,
    
}
console.log("API Endpoint:", categories.CATEGORIES_API);

export const endpoints={
    LOGIN_API: BASE_URL + "/auth/login" ,
    SIGNUP_API: BASE_URL + "/auth/signUp",
    SENDOTP_API: BASE_URL + "/auth/sendOtp",
    RESETPASSWORD_API:BASE_URL+ "/auth/reset-password",
    RESETPASSWORDTOKEN_API:BASE_URL+ "/auth/reset-password-token",

};