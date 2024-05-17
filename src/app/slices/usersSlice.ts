import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { AppDispatch, RootState } from '../store';

type RootUser<T> = {
  id: T;
  email: T;
};

type State = {
  currentUser: RootUser<string | null | undefined>;
  // favourites: string[];
  favourites: {
    status: {
      isLoading: boolean;
      isError: string;
    };
    data: string[];
  };
  // history: string[];
  history: {
    status: {
      isLoading: boolean;
      isError: string;
    };
    data: string[];
  };
  userDbProfileLoadingStatus: {
    isLoading: boolean;
    isError: string;
  };
};

const initialState: State = {
  currentUser: {
    id: '',
    email: ''
  },
  // favourites: [],
  favourites: {
    status: {
      isLoading: false,
      isError: ''
    },
    data: []
  },
  // history: [],
  history: {
    status: {
      isLoading: false,
      isError: ''
    },
    data: []
  },
  userDbProfileLoadingStatus: {
    isLoading: false,
    isError: ''
  }
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (users, action) => {
      users.currentUser = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      // create user Firebase db profile
      .addCase(createUserDbProfile.pending, state => {
        console.log('createUserDbProfile is pending');
        state.userDbProfileLoadingStatus.isLoading = true;
        state.userDbProfileLoadingStatus.isError = '';
      })
      .addCase(createUserDbProfile.fulfilled, state => {
        console.log('createUserDbProfile is fullfield');
        state.userDbProfileLoadingStatus.isLoading = false;
        state.userDbProfileLoadingStatus.isError = '';
      })
      .addCase(createUserDbProfile.rejected, (state, action) => {
        console.log('createUserDbProfile is rejected');
        if (action.payload) {
          state.userDbProfileLoadingStatus.isError = action.payload;
        }
        state.userDbProfileLoadingStatus.isLoading = false;
      })
      // get user Firebase db profile
      .addCase(getUserDbProfile.pending, state => {
        console.log('getUserDbProfile is pending');
        state.userDbProfileLoadingStatus.isLoading = true;
        state.userDbProfileLoadingStatus.isError = '';
      })
      .addCase(getUserDbProfile.fulfilled, (state, action) => {
        if (action.payload) {
          console.log('getUserDbProfile is fullfield');
          // TODO типизация
          state.favourites.data = action.payload.favourites;
          state.history.data = action.payload.history;
        }
        state.userDbProfileLoadingStatus.isLoading = false;
        state.userDbProfileLoadingStatus.isError = '';
      })
      .addCase(getUserDbProfile.rejected, (state, action) => {
        console.log('getUserDbProfile is rejected');
        if (action.payload) {
          state.userDbProfileLoadingStatus.isError = action.payload;
        }
        state.userDbProfileLoadingStatus.isLoading = false;
      })
      // add to Favourites user db pfofile Firebase
      .addCase(addFavourites.pending, state => {
        console.log('addFavourites is pending');
        state.favourites.status.isLoading = true;
        state.favourites.status.isError = '';
      })
      .addCase(addFavourites.fulfilled, state => {
        console.log('addFavourites is fullfield');
        state.favourites.status.isLoading = false;
        state.favourites.status.isError = '';
      })
      .addCase(addFavourites.rejected, (state, action) => {
        console.log('addFavourites is rejected');
        if (action.payload) {
          state.favourites.status.isError = action.payload;
        }
        state.favourites.status.isLoading = false;
      })
      // remove from Favourites user db pfofile Firebase
      .addCase(removeFavourites.pending, state => {
        console.log('removeFavourites is pending');
        state.favourites.status.isLoading = true;
        state.favourites.status.isError = '';
      })
      .addCase(removeFavourites.fulfilled, state => {
        console.log('removeFavourites is fullfield');
        state.favourites.status.isLoading = false;
        state.favourites.status.isError = '';
      })
      .addCase(removeFavourites.rejected, (state, action) => {
        console.log('removeFavourites is rejected');
        if (action.payload) {
          state.favourites.status.isError = action.payload;
        }
        state.favourites.status.isLoading = false;
      })
      // add to History user db profile Firebase
      .addCase(addHistory.pending, state => {
        console.log('addHistory is pending');
        state.history.status.isLoading = true;
        state.history.status.isError = '';
      })
      .addCase(addHistory.fulfilled, state => {
        console.log('addHistory is fullfield');
        state.history.status.isLoading = false;
        state.history.status.isError = '';
      })
      .addCase(addHistory.rejected, (state, action) => {
        console.log('addHistory is rejected');
        if (action.payload) {
          state.history.status.isError = action.payload;
        }
        state.history.status.isLoading = false;
      })
      // remove from History user db profile Firebase
      .addCase(removeHistory.pending, state => {
        console.log('removeHistory is pending');
        state.history.status.isLoading = true;
        state.history.status.isError = '';
      })
      .addCase(removeHistory.fulfilled, state => {
        console.log('removeHistory is fullfield');
        state.history.status.isLoading = false;
        state.history.status.isError = '';
      })
      .addCase(removeHistory.rejected, (state, action) => {
        console.log('removeHistory is rejected');
        if (action.payload) {
          state.history.status.isError = action.payload;
        }
        state.history.status.isLoading = false;
      });
  }
});

