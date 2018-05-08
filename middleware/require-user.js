export default function ({ store, redirect, route }) {
  if (!store.state.user.user.isUser) {
    redirect('/login', { redirectUrl: route.fullPath });
  }
};
