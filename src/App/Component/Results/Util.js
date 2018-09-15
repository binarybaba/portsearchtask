const timeStampToISO = (date) => {
    const fullISO = (new Date(date)).toISOString();
    return fullISO.substring(0, fullISO.indexOf('T'));
};


export {
    timeStampToISO, // eslint-disable-line
};
