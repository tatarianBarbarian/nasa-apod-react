import { useReducer } from 'react';
import { getRandomDate, getNextDate, getPrevDate } from './date';

const actionTypes = {
  GET_NEXT_DATE: 'GET_NEXT_DATE',
  GET_PREV_DATE: 'GET_PREV_DATE',
  GET_RANDOM_DATE: 'GET_RANDOM_DATE',
  RESET_DATE: 'RESET_DATE',
  SET_USER_DATE: 'SET_USER_DATE',
}

const dateReducer = (date, action) => {
  switch (action.type) {
    case actionTypes.GET_NEXT_DATE:
      return getNextDate(date);
    case actionTypes.GET_PREV_DATE:
      return getPrevDate(date);
    case actionTypes.GET_RANDOM_DATE:
      return getRandomDate();
    case actionTypes.RESET_DATE:
      return new Date();
    case actionTypes.SET_USER_DATE:
      return action.date;
    default:
      throw new Error('Ooops, unknown action type!')
  }
}

export const useDateReducer = () => {
  const [date, dispatch] = useReducer(dateReducer, new Date());
  const incrementDate = () => dispatch({ type: actionTypes.GET_NEXT_DATE });
  const decrementDate = () => dispatch({ type: actionTypes.GET_PREV_DATE });
  const setRandomDate = () => dispatch({ type: actionTypes.GET_RANDOM_DATE });
  const resetDate = () => dispatch({ type: actionTypes.RESET_DATE });
  const setDate = (date) => dispatch({ type: actionTypes.SET_USER_DATE, date: date || new Date() });

  return {
    date, 
    incrementDate,
    decrementDate,
    setRandomDate,
    resetDate,
    setDate
  };
}
