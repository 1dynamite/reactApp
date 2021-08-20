import { signout } from './api-auth.js'

const auth = {
  async isAdmin() {
    if (typeof window == "undefined")
      return false
   if(!sessionStorage.getItem('jwt'))
    return false;
    let data = await fetch('/api/isadmin/', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage.getItem('jwt')).token
      }
    }).then((data) => data.json())

    if(data === true)
      return true;
    return false;
  },
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (sessionStorage.getItem('jwt'))
      return JSON.parse(sessionStorage.getItem('jwt'))
    else
      return false
  },
  authenticate(jwt, cb) {
    if (typeof window !== "undefined")
      sessionStorage.setItem('jwt', JSON.stringify(jwt))
    cb()
  },
  clearJWT(cb) {
    if (typeof window !== "undefined")
      sessionStorage.removeItem('jwt')
    cb()
    //optional
    signout().then((data) => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    })
  }
}

export default auth
