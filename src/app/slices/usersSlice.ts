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
  favourites: string[];
};

const initialState: State = {
  currentUser: {
    id: '',
    email: ''
  },
  favourites: []
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  // initialState: {
  //   currentUser: {
  //     id: '',
  //     email: ''
  //   },
  //   favourites: []
  // },
  reducers: {
    setUser: (users, action) => {
      users.currentUser = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      // create user Firebase db profile
      .addCase(createUserDbProfile.pending, () => {
        console.log('createUserDbProfile is pending');
      })
      .addCase(createUserDbProfile.fulfilled, () => {
        console.log('createUserDbProfile is fullfield');
      })
      .addCase(createUserDbProfile.rejected, () => {
        console.log('createUserDbProfile is rejected');
      })
      // get user Firebase db profile
      .addCase(getUserDbProfile.pending, () => {
        console.log('getUserDbProfile is pending');
      })
      .addCase(getUserDbProfile.fulfilled, (state, action) => {
        if (action.payload) {
          console.log('getUserDbProfile is fullfield');
          state.favourites = action.payload.favourites;
        }
      })
      .addCase(getUserDbProfile.rejected, () => {
        console.log('getUserDbProfile is rejected');
      })
      // add to Favourites user db pfofile Firebase
      .addCase(addFavourites.pending, () => {
        console.log('addFavourites is pending');
      })
      .addCase(addFavourites.fulfilled, () => {
        console.log('addFavourites is fullfield');
      })
      .addCase(addFavourites.rejected, () => {
        console.log('addFavourites is rejected');
      })
      // remove from Favourites user db pfofile Firebase
      .addCase(removeFavourites.pending, () => {
        console.log('removeFavourites is pending');
      })
      .addCase(removeFavourites.fulfilled, () => {
        console.log('removeFavourites is fullfield');
      })
      .addCase(removeFavourites.rejected, () => {
        console.log('removeFavourites is rejected');
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
// TODO добавить типы createAsyncThunk.withTypes
export const createUserDbProfile = createAppAsyncThunk(
  'users/createUserDbProfile',
  async (userData: UserProfileData) => {
    console.log(userData);
    try {
      if (userData.userEmail) {
        await setDoc(doc(db, 'users', userData.userEmail), {
          id: userData.userId,
          favourites: []
        });
      }
    } catch (error) {
      console.log(error);
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
    }
  }
);

export const { setUser } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
