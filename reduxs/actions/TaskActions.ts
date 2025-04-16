import apiClient from "@/util/apiClient";
import { AppDispatch } from "../Store";
import { setError as setTaskError,setLoading,addTask,deleteTask,upDateTask, getTask, } from "../Slices/TaskSlice";
import { taskData, TaskState } from "@/types/definitions";
import { handleAsyncError } from "@/util/errorMsg";

//Get Tasks on load.
export const GetTaskAction = () => async (dispatch:AppDispatch) => {
    dispatch(setLoading(true))

    try {
        const response = await apiClient.get<TaskState>('/tasks/get_Tasks')
        dispatch(getTask(response.data.tasks))
        return response
    } catch (error) {
        handleAsyncError(error,dispatch,setTaskError,'Failed to get tasks.')
    }finally{
        dispatch(setLoading(false))
    }
};

//Create new tasks
export const CreateTaskAction = (title: string, description: string, reminderAt: Date | null) => async (dispatch:AppDispatch) => {
    dispatch(setLoading(true));

    try {
        const {data} = await apiClient.post<taskData>('/tasks/create_Task',{title,description,reminderAt})
        dispatch(addTask(data))
        return data
    } catch (error) {
        handleAsyncError(error,dispatch,setTaskError,'Task creation Failed.')
    }finally{
        dispatch(setLoading(false));
    }
}

//Upadate Tasks
export const UpdateTaskAction = (_id:string,title:string,description:string,status:string,reminderAt:Date | null) => async (dispatch:AppDispatch) =>{
    dispatch(setLoading(true))

    try {
        const response = await apiClient.patch<taskData>(`/tasks/update_Task/${_id}`,{title,description,status,reminderAt})
        dispatch(upDateTask(response.data))
        return response
    } catch (error) {
        handleAsyncError(error,dispatch,setTaskError,'Update task Failed.')
    }finally{
        dispatch(setLoading(false))
    }
}

//Delete Tasks
export const DeteleTaskAction = (_id:string) => async (dispatch:AppDispatch) => {
    dispatch(setLoading(true))

    try {
         apiClient.delete<taskData>(`/tasks/delete_Task/${_id}`)
        dispatch(deleteTask(_id))
    } catch (error) {
        handleAsyncError(error,dispatch,setTaskError,'Failed to delete task.')
    }finally{
        dispatch(setLoading(false))
    }
}

export const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString() + ' ' + newDate.toLocaleTimeString();
};