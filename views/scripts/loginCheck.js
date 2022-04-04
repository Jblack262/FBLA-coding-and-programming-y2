const getCurrentUser = async () => {
  const {data: {user}} = await axios.get('/api/v1/user/current')
  if (!user)  return null;

  return user;
}
getCurrentUser()