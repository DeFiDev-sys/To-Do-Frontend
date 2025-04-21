import { deleteAuthToken } from "@/server/server";
import { getUserFromLocalstorage, UserData, UserState, UserStatusProps } from "@/types/definitions";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  loading: false,
  error: null,
  userInfo: getUserFromLocalstorage(),
  userStatus: null
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<UserData>) => {
      state.loading = false;
      state.error = null;
      state.userInfo = action.payload;
      try {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      } catch (error) {
        console.error("Error saving userInfo to localStorage:", error);
      }
    },
    setUserStatus : (state,action:PayloadAction<UserStatusProps>) =>{
      state.loading = false;
      state.error = null;
      state.userStatus = action.payload;
      // setTimeout(()=>{
      //   state.userStatus = null
      // },2000)
    },
    setUserLogout: (state) => {
      state.loading = false;
      state.error = null;
      state.userInfo = null;
      state.userStatus = null;
      localStorage.removeItem("userInfo");
      deleteAuthToken();
    },
  },
});

interface RootState {
  user: UserState;
}

export const { setLoading, setError, setUser, setUserLogout,setUserStatus } = UserSlice.actions;
export default UserSlice.reducer;
export const UserSelector = (state: RootState) => state.user;
