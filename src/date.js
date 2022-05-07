import lightFormat from 'date-fns/fp/lightFormat';
import addDays from 'date-fns/fp/addDays';
import subDays from 'date-fns/fp/subDays';
import * as R from 'ramda';

const getNextDate = R.when(
  R.lte(R.__, new Date()),
  addDays(1)
);
const getPrevDate = R.when(
  R.gt(R.__, new Date("1995-06-20")),
  subDays(1)
);
const formatDate = lightFormat("yyyy-MM-dd");

const getRandomDate = () => {
  const start = (new Date("1995-06-20")).getTime()
  const end = (new Date()).getTime();

  return new Date(start + Math.random() * (end - start));
}

export {getNextDate, getPrevDate, formatDate, getRandomDate};
