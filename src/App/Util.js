const WAIT_MILLISECONDS = 200;
let timeoutId;

const debounce = (fn) => {
    const later = () => {
        fn();
        timeoutId = null;
    };
    clearTimeout(timeoutId);
    timeoutId = setTimeout(later, WAIT_MILLISECONDS);
};

export {
    debounce, // eslint-disable-line
};
