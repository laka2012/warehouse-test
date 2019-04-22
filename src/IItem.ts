export default interface Item {
    date_added: string;
    type: string;
    sku: string;
    group_id: string;
    name: string;
    model: string;
    brand: string;
    url: string;
    image_url: string;
    on_special: boolean;
    price: number;
    flybuys_points: number;
    shipping_class: string;
    add_to_cart: boolean;
    categories: string;
    in_stock: true;
    sold_out: false;
}