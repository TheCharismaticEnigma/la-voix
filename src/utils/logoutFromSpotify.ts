const logoutFromSpotify = () => {
  localStorage.clear();
  window.location.replace('/login');
};

export default logoutFromSpotify;

// Clear Everything from the local storage and redirect.
