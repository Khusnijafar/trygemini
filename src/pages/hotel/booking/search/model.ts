import { EffectsCommandMap } from 'dva';
import moment, { Moment } from 'moment';
import { createAsyncAction, ActionType, createAction } from 'typesafe-actions';

export const NS = 'hotelBooking__search';

const dummyReq = (x: number, y: number) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(x + y);
    }, 3000);
  });

export interface DestinationRequest {
  term: string;
}

export interface DestinationSearchKey {
  destinationSupplierCode: string;
  destinationCode: string;
}

export interface Destination {
  destinationShortName: string;
  destinationLongName: string;
  destinationSearchKeyList: DestinationSearchKey[];
}

export interface DestinationSuccess {
  destinationListResponse: Destination[];
}

interface DestinationFailure {
  message: string;
}
interface DestinationCancel {}

export const fetchDestination = createAsyncAction(
  'FETCH_DESTINATION_REQUEST',
  'FETCH_DESTINATION_SUCCESS',
  'FETCH_DESTINATION_FAILURE',
  'FETCH_DESTINATION_CANCEL',
)<DestinationRequest, DestinationSuccess, DestinationFailure, DestinationCancel>();

export const destinationActions = createAsyncAction(
  'destination_request',
  'destination_success',
  'destination_failure',
  'destination_cancel',
)<DestinationRequest, DestinationSuccess, DestinationFailure, DestinationCancel>();

type RoomChildAge = {
  roomNumber: number;
  childAge: number;
};

type RoomPax = {
  roomNumber: number;
  adultCount: number;
  childCount: number;
  childAges: RoomChildAge[];
};

const initialState = {
  destinationsResults: [] as Destination[],
  searchForm: {
    destination: 'Washington',
    nationality: 'USA',
    stayDates: [
      moment().add(3, 'months'),
      moment()
        .add(3, 'months')
        .add(1, 'days'),
    ] as Moment[],
    restriction: 0,
    isBusinessTrip: false,
    numberOfRooms: 1,
    ROOMS: [
      {
        firstName: 'Khusni',
        lastName: 'Jafar',
      },
      {
        firstName: 'Thomas',
        lastName: 'Kurniawan',
      },
    ],
    rooms: [
      {
        roomNumber: 1,
        adultCount: 1,
        childCount: 0,
        childAges: [...Array(3).keys()].map(x => ({ roomNumber: x + 1, childAge: 5 })),
      },
    ] as RoomPax[],
    xrooms: [],
    textInputText: 'This is default test input text',
  },
};

export type State = typeof initialState;

export const saveFormValues = createAction('SAVE_FORM_VALUES')<State['searchForm']>();

const Model = {
  namespace: NS,
  state: initialState,
  reducers: {
    destination_success: (state: State) => state,
    destination_failure: (state: State) => state,
    destination_cancel: (state: State) => state,

    SAVE_FORM_VALUES: (state: State, action: ActionType<typeof saveFormValues>) => {
      state.searchForm = action.payload;
    },
  },
  effects: {
    *fetch_destination(
      action: ActionType<typeof fetchDestination.request>,
      { call, put }: EffectsCommandMap,
    ) {
      const response = yield call(dummyReq, 10, 20);
      yield response;

      yield put(destinationActions.success({ destinationListResponse: [] }));
      yield put(destinationActions.failure({ message: 'server busy' }));
      yield put(destinationActions.cancel({}));
    },
  },
};

export default Model;
