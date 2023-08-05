import events from 'events';

let appCode = null;
if(process.env.TARO_ENV !== 'h5'){
    appCode = require('./../appCode');
}

const jsCode = appCode.jsCode;

export default function (_JS_CODE,_F, jsFunInfo = {}){

    //console.log('runJs.jsCode',_JS_CODE);
    //console.log('runJs._F',_F);

    //_F('');new events.EventEmitter();

    return (param,_funcCb)=>{
        try {
            //return eval('(function() {' + _JS_CODE + '\n}())');
            let jsKey = _JS_CODE;
            //console.log('jsFunInfo',jsFunInfo);
            if(jsCode.hasOwnProperty(jsKey) && typeof jsCode[jsKey] === 'function'){
                // return jsCode[jsKey]({ _F, param, _funcCb, events });

                if (jsFunInfo.isSync) {
                    // async function run() {
                    //     try {
                    //         await jsCode[jsKey]({ _F, param, _funcCb, events });
                    //     } catch (error) {
                    //         console.error(error.toString());
                    //     }
                    // }
                    
                    // return run().then((res)=>res);

                    return jsCode[jsKey]({ _F, param, _funcCb, events }).then((res)=>res);
                    //return jsCode[jsKey]({ _F, param, _funcCb, events });
                } else {
                    return jsCode[jsKey]({ _F, param, _funcCb, events });
                }

            }else{
                throw '运行函数方法不存在:'+ _JS_CODE;
            }
            

        } catch (error) {
            console.log('runJs.error.toString',error.toString());
            console.log('runJs.error',error);
        }
    }
}
