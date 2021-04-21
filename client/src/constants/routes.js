const authBase = '/auth'
const pharmacistBase = '/pharmacist'

const routes = {
  landing: '/',
  search: '/search',
  pharmacistLanding: '/pharmacists',
  auth: {
    base: authBase,
    signup: authBase + '/signup',
    signin: authBase + '/signin',
  },
  pharmacist: {
    base: pharmacistBase,
    dashboard: pharmacistBase + '/dashboard'
  }
}

export { routes }