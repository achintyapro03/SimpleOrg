import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import eventService from './eventService';

const initialState = {
  events: [],
  event: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  allEvents: [],
};

export const createEvent = createAsyncThunk(
  'event/create',
  async (eventData, thunkAPI) => {
    try {
      //   console.Console;
      const token = thunkAPI.getState().auth.user.token;
      return await eventService.createEvent(eventData, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getEvents = createAsyncThunk(
  'event/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await eventService.getEvents(token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getEvent = createAsyncThunk(
  'event/get',
  async (eventId, thunkAPI) => {
    // console.log()
    try {
      console.log('pokemon');
      console.log(eventId);
      const token = thunkAPI.getState().auth.user.token;
      return await eventService.getEvent(eventId, token);
    } catch (err) {
      console.log('wasted');
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllEvents = createAsyncThunk(
  'event/getAllx',
  async (orgId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await eventService.getAllEvents(orgId, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const joinEvent = createAsyncThunk(
  'event/joinEvent',
  async (eventId, thunkAPI) => {
    try {
      console.log(eventId);
      const token = thunkAPI.getState().auth.user.token;
      const orgId = thunkAPI.getState().org.org._id;

      return await eventService.joinEvent(eventId, orgId, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvent.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allEvents = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(joinEvent.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
        state.isLoading = true;
      })
      .addCase(joinEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allEvents = action.payload;
      })
      .addCase(joinEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        console.log('popo');
        state.event = action.payload;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = eventSlice.actions;
export default eventSlice.reducer;
