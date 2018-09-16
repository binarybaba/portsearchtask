const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const timeStampToISO = (date) => {
    const fullISO = (new Date(date)).toISOString();
    return fullISO.substring(0, fullISO.indexOf('T'));
};


const stringDateToHuman = (date) => {
    const d = new Date(date);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

export {
    timeStampToISO,
    stringDateToHuman,
};
