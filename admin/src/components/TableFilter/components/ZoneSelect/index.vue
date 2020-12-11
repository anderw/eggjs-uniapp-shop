<template>
    <el-select v-model="model" value-key="name" @change="onChange()">
        <el-option v-if="showAll" value="" :label="$t('common.all')"></el-option>
        <el-option v-for="(item,index) in zoneList" :key="index" :label="item.name" :value="item.providerId"></el-option>
    </el-select>
</template>
<script>
import resourceApi from '@/views/resource/api'
export default {
    data() {
        return {
            model: "",
            zoneList: []
        }
    },
    props: {
        cloudType: {
            type: String,
            default: ''
        },
        showAll:{
            type:Boolean,
            default:false
        },
        regionId: {
            type: String,
            default: ''
        },
        list: {
            type: Array,
            default: []
        }
    },
    created() {
        this.qryZoneList();
    },
    methods: {
        qryZoneList() {
            resourceApi.zone.select({ cloudType: this.cloudType, regionProviderId: this.regionId }).then(res => {
                this.zoneList = res.result;
                this.$emit('update:list', this.zoneList.map(item => {
                    item.value = item.providerId;
                    item.label = item.name;
                    return item;
                }));
            })

        },
        onChange() {
            this.$emit('update:model', this.model);
        }
    }
}
</script>