type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
};

const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();

type UserProfileData = {
  userId: string | undefined | null;
  userEmail: string | undefined | null;
};
// используется при регистрации пользователя
export const createUserDbProfile = createAppAsyncThunk(
  'users/createUserDbProfile',
  async (userData: UserProfileData) => {
    console.log(userData);
    try {
      if (userData.userEmail) {
        await setDoc(doc(db, 'users', userData.userEmail), {
          id: userData.userId,
          favourites: [],
          history: []
        });
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
// используется при авторизации пользователя
export const getUserDbProfile = createAppAsyncThunk(
  'users/getUserDbProfile',
  async (userData: UserProfileData) => {
    console.log(userData);
    try {
      if (userData.userEmail) {
        const userRef = doc(db, 'users', userData.userEmail);
        const docSnap = await getDoc(userRef);
        return docSnap.data();
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

type UserFavouriteData = {
  userEmail: string | null | undefined;
  photoId: string | undefined;
};
// добавляет photoId авторизованного пользователя в Firebase
export const addFavourites = createAppAsyncThunk(
  'users/addFavourites',
  async (userData: UserFavouriteData) => {
    try {
      if (userData.userEmail) {
        const userRef = doc(db, 'users', userData.userEmail);
        await updateDoc(userRef, {
          favourites: arrayUnion(userData.photoId)
        });
      }
      return userData;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
// удаляет photoId авторизованного пользователя в Firebase
export const removeFavourites = createAppAsyncThunk(
  'users/removeFavourites',
  async (userData: UserFavouriteData) => {
    try {
      if (userData.userEmail) {
        const userRef = doc(db, 'users', userData.userEmail);
        await updateDoc(userRef, {
          favourites: arrayRemove(userData.photoId)
        });
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

type UserHistoryData = {
  userEmail: string | null | undefined;
  search: string | undefined;
};
// добавляет searchText в history авторизованного пользователя в Firebase
export const addHistory = createAppAsyncThunk(
  'users/addHistory',
  async (userData: UserHistoryData) => {
    try {
      if (userData.userEmail) {
        const userRef = doc(db, 'users', userData.userEmail);
        await updateDoc(userRef, {
          history: arrayUnion(userData.search)
        });
      }
      return userData;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);
// TODO remove from History
export const removeHistory = createAppAsyncThunk(
  'users/removeHistory',
  async (userData: UserHistoryData) => {
    try {
      if (userData.userEmail) {
        const userRef = doc(db, 'users', userData.userEmail);
        await updateDoc(userRef, {
          history: arrayRemove(userData.search)
        });
      }
      return userData;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
);

export const { setUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
