// hooks/redux.ts
import {  useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/configureStore';


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector:any = useSelector;
