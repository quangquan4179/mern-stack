import {PROFILE_ERROR,GET_PROFILE,CLEAR_PROFILE} from  '../action/types'
const initialState ={
  profile:null,
  profiles:[],
  repos:[],
  loading:true,
  error :{}

}

export default function getProfile(state=initialState,action){
  const {type,payload}=action;
  switch(type){
    case GET_PROFILE:
      return {
        ...state,
        profile:payload,
        loading:false
      }
    case PROFILE_ERROR:
      return{
        ...state,
        loading:false,
        error:payload
      }
    case CLEAR_PROFILE:
      return{
        state,
        loading:false,
        profile:null
      }
    default:
      return state
  }

}