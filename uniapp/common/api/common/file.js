import axios from '../axios'
import store from '@/store'

export default{
    upload: (tempFilePaths)=>{
        const header = {"ContentType":"application/json"};
        if (store.state.token) {
            // 给请求头添加user-token
            header["authorization"] = store.state.token;
        }
        return new Promise((resolve,reject)=>{
            uni.uploadFile({
                url: store.state.baseUrl + '/api/file/upload', //仅为示例，非真实的接口地址
                filePath: tempFilePaths[0],
                name: 'file',
                header: header,
                success: (uploadFileRes) => {
                    resolve(JSON.parse(uploadFileRes.data))
                },
                fail: (err)=>{
                    reject(err)
                }
            });
        })
        
        
        // axios.post('/api/file/upload',opt)
    }
}