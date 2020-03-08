function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}

const sortUp = (type, arr) => {
    const IsNumber = arr.some(el => isNumeric(el[type]));
    const list = arr.sort((a, b) => {
        if (a[type] === undefined && b[type] == undefined) {
            return 0
        } else if (a[type] == undefined) {
            return -1
        } else {
            return 1
        }
    })
    return list.sort((a, b) => {
        if (a[type] !== undefined && b[type] !== undefined) {
            if (!IsNumber) {
                const nameA = a[type].toUpperCase();
                const nameB = b[type].toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            } else {
                return a[type] - b[type]
            }
        }
    })
}

const sortDown = (type, arr) => {
    const IsNumber = arr.some(el => isNumeric(el[type]));
    const list = arr.sort((a, b) => {
        if (a[type] === undefined && b[type] == undefined) {
            return 0
        } else if (a[type] == undefined) {
            return -1
        } else {
            return 1
        }
    })
    return list.sort((a, b) => {
        if (a[type] !== undefined && b[type] !== undefined) {
            if (!IsNumber) {
                const nameA = a[type].toUpperCase();
                const nameB = b[type].toUpperCase();
                if (nameA > nameB) {
                    return -1;
                }
                if (nameA < nameB) {
                    return 1;
                }
                return 0;
            } else {
                return b[type] - a[type]
            }
        }
    })
}

export { sortUp, sortDown };