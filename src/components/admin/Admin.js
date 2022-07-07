// import Ordering from "./Ordering";
import Ordering from "./Ordering_new";
import useStore from "../../store/useStore";

const Admin = () => {
  const currentUser = useStore((state) => state.currentUser);

  return <>{currentUser ? <Ordering /> : "This area is for logged in users only"}</>;
};

export default Admin;
