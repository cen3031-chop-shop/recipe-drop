import React from 'react';
import withAuthAsyncReverse from "@/utils/reverseguard";
import getAuthAsync from "@/utils/session";
import SignInRedirectButton from '@/components/sign-in-redirect';
import "@/app/globals.css";

// path to food image
const foodImage = 'food.png'; 

// define home component
const Home = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 flex flex-col justify-between">
 
        <div className="p-4">
  
        </div>

        {/* Middle content section */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl  font-bold text-recipe-orange">RECIPE DROP</h1>
          <h2 className="text-xl font-bold text-recipe-orange mt-4">The Next Up Recipe Book</h2>
          <p className="text-recipe-orange mt-4">Discover new flavors and store your creations!</p>
          <SignInRedirectButton className="mt-8 bg-orange-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-600 transition duration-300 ease-in-out" />
        </div>

        {/* Bottom image section */}
        <div className="w-full">
          <img src={foodImage} alt="Delicious food" className="w-full h-auto object-cover" />
        </div>
      </div>
    </div>
  );
};

export default withAuthAsyncReverse(Home);
