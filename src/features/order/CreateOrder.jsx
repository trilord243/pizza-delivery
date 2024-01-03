
import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


const styleInput = "mb-5 flex gap-2 flex-col sm:flex-row sm:items-center"
const styleLabel = "sm:basis-40"

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigate = useNavigation();
  const isSubmiting = navigate.state === 'submitting'


  const formErrors = useActionData()
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8" >Ready to order? Let's go!</h2>

      <Form method="POST"  >
        <div className={styleInput} >
          <label className={styleLabel} >First Name</label>
          <input className="input w-full " type="text" name="customer" required />
        </div>

        <div className={styleInput} >
          <label className={styleLabel}>Phone number</label>
          <div className="grow" >
            <input className="input w-full " type="tel" name="phone" required />
            {formErrors?.phone && <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md" >{formErrors.phone}</p>}
          </div>
        </div>

        <div className={styleInput} >
          <labe className={styleLabel}>Address</labe>
          <div className="grow">
            <input className="input w-full" type="text" name="address" required />
          </div>
        </div>

        <div className="mb-12  flex gap-5 items-center " >
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
          // value={withPriority}
          // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type='primary' disabled={isSubmiting} >{isSubmiting ? 'Placing order...' : ' Order now'}</Button>
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
    priority: data.priority === "on",
  }

  const errors = {}
  if (!isValidPhone(order.phone)) {
    errors.phone = "Invalid phone number"
  }
  if (Object.keys(errors).length > 0) return errors

  //fine

  const newOrder = await createOrder(order)


  return redirect(`/order/${newOrder.id}`)

}

export default CreateOrder;
