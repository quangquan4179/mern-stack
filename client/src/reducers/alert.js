
import { SET_ALERT, REMOVE_ALERT } from "../action/types";
const initialState = [];
export default function alertReducer(stare=initialState,action){
  const {type,payload}=action;
  switch(type){
    case SET_ALERT:
      return [...stare, payload]
    case REMOVE_ALERT:
      return stare.filter(alert=>alert.id!==payload);
    default:
      return stare;
  }
}