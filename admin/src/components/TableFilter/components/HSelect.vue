<template>
    <el-select ref="hselect" v-model="newModel" @change="onChange" @clear="onChange" :disabled='disabled' :filterable="schema.filterable" :remote="schema.remote" :remote-method="selectRemoteMethod" popper-class="search-select-item" :placeholder="placeholder" :loading="loading">
        <el-option value="" label="全部" v-if="schema.all"></el-option>
        <el-option v-for="(item,index) in schema.options" :value="item[schema.valueKey||'value']" :label="item[schema.labelKey||'label'] || (schema.getLabel && schema.getLabel(item))" :key='index' :disabled="item.disabled">
            <div v-html="item[schema.labelKey||'label']|| (schema.getLabel && schema.getLabel(item)) || item[schema.valueKey||'value']"></div>
            <div class="desc" v-if="schema.labelDesc" v-html="item[schema.labelDesc]"></div>
        </el-option>
        <div slot="prefix" v-if="label" class="effect-input__label" :class="{'is-active':newModel}">{{ label }}</div>
        <!-- <div slot="empty" class="empty">
                <slot name="empty"></slot>
            </div> -->
    </el-select>

</template>
<script>
import { deepClone } from "@/utils";

export default {
    props: {
        model: {
            type: String,
            default: ''
        },
        schema: {
            type: Object,
            default: {}
        },
        label: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        cloudTypes: {
            type: Array,
            default: () => { return [] }
        },
        placeholder: {
            type: String,
            default: '请选择'
        }
    },
    watch:{
        model(val){
            this.newModel = this.model;
        }
    },
    data() {
        return {
            newModel: this.model,
            originList: [],
            loading: false,
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            if (typeof (this.schema.auto) !== 'undefined' && !this.schema.auto) {
                return;
            }
            if (this.schema.remote) {
                this.selectRemoteMethod()
            } else {
                setTimeout(() => { this.$emit('loaded', this.schema.options) })
            }
        },
        selectRemoteMethod(query) {
            var opt = {
                ...this.schema.params
            };
            opt[this.schema.searchKey || 'name'] = query

            if (typeof (query) !== 'undefined' && typeof (this.schema.localSearch) !== 'undefined' && this.schema.localSearch) {
                return this.selectFilterMethod(query);
            }

            this.loading = true;
            this.schema['remoteMethod'] && this.schema['remoteMethod'](opt).then(res => {
                this.loading = false;
                if (!res.result) { res.result = [] }//兼容某些接口没有返回result字段问题
                if (this.cloudTypes.length) {
                    res.result = res.result.filter(item => {
                        return this.cloudTypes.indexOf(item.cloudType) > -1;
                    })
                }
                let list = res.result.data || res.result;
                if (this.schema.dataFilter && this.schema.dataFilter instanceof Function) {
                    list = list.filter(this.schema.dataFilter);
                }
                this.originList = deepClone(list);
                this.$set(this.schema, 'options', list)
                this.$emit('loaded', deepClone(list));
            }).catch(err => {
                this.loading = false;
                this.$emit('error', err)
            })
        },
        onChange(val) {
            this.$emit('update:model', this.newModel);
            this.$set(this.schema, 'options', this.originList);//本地搜索所需
            var dataItem = deepClone(this.schema.options.find(item => item[this.schema.valueKey] == this.newModel))
            this.$emit('change', dataItem)
        },

        //前端搜索
        selectFilterMethod(val) {
            if (val) { //val存在
                let cbList = this.originList.filter((item) => {
                    if (!!~(item[this.schema.labelKey || 'label'] || (this.schema.getLabel && this.schema.getLabel(item))).toUpperCase().indexOf(val.toUpperCase())) {
                        return true
                    }
                })
                this.$set(this.schema, 'options', cbList)
            } else {
                this.$set(this.schema, 'options', this.originList)
            }
        },
        clear(){
            this.$emit('update:model', '');
            this.schema.options=[];
        }
    }
}
</script>