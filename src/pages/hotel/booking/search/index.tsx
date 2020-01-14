import React from 'react';
import { ConnectState as GlobalConnectState, ConnectProps } from '@/models/connect';
import { useSelector, useDispatch } from 'dva';
import { NS, State as HotelBookingSearchState, saveFormValues } from './model';
import countries from './countries_ID.json';
import SearchForm from './components/search-form';

interface ConnectState extends GlobalConnectState {
  [NS]: HotelBookingSearchState;
}
const HotelSearch: React.FC<ConnectProps> = () => {
  const pickedState = useSelector((state: ConnectState) => ({
    loading: state.loading,
    [NS]: state[NS],
  }));

  const dispatch = useDispatch();

  return (
    <div>
      <p>Hotel Search</p>
      <SearchForm
        initialValue={pickedState[NS].searchForm}
        destinationSearchHandler={() => undefined}
        validateFieldsHandler={(e, v) => {
          console.log('error', e);
          console.log('value', v);
          dispatch(saveFormValues(v));
        }}
        destinations={[]}
        countries={countries}
      />
    </div>
  );
};

export default HotelSearch;
