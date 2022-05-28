export function isString() {
    return (val) => {
        return { valid: typeof val === 'string', name: 'isString' }
    }
}
