import React from "react";

export const Features = () => {
  return (
    <section id="features" className="bg-zinc-900 text-white py-20">
      <h2 className="font-heading font-black text-5xl md:text-6xl lg:text-7xl text-center mt-4 max-w-3xl mx-auto">
        Features
      </h2>

      {/* Track Expenses */}
      <div className="mb-12 text-center">
        <h3 className="uppercase font-extrabold text-center text-zinc-500 tracking-wider">
          Track Your Expenses
        </h3>
        <p className="text-center text-xl md:text-2xl mt-6 text-zinc-400 max-w-xl mx-auto">
          Quickly add your expenses and categorize them to understand where your
          money is going.
        </p>
      </div>
      <div className="mb-12 text-center">
        <h3 className="uppercase text-2xl  text-center text-white  tracking-wider">
          View Your Spending
        </h3>
        <p className="text-center text-xl md:text-2xl mt-6 text-zinc-400 max-w-xl mx-auto">
          Get insights on your spending habits with easy-to-read charts and
          graphs.
        </p>
        {/* Insert example graph component here */}
      </div>

      {/* Budget Goals */}
      <div className="mb-12 text-center">
        <h3 className="uppercase text-2xl  text-center text-white tracking-wider">
          Set Budget Goals
        </h3>
        <p className="text-center text-xl md:text-2xl mt-6 text-zinc-400 max-w-xl mx-auto">
          Set monthly spending limits and track how much you’ve spent towards
          each goal.
        </p>
        {/* Insert progress bar component here */}
      </div>
    </section>
  );
};
