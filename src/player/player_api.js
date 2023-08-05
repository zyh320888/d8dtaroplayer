import Taro from '@tarojs/taro'
import CONFIG from '../appConfig';

const apiConfig = {
    apiHost: CONFIG.PRE_API_HOST
}

class AppApi {
    constructor(config){
        this.apiHost = config.apiHost;
    }

    apiPost({url,param,success,fail}){
        if(!url){
            fail('请传入url');
            return;
        }

        Taro.request({
            url,
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            dataType:'json',
            data: param
        })
        .then(res => {
            console.log('Api.apiPost',res.data);
            if(res.data.code === 200){
                if(typeof success === 'function')success(res.data);
            } else {
                if(typeof fail === 'function')fail(res.data);
            }

        })
        .catch(error => {
            if(typeof fail == 'function')fail(error.toString());
        });
    }
}

export default new AppApi(apiConfig);
