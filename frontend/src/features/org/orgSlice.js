import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import orgService from './orgService';

const initialState = {
  orgs: [],
  org: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
  allOrgs: [],
};

export const createOrg = createAsyncThunk(
  'org/create',
  async (orgData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await orgService.createOrg(orgData, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOrgs = createAsyncThunk('org/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await orgService.getOrgs(token);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const getOrg = createAsyncThunk('org/get', async (orgId, thunkAPI) => {
  // console.log()
  try {
    console.log('idddddddd');
    console.log(orgId);
    const token = thunkAPI.getState().auth.user.token;
    return await orgService.getOrg(orgId, token);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();

    return thunkAPI.rejectWithValue(message);
  }
});

export const getAllOrgs = createAsyncThunk(
  'org/getAllx',
  async (_, thunkAPI) => {
    try {
      return await orgService.getAllOrgs();
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const joinOrg = createAsyncThunk(
  'org/joinOrg',
  async (orgId, thunkAPI) => {
    try {
      console.log('gay');
      const token = thunkAPI.getState().auth.user.token;
      return await orgService.joinOrg(orgId, token);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const orgSlice = createSlice({
  name: 'org',
  initialState,
  reducers: { reset: (state) => initialState },
  extraReducers: (builder) => {
    builder
      .addCase(createOrg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrg.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createOrg.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOrgs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrgs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orgs = action.payload;
      })
      .addCase(getOrgs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllOrgs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrgs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allOrgs = action.payload;
      })
      .addCase(getAllOrgs.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(joinOrg.pending, (state) => {
        state.isSuccess = false;
        state.isError = false;
        state.message = '';
        state.isLoading = true;
      })
      .addCase(joinOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allOrgs = action.payload;
      })
      .addCase(joinOrg.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOrg.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrg.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.org = action.payload;
      })
      .addCase(getOrg.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = orgSlice.actions;
export default orgSlice.reducer;
