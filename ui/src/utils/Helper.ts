const isEmpty = (object: Object | undefined) => {
    for (let i in object) return false;
    return true;
}

export {isEmpty}