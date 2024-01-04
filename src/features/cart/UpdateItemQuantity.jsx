/* eslint-disable react/prop-types */

import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { decreaseItemquantity, increaseItemquantity } from './cartSlice';
export default function UpdateItemQuantity({ pizzaId, currentQuantity }) {


    const dispatch = useDispatch();
    const handleAdd = () => {
        dispatch(increaseItemquantity(pizzaId))
    }
    const handleDelete = () => {
        dispatch(decreaseItemquantity(pizzaId))
    }
    return (
        <div className='flex gap-2 items-center md:gap-3'>
            <Button type='round' onClick={handleDelete} >-</Button>
            <span className='text-sm font-medium ' > {currentQuantity} </span>
            <Button type='round' onClick={handleAdd} >+</Button>
        </div>
    )
}
