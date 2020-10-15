const compare = (left, right, sort) => {
    if (left < right) {
        return sort ? (sort === "desc" ? -1 : 1) : -1;
    }
    if (left > right) {
        return sort ? (sort === "desc" ? 1 : -1) : 1;
    }
}

export const objectSorter = (property, sort, oproperty, osort) => {
    return function (a, b) {
        if ((a[property] != undefined) && (b[property] !== undefined)) {
            const left = typeof a[property] === 'string' ? a[property].toUpperCase() : a[property];
            const right = typeof b[property] === 'string' ? b[property].toUpperCase() : b[property];

            if (oproperty && osort && (a[oproperty] != undefined) && (b[oproperty] !== undefined)) {
                const oleft = typeof a[oproperty] === 'string' ? a[oproperty].toUpperCase() : a[oproperty];
                const oright = typeof b[oproperty] === 'string' ? b[oproperty].toUpperCase() : b[oproperty];
                if (left === right) {
                    return compare(oleft, oright, osort)
                }
                else {
                    return compare(left, right, sort)
                }
            }

            return compare(left, right, sort)
        }

        return 0;
    };
};