/**
 * @class localStorageHandler
 * @classdesc set of functions to handle local storage
 */
export default class localStorageHandler {

    /** 
    * save pair of {key:value} onto local storage
    * @param {string} key the key
    * @param {string} value the value
     */
    setLocalStorage(key, value) {
        if (typeof value == 'object') {
            value = JSON.stringify(value);
        }
        localStorage.setItem(key, value);
    }

    /** 
       * get value base on key from local storage
       * @param {string} key the key to look
        */
    getLocalStorage(key) {
        let value = localStorage.getItem(key);
        if (value == null) return null;

        if (typeof value == 'string') {
            value = JSON.parse(value);
        }

        return value;
    }

     /** 
    * updates value based on key into local storage
    * @param {string} key the key
    * @param {string} value the value
     */
    updateLocalStorage(key, value) {
        this.setLocalStorage(key, value);
    }

    /** 
    * removes pair {key,value} from local storage
    * @param {string} key the key to remove
     */
    deleteLocalStorage(key) {
        localStorage.removeItem(key);
    }

}
