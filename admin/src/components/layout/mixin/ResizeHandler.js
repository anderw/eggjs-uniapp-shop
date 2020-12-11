import store from '@/store'

const { body } = document
const WIDTH = 900
const RATIO = 3

export default {
    watch: {
        $route() {
            if (this.device === 'mobile' && this.sidebar.opened) {
                // store.dispatch('closeSideBar', { withoutAnimation: false })
            }
        }
    },
    beforeMount() {
        window.addEventListener('resize', this.resizeHandler)
    },
    mounted() {
        const isMobile = this.isMobile()
        if (isMobile) {
            store.dispatch('toggleDevice', 'mobile')
            store.dispatch('showSideBar', { withoutAnimation: true })
        }
        /* header二级菜单添加最大高度，防止内容溢出 */
        let bodyHeight = body.clientHeight;
        let submenus = document.getElementsByClassName('submenu');
        for(let i=0;i<submenus.length;i++){
            submenus[i].style.maxHeight = bodyHeight-50+'px';
        }
    },
    methods: {
        isMobile() {
            const rect = body.getBoundingClientRect()
            return rect.width - RATIO < WIDTH
        },
        resizeHandler() {
            if (!document.hidden) {
                const isMobile = this.isMobile()
                store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')

                if (isMobile) {
                    store.dispatch('closeSideBar', { withoutAnimation: true })
                }
                /* header二级菜单添加最大高度，防止内容溢出 */
                let bodyHeight = body.clientHeight;
                let submenus = document.getElementsByClassName('submenu');
                for(let i=0;i<submenus.length;i++){
                    submenus[i].style.maxHeight = bodyHeight-50+'px';
                }
            }
        }
    }
}