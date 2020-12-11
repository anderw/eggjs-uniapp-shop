<template>
    <div class="header-menu-item header-language" :class="{open:hoverActive}" @mouseover="hoverActive=true" @mouseout="hoverActive=false">
        <a class="link">
            <span class="tit">{{language|languageFilter}}</span>
            <i class="el-icon-caret-bottom el-icon--right"></i>
        </a>
        <ul class="submenu">
            <li class="submenu-item"><a href="javascript:;" :disabled="language==='zh_CN'" @click="handleSetLanguage('zh_CN')">中文-简体</a></li>
            <!-- <li class="submenu-item"><a href="javascript:;" :disabled="language==='zh_TW'" @click="handleSetLanguage('zh_TW')">中文-繁体</a></li> -->
            <li class="submenu-item"><a href="javascript:;" :disabled="language==='en_US'" @click="handleSetLanguage('en_US')">English</a></li>
        </ul>
    </div>
</template>
<script>
// let chanslate = {
//   'zh_CN': 'zh-cn',
//   'en_US': 'en',
//   'zh_TW': 'zh-tw'
// }
export default {
    data(){
        return {
            hoverActive: false
        }
    },
    computed: {
        language() {
            return this.$store.getters.language
        }
    },
    filters: {
        languageFilter(language) {
            const langugeMap = {
                'zh_CN': '中文-简体',
                'zh_TW': '中文-繁体',
                'en_US': 'English'
            }
            return langugeMap[language]
        },
    },
    methods: {
        handleSetLanguage(lang) {
            if(this.language==lang){
                return;
            }
            // this.$i18n.locale = chanslate[lang]
            this.$store.dispatch('setLanguage', lang).then(()=>{
                window.location.reload();
            });
            // setTimeout(()=>{
            //     // this.$message({
            //     //     message: this.$t('message.switchLanguageSuccess'),
            //     //     type: 'success'
            //     // });
                
            // })
            
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/variables.scss';
.header-language .link{
    min-width: 105px;
}
</style>