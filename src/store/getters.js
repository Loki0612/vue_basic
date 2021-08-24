const getters = {
  device: state => state.app.device,
  token: state => state.user.token,
  trueName: state => state.user.trueName,
  userName: state => state.user.userName,
  roles: state => state.user.roles,
  hospitalInfo: state => state.hospital.hospitalInfo,
}
export default getters
