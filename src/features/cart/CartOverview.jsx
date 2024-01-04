import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
function CartOverview() {
  const totalQuantity = useSelector(getTotalCartQuantity)
  const totalPrice = useSelector(getTotalCartPrice)
  if (!totalQuantity) return null
  return (
    <div className="bg-stone-800 text-stone-200 uppercase p-4 sm:px-6  flex items-center justify-between " >
      <p className="text-stone-300 font-semibold space-x-4  sm:space-x-6 ">
        <span>{totalQuantity} pizzas</span>
        <span>{totalPrice}$</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
