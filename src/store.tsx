import type { ComponentType } from "react";
import { useMemo, useEffect } from "react";
import { RenderTarget } from "framer";
//@ts-ignore
import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0";

// Learn more: https://www.framer.com/docs/guides/overrides/

const useStore = createStore({});

type Datasets = String | {};

export const useFormStore = () => {
  const [formStore, setFormStore] = useStore();
  return [formStore, setFormStore];
};

export const useFormValue = (name?, value?) => {
  const [formStore, setFormStore] = useStore();
  const nameValue = name || "undefined";
  const storeValue = formStore[nameValue]?.value;
  const returnedValue = storeValue === undefined ? value : storeValue;

  const setValueStore = (datasets) => {
    let data,
      type = typeof datasets;

    if (type === "string" || type === "number" || type === "boolean") {
      data = { value: datasets };
    } else if (type === "object") {
      data = datasets;
    } else {
      return;
    }

    setFormStore((prev) => ({
      ...prev,
      [nameValue]: {
        ...prev[nameValue],
        ...data,
      },
    }));
  };

  const deleteStoreValue = () => {
    setFormStore((previousStore) => {
      const newStore = previousStore;
      delete newStore[nameValue];
      return newStore;
    });
  };

  useEffect(() => {
    value && setValueStore(value);
  }, []);

  return [storeValue, setValueStore, deleteStoreValue];
};
