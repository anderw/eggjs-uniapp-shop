export default {
    user: state => state.user.user,
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    theme: state => state.app.theme,
    baseUrl: state=>state.app.baseUrl,
}