import { taskData, TaskState } from "@/types/definitions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TaskState = {
  loading: false,
  error: null,
  tasks: [],
};

export const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    getTask: (state, action: PayloadAction<taskData[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<taskData>) => {
      state.tasks?.unshift(action.payload);
    },
    upDateTask: (state, action: PayloadAction<taskData>) => {
      const index = state.tasks?.findIndex((task) => task._id === action.payload._id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
});

interface RootState {
    task:TaskState
}


export const {setLoading,setError,getTask,addTask,deleteTask,upDateTask} = TaskSlice.actions
export default TaskSlice.reducer;
export const TaskSelector = (state:RootState)=>state.task