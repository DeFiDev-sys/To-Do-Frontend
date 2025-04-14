import axios from "axios";
import { AppDispatch } from "@/reduxs/Store";
import { PayloadAction } from "@reduxjs/toolkit";

export const handleAsyncError  = (
    error:unknown,
    dispatch:AppDispatch,
    setErrorAction:(message:string)=>PayloadAction<string>,
    defaultMessage:string='Request Failed'
): string =>{
    let errorMessage = defaultMessage;

    if (axios.isAxiosError(error)) {
     errorMessage = error.response?.data?.message || defaultMessage;
      dispatch(setErrorAction(errorMessage));
      return errorMessage; 
    }
    dispatch(setErrorAction(defaultMessage));
    return defaultMessage;
}