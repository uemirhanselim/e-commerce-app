import axios from "axios"

const SignIn = async ({ email, password }) => {
    const _url = "http://duyu.alter.net.tr/api/getTokenAndModulesOfUser"
    const _signInBody = {
        email: email,
        password: password
    }
    try {
        const response = await axios.post(_url, _signInBody)

        if (response.status === 200) {
            return response
        }

    } catch (error) {

        if (error.response.status === 401) {
            return error.response
        } else if (error.response.status === 403) {
            console.error("Error code 403: Body keys are empty")
        } else {
            console.error("Unknown Error")
        }
        
    }
}

export default SignIn