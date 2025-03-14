export class QuantityNotSufficientError extends Error {
    constructor(message?: string) {
        super(message || 'Stock_quantity not enough')

    }
}
