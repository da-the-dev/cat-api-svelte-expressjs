export class StatusError extends Error {
    public status: number
    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }
}

export function isStatusError(error: any): error is StatusError {
    return typeof error === 'object' && error.status != undefined ? true : false
}
