import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import Button from "./Button";
function Home() {

  const name = useSelector((state) => state.user.userName)



  return (
    <div className=" px-4 my-10 sm:my-16  text-center">
      <h1 className=" text-xl font-semibold text-stone-700 mb-8 md:text-3xl " >
        The best pizza.
        <br />
        <span className="text-yellow-500">


          Straight out of the oven, straight to you.
        </span>
      </h1>
      {!name ? <CreateUser /> : <Button to='/menu' type='primary' >Start ordering {name} </Button>}
    </div>
  );
}

export default Home;
