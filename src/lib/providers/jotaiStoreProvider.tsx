'use client'
import {createStore, Provider} from "jotai";
import React, {FC} from "react";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const jotaiStore = createStore()
export const JotaiStoreProvider: FC<Props> = (props) => {
  return (
    <Provider store={jotaiStore}>
      {props.children}
    </Provider>
  );
}