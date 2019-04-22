import Item from './IItem';

export interface CartItem extends Item {
    totalNumber: number;
}

export default interface CartItems {
    [id: string]: CartItem
}