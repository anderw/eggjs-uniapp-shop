<!--
 * @description     403没有权限
 *
 * @author          涂重阳 | tuchongyang
 * @email           779311998@qq.com
 * @phone           18707133663
 * @create          2019-02-13 09:00
 * -->
<template>
    <div class="power-container">
        <h1>{{$t('message.tips403')}}</h1>
        <el-row>
            <router-link to="/"><el-button type="primary">{{$t('actions.backHome')}}</el-button></router-link>
        </el-row>
    </div>
</template>
<script>

export default {
    data() {
        return {
            
        }
    },
    methods: {
        
    }
}
</script>
<style lang="scss" scoped>
.power-container {
    width: 500px;
    margin: 40px auto;
    text-align: center;
    h1 {
        margin-bottom: 30px;
        text-align: center;
    }
}
</style>