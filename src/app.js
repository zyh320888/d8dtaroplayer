import React, { useEffect } from 'react'
import Taro,{ useDidShow, useDidHide } from '@tarojs/taro'
import Store, { getStore, setStore } from "./player/redux_store";
// 全局样式
import './app.css'



function getCodeLocal() {
  let appCode = require('./appCode');
  let APP_CONFIG = require('./appConfig');
  console.log('getCodeLocal.CONFIG', APP_CONFIG);
  //console.log('getCodeLocal.treeArr', appCode);

  setStore('APP_CONFIG',APP_CONFIG);
  let treeArr = JSON.parse(appCode.codeArr.代码对象数组);
  //console.log('getCodeLocal.treeArr', treeArr);

  if(process.env.TARO_ENV !== 'h5'){
    Taro.setStorageSync('treeArr', treeArr);
  }
}


function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {
    getCodeLocal();
  },[])

  // 对应 onShow
  useDidShow(() => {})

  // 对应 onHide
  useDidHide(() => {})

  return props.children
}

export default App
