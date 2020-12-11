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
        setTimeout(()=>{
            if(instance){
                instance.svisible=false;
                document.body.removeChild(instance && instance.$el);
                instance =null
            }
        },300)
    };
};

const dialogForm = {
    show(options) {
        if(!instance){
            initInstance(options)
        }
        // for (let prop in options) {
        //     if (options.hasOwnProperty(prop)) {
        //         instance[prop] = options[prop];
        //     }
        // }
        instance.visible =true
    },
    hide(){
        instance && instance.doClose()
    },
    close() {
        instance && instance.doClose();
    }
}
export default dialogForm