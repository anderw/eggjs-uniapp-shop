import Vue from 'vue'
import main from './main.vue'
import store from '@/store'
const Constructor = Vue.extend(main);
let instance

const initInstance = (options) => {
    instance = new Constructor({
        el: document.createElement('div'),
        store,
        data: options
    });
    document.body.appendChild(instance.$el)
    instance.doClose = function(){
        instance.visible = false;
        
        document.body.removeChild(instance.$el);
        instance =null
        
        
    }
};

const dialogForm = {
    show(options) {
        if(instance){
            instance.doClose();
        }
        setTimeout(()=>{
            initInstance(options)
        
            instance.visible =true
        })
        
    },
    hide(){
        instance && instance.doClose()
    }
}
export default dialogForm