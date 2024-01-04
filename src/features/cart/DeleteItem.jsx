
import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { deleteItem } from './cartSlice'
export default function DeleteItem({ pizzaId }) {


    const dispatch = useDispatch()
    const handleDeleteItem = () => {
        dispatch(deleteItem(pizzaId))
    }
    return (
        <Button onClick={handleDeleteItem} type='small'>Delete</Button>
    )
}
