export function formatPrice(price: number | undefined) : string {
    if (price) return price.toFixed(2).toString().replace(".", ",");
    else return '';
}