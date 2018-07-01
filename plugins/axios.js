export default function ({ $axios, store, redirect, route }) {
  $axios.onError(async (error) => {

    // JWT expired
    if(error.message.includes('418')) {
      console.log('Connection has expired');
      await store.dispatch('user/logout');
      redirect('/login', { redirectUrl: route.fullPath });
    }

  });
};
