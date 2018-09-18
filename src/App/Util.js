const WAIT_MILLISECONDS = 300;
let timeoutId;


/*
* Returns a debounced resolved promise to be .then() chained later on
* */
const debounce = fn => new Promise((resolve) => {
    const later = () => {
        resolve(fn);
        timeoutId = null;
    };
    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, WAIT_MILLISECONDS);
});

/*
* Returns a debounced function to be immediately used
* */

const debouncePlain = (fn) => {
    const later = () => {
        fn();
        timeoutId = null;
    };
    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, WAIT_MILLISECONDS);
};

export {
    debouncePlain,
    debounce,
    WAIT_MILLISECONDS,
};
