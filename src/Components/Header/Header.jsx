// import { Link } from "react-router-dom";
// import { FaDollarSign } from "react-icons/fa";

// export const Header = () => {
//   return (
//     <div className="h-32 flex justify-between items-center px-6 bg-black text-white font-caveat text-2xl">
//       {/* Logo Section */}
//       <Link to="/">
//         <div className="flex items-center text-3xl">
//           Track <FaDollarSign className="text-white size-8 " />{" "}
//         </div>
//       </Link>

//     </div>
//   );
// };

// export default Header;
import { useState } from "react";
import { Link } from "react-router-dom";
import { CutCornerButton } from "./CutCornerButton";
// import AddExpense from "../AddExpense/AddExpense";
// import EditExpense from "../EditExpense/EditExpense"

export const Header = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-40 bg-zinc-900/50 backdrop-blur-lg">
      <div className="container">
        <div className="flex justify-between items-center h-24 md:h-28">
          <div className="font-heading ml-24 text-4xl text-purple-600 font-bold">
            <h1>
              <Link to={"/"}>MONIFY </Link>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
              {!isMenuOpen ? (
                // Hamburger icon
                <div className="size-10 relative">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-5 h-0.5 bg-zinc-300 -translate-y-1"></div>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-5 h-0.5 bg-zinc-300 translate-y-1"></div>
                  </div>
                </div>
              ) : (
                // Close (X) icon when menu is open
                <div className="size-10 relative cursor-pointer">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-5 h-0.5 bg-zinc-300 rotate-45 translate-x-1.5"></div>
                  </div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-5 h-0.5 bg-zinc-300 -rotate-45 translate-x-1.5"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Links visible on large screens */}
            <div className="flex gap-4 items-center">
              <Link to="/features">
                <CutCornerButton className="hidden md:inline-flex">
                  About
                </CutCornerButton>
              </Link>
              <Link to="/add-expense">
                <CutCornerButton className="hidden md:inline-flex">
                  Add Expense
                </CutCornerButton>
              </Link>
              <Link to="/list">
                <CutCornerButton className="hidden md:inline-flex">
                  Expense List
                </CutCornerButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Menu on small screens */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden absolute left-0 right-0 bg-zinc-900 text-white p-4 flex flex-col gap-4`}
      >
        <Link to="/" onClick={toggleMenu}>
          <CutCornerButton>About</CutCornerButton>
        </Link>
        <Link to="/add-expense" onClick={toggleMenu}>
          <CutCornerButton>Add Expense</CutCornerButton>
        </Link>
        <Link to="/list" onClick={toggleMenu}>
          <CutCornerButton>Expense List</CutCornerButton>
        </Link>
      </div>
    </header>
  );
};

export default Header;
