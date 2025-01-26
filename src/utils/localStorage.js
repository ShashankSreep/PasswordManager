export function setItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        console.error("Error setting item in localStorage");
    }
}

export function getItem(key) {
    try {
        return JSON.parse(localStorage.getItem(key));
    } catch {
        console.error("Error getting item from localStorage");
    }
}

export function deleteItem(key) {
    try {
        localStorage.removeItem(key);
    } catch {
        console.error("Error deleting item from localStorage");
    }
}

export function clearStorage() {
    try {
        localStorage.clear();
    } catch {
        console.error("Error clearing localStorage");
    }
}