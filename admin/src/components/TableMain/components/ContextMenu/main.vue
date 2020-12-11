<!--
 * @description     表格右键菜单
 *
 * @author          重阳
 * @create          2020-01-09 15:00
-->
<template>
    <div class="context-menu" v-show="visible" :style="contextMenuStyle">
        <div class="context-item" v-for="item in contextMenuList" :disabled="item.disabled" :class="['color-'+item.color]" @mouseup.stop="handleClick(item,$event)">
            <span class="icon"><i :class="item.icon"></i></span>
            <span class="name">{{item.title}}</span>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    name: 'ContextMenu',
    components: {},
    data() {
        return {
            visible: false,
            contextMenuList: [],
            options: {},
            contextMenuStyle: {}
        }
    },
    computed: {},
    created() {
        var _t = this;
        this.handleContextMenuStyle();
        document.addEventListener('mouseup', _t.doHide,false)
    },
    beforeDestroy(){
        
    },
    methods: {
        handleContextMenuStyle() {
            let _t = this
            // console.log(_t.options, '_t.options')
            let style = {}
            if (!_t.options) {
                return style
            }
            _t.$nextTick(function() {
                let x = _t.options.x !== undefined ? (parseInt(_t.options.x) > 0 ? parseInt(_t.options.x) : 0) : 0
                let y = _t.options.y !== undefined ? (parseInt(_t.options.y) > 0 ? parseInt(_t.options.y) : 0) : 0
                // 判断是否超出边界
                if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
                    let winHeight = document.documentElement.clientHeight
                    let winWidth = document.documentElement.clientWidth
                    let elHeight = _t.$el.clientHeight
                    let elWidth = _t.$el.clientWidth
                    if (x + elWidth > winWidth) {
                        style['right'] = '10px'
                    } else {
                        style['left'] = x + 'px'
                    }
                    if (y + elHeight > winHeight) {
                        style['bottom'] = '42px'
                    } else {
                        style['top'] = y + 'px'
                    }
                }
                // console.log('options', _t.options)
                // console.log('style', style)
                _t.contextMenuStyle = style
            })
        },
        doHide() {
            let _t = this
            _t.options = null
            _t.contextMenuList = []
            _t.visible = false
            document.removeEventListener('mouseup', _t.doHide,false)
            _t.doClose();
        },
        handleClick(item, event) {
            let _t = this
            if(item.disabled) return
            item.click&&item.click();
            _t.doHide()
        },
    },
}
</script>
<style scoped lang="scss">
.context-menu {
    position: fixed;
    min-width: 120px;
    width: auto !important;
    z-index: 9999;
    background: #FFF;
    box-shadow: 0 0 5px 2px rgba(0, 0, 0, .1);
    padding: 5px 0;
    // z-index: 999;

    .context-item {
        padding: 5px 10px;
        cursor: pointer;
        font-size: 13px;
        border-bottom: 1px solid #fff;
        &:hover {
            // color: #000000;
            background: rgba(0, 0, 0, .05);

            .tool-box {
                visibility: visible;
            }
        }
        &[disabled]{
            cursor: not-allowed;
            color: #999;
            background: #f4f4f4;
        }

        .icon {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 10px;
            color: #666;
        }

        .item-label {}

        .item-more {
            display: inline-block;
            float: right;
            width: 16px;
            height: 16px;
        }
    }

    .divider {
        // width: calc("100% - 10px");
    }
}
</style>