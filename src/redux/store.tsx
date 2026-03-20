import { configureStore } from "@reduxjs/toolkit";
import templateReducer from "../Components/Templates/slice/template.slice";
// import elementReducer from "../Components/Elements/slice/element.slice";

export const store = configureStore({
  reducer: {
    templates: templateReducer,
    // elements: elementReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
