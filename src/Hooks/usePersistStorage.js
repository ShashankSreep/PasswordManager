import {setItem, getItem, deleteItem, clearStorage} from "../utils/localStorage";
import { useEffect, useState } from "react";


export function usePersistStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const storedValue = getItem(key);
        return storedValue !== null ? storedValue : initialValue;
    }, [key]);

    useEffect(() => {
        setItem(key, value);
    }, [key, value]);

    return [value, setValue];
}