import { setLoading, setError as setUserError, setUser, setUserStatus } from "../Slices/UserSlice";
import { AppDispatch } from "../Store";
import apiClient from "@/util/apiClient";
import { UserData, UserStatusProps } from "@/types/definitions";
import { setAuthCookie, verifyAuthToken } from "@/server/server";
import { handleAsyncError } from "@/util/errorMsg";

export const LogInAction = (email: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  try {
    const { data } = await apiClient.post<UserData>(`/auth/login`, { email, password });

    const userInfo = { id: data.id, name: data.name, email: data.email };

    dispatch(setUser({...userInfo, token: data.token}));
    if (!data.token) {
      throw new Error("Authentication failed: No token received");
    }
    await setAuthCookie(data.token);
    await verifyAuthToken(data.token);

    return data;
  } catch (error) {
    handleAsyncError(error, dispatch,setUserError,'Login Failed')
  }
};

export const RegisterUserAction = (name:string, email:string, password:string) => async (dispatch:AppDispatch) =>{
  dispatch(setLoading(true));
  
  try {
    const {data} = await apiClient.post<UserData>('/auth/register',{name,email,password})
    const userInfo = {id:data.id,name:data.name,email:data.email}

    dispatch(setUser({...userInfo,token:data.token}))
    if (!data.token) {
      throw new Error("Authentication failed: No token received");
    }
    await setAuthCookie(data.token)
    await verifyAuthToken(data.token)
    
    return data
  } catch (error) {
    handleAsyncError(error, dispatch,setUserError,'Registration Failed')
  }
}

export const ForgetPassword =  (email : string) => async (dispatch:AppDispatch) =>{
  dispatch(setLoading(true))

  try {
    const response = await apiClient.post<UserStatusProps>('/auth/request-change-password',{email})
    dispatch(setUserStatus(response.data))
  } catch (error) {
    handleAsyncError(error,dispatch,setUserError,"Failed to send email.")
  }finally{
    dispatch(setLoading(false))
  }
}

export const ResetPasswordAction = (token:string,newPassword:string) => async(dispatch:AppDispatch)=>{
  dispatch(setLoading(true))

  try {
    const response = await apiClient.post<UserStatusProps>('/auth/reset_password',{token,newPassword})
    dispatch(setUserStatus(response.data))
    return response
  } catch (error) {
    handleAsyncError(error,dispatch,setUserError,'Failed to set new password')
  }finally{
    dispatch(setLoading(false))
  }
}

