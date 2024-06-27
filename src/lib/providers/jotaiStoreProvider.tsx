'use client'
import {createStore, Provider} from "jotai";
import React, {FC} from "react";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const store = createStore()
export const JotaiStoreProvider: FC<Props> = (props) => {
  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  );
}