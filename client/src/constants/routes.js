const authBase = '/auth'
const pharmacistBase = '/pharmacist'
const onboardingBase = '/onboard'

const routes = {
  landing: '/',
  search: '/search',
  pharmacistLanding: '/pharmacists',
  auth: {
    base: authBase,
    signup: authBase + '/signup',
    signin: authBase + '/signin',
  },
  onboarding: {
    base: onboardingBase,
    stage1: onboardingBase + '/s1',
    stage2: onboardingBase + '/s2',
    done: onboardingBase + '/done',
  },
  pharmacist: {
    base: pharmacistBase,
    dashboard: pharmacistBase + '/dashboard',
    inventory: pharmacistBase + '/inventory',
    orders: pharmacistBase + '/orders',
    pharmacy: pharmacistBase + '/pharmacy',
    settings: pharmacistBase + '/settings',
  }
}

export { routes }