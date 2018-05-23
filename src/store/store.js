import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
 
export default new Vuex.Store({
  state:{
    StaffID:0,
    isLogin:false,
  },
  mutations:{
   // increment:state => state.count ++,
    //decrement:state => state.count --,
      ADD_STAFFID(state,data){
        sessionStorage.setItem("StaffID",data);
        state.StaffID=data;
        state.isLogin=true;
      },
      SIGN_OUT(state){
        sessionStorage.removeItem("StaffID");
        state.StaffID='';
        state.isLogin=false
      }
  },
  getters:{
        isLogin(state){
            if(!state.isLogin){
                state.isLogin=sessionStorage.getItem('isLogin');
                state.StaffID=sessionStorage.getItem('StaffID');
            }
        }
  },
  actions:{
      //
  }
})