import AppLayout from "../AppLayout/AppLayout";
import { CutCornerButton } from "../Header/CutCornerButton";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <AppLayout>
      <p className="uppercase font-extrabold text-center text-zinc-500 tracking-wider">
        Introducing Monify
      </p>
      <h1 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl text-center mt-4 max-w-3xl mx-auto">
        Where Spending Meets Control
      </h1>
      <p className="text-center text-xl md:text-2xl mt-6 text-zinc-400 max-w-xl mx-auto">
        Monify is Your Daily Solution for Money Management, Helping You Build
        Better Financial Habits.
      </p>
      <div className="flex justify-center mt-10">
        <Link to="/add-expense">
          <CutCornerButton>Get Started</CutCornerButton>
        </Link>
      </div>
    </AppLayout>
  );
};

export default Home;
