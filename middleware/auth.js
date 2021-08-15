export default function ({ store, route, redirect }) {
  const user = sessionStorage.getItem('user')
  if (route.name !== 'login') {
    if (!user) {
      redirect('/login')
    } else {
      store.commit('setLoggedInUser', JSON.parse(user))
    }
  }
  if (route.name === 'login' && user) {
    store.commit('setLoggedInUser', JSON.parse(user))
    redirect('/')
  }
}
