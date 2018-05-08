export default function ({ store, redirect, route }) {
  if (!store.state.user.user.isAdmin) {
    redirect('/login', { redirectUrl: route.fullPath });
  }
};
