import { AppDispatch, RootState } from '@/reduxs/Store'
import { useDispatch, useSelector } from 'react-redux'


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()