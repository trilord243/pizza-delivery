
import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, getCart, getCartItems, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


const styleInput = "mb-5 flex gap-2 flex-col sm:flex-row sm:items-center"
const styleLabel = "sm:basis-40"



function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch()
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0
  const totalPrice = totalCartPrice + priorityPrice
  const navigate = useNavigation();
  const isSubmiting = navigate.state === 'submitting'

  const { name, status: addresStatus, position, address, error: errorAddress } = useSelector((state) => state.user)

  const isLoadingAddress = addresStatus === 'loading'

  const formErrors = useActionData()
  const cart = useSelector(getCart);



  if (!cart.length) return <EmptyCart />
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8" >Ready to order? Lets go!</h2>


      <Form method="POST"  >
        <div className={styleInput} >
          <label className={styleLabel} >First Name</label>
          <input defaultValue={name} className="input w-full " type="text" name="customer" required />
        </div>

        <div className={styleInput} >
          <label className={styleLabel}>Phone number</label>
          <div className="grow" >
            <input className="input w-full " type="tel" name="phone" required />
            {formErrors?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md" >{formErrors.phone}</p>}
          </div>
        </div>

        <div className={styleInput + ' ' + 'relative'} >
          <label className={styleLabel}>Address</label>
          <div className="grow">
            <input defaultValue={address} className="input w-full" type="text" name="address" required disabled={isLoadingAddress} />
          </div>
          {!position.latitude && <span className="absolute right-[3px] z-5">

            <Button disabled={isLoadingAddress} type='small' onClick={(e) => { e.preventDefault(); dispatch(fetchAddress()) }}>asda</Button>
          </span>}
        </div>

        <div className="mb-12  flex gap-5 items-center " >
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
          {addresStatus === 'error' && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md" > {errorAddress}</p>}
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude ? `${position.latitude},${position.longitude}` : ''} />
          <Button type='primary' disabled={isSubmiting} >{isSubmiting ? 'Placing order...' : ` Order now for ${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  }

  console.log(data)

  const errors = {}
  if (!isValidPhone(order.phone)) {
    errors.phone = "Invalid phone number"
  }
  if (Object.keys(errors).length > 0) return errors



  const newOrder = await createOrder(order)

  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)

}

export default CreateOrder;
