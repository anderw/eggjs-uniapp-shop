import {eventTracer} from '@/api/common/index';

function tracing(){
	var tracer = {
		opts:{
			eventIds:[],
			callbacks:[]
		},
		timer: null,
		type: '',
		errorCount: 0,//记录请求错误次数
		start: function(ids,callback){
            this.opts.eventIds = [...new Set([...this.opts.eventIds,...ids])];

            ids.map(item=>{
                return {
                    'eventId': item,
                    'callback': callback,
                }
            }).forEach(opt=>{
            	let currentIndex = this.opts.callbacks.findIndex(callItem=>callItem.eventId == opt.eventId)
                if(currentIndex >= 0){
                    this.opts.callbacks.splice(currentIndex,1);
                }
                this.opts.callbacks.push(opt)
            });
            self.errorCount=0;
			if(this.timer){
				window.clearInterval(this.timer)
			}
			this.getData();
			this.timer = setInterval(()=>{
				this.getData();
			},3000)
		},
		getData(){
            let self = this;
            if(!self.opts.eventIds.length){
                window.clearInterval(self.timer);
                self.timer = null;
                return;
            }
			eventTracer({eventIds:this.opts.eventIds.join(','),nodeType:this.type}).then(res=>{
				(res.result || []).forEach((item,i)=>{
					if(item.eventStatus != 'processing'){
						var current = this.opts.callbacks.find(callItem=>item.eventId == callItem.eventId)
                        if(current){
                        	setTimeout(()=>{
                            	current.callback.finally(item);
                        		for(let c in this.opts.callbacks){
									if(item.eventId == this.opts.callbacks[c].eventId){
										this.opts.callbacks.splice(c,1)
									}
								}
                        	},i)
                        }
						this.opts.eventIds.splice(i,1);
					}
					
					if(item.eventStatus == 'processing'){
                        this.opts.callbacks.find(callItem=>item.eventId == callItem.eventId).callback.precessing(item);
					}
					sessionStorage.setItem('eventIds',this.opts.eventIds.join(','))
				})
			}).catch(err=>{
				self.errorCount++
				if(self.errorCount > 3){//错误3次之后执行清空
					window.clearInterval(self.timer);
					ELEMENT.Message.error('同步任务失败...');
					self.errorCount = 0;
				}
			})
		}
	}
	return tracer;
}

var $eventTracer = {
	list:[],
	contains:function(id){
		var eventIds = sessionStorage.getItem('eventIds');
		if(eventIds && eventIds.split(',').indexOf(id)>-1){
			return true
		}
		return false
	},
	start:function(ids, type, callback){
        var current = this.list.find(item=>item.type == type)
		if(current){
			current.start(ids,callback)
		}else{
			var trace1 = new tracing();
			trace1.type = type;//实例化了其中的属性
            this.list.push(trace1);
        
			trace1.start(ids,callback);
		}
	}
}

export default $eventTracer;
export { $eventTracer };