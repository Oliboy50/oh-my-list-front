export default function ({ $axios, redirect, route }) {
  $axios.onError((error) => {

    // JWT expired
    if(error.message.includes('418')) {
      console.log('Connection has expired');
      redirect('/login', { redirectUrl: route.fullPath });
    }

  });
};
