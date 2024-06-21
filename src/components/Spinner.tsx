import { ImSpinner2 } from "react-icons/im";

function Spinner() {
  return (
    <div className="flex items-center justify-center text-center h-6 m-3">
      <ImSpinner2 size={30} className="animate-spin" />
    </div>
  );
}

export default Spinner;
