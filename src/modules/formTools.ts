export function isString() {
    return (val: any) => {
        return { valid: isNaN(val), name: 'isString' }
    }
}

export function isName() {
    return (val: any) => {
        return { valid: isNaN(val) && !/\d+/g.test(val), name: 'isName' }
    }
}
