import SignOutButton from "@/components/sign-out";
import withAuthGuard from "@/utils/guard";
import { signOut } from "@/app/actions/sign-out";
import { AddRecipeButton, AddRecipeCard }from "@/components/add-button";
import { ViewRecipeModal } from "@/components/view-recipe-modal";

import "@/app/globals.css";
import { getAuthClient } from "@/utils/nhost";
import { GetRecipes, NewRecipe } from "@/app/actions/recipes";

import Link from "next/link";

// Used to split time into hours and minutes. 
const ParseTime = (time) => {
  const hours =  Math.floor(time / 60);
  const minutes = time - hours*60;

  return {hours, minutes};
}

// Individual recipe card for each displayed recipe. 
const RecipeItem = async ({auth, entry, image}) => {

  // Get the time for displaying on the card. 
  let time;
  const { hours, minutes } = ParseTime(entry.details.cooking_minutes);

  // Generate an image url for each recipe's image. 
  let image_url = auth.storage.getPublicUrl({fileId: image});

  if (hours > 0 && minutes == 0)
    time = <h1>{hours} {hours == 1 ? "hour" : "hours"}</h1>
  else if (hours > 0 && minutes > 0)
    time = <h1>{hours} {hours == 1 ? "hour" : "hours"} {minutes} {minutes == 1 ? "minute" : "minutes"}</h1>
  else if (hours == 0 && minutes > 0)
    time = <h1>{minutes} {minutes == 1 ? "minute" : "minutes"}</h1>

  // Define the structure of the card. 
  return (
    <div className="overflow-hidden relative border-solid border border-recipe-orange p-4">
        {image != null ?
           <img src={image_url} className="w-full h-48 object-cover rounded-md"/>
           :
           <div className="w-full h-48 rounded-md bg-recipe-orange"/>
        }
        
        <div className="rounded-b-md border-t border-solid border-recipe-orange mt-4 h-28">
          <div className=" flex flex-col justify-evenly h-full">
          <span className="font-bold text-recipe-orange text-xl">{entry.title == "" ? "Untitled Recipe" : entry.title}</span>
          <span className="block text-gray-500 text-sm">{time}</span>
          </div>
        </div>
    </div>

  )
}

// Recipe cards are shown in a larger component that contains everything on the page. 
const Recipes = async () => {

  const auth = await getAuthClient();

  // Get recipe data from the server. 
  const { recipes, _ } = await GetRecipes();

  // Show recipes for a user if recipes actually exist. 
  if ( recipes[0] ){

    // Constructs the recipe view page, creating a recipe card and a view button for each one. 
    return ( 
      <div className="bg-recipe-tan h-auto min-h-screen w-screen">
        <div className="px-6 flex justify-between py-2">
          <h1 className="text-4xl font-bold text-recipe-orange my-auto"><i>RECIPE DROP</i></h1>
            <div className="px-6 py-4">
              <h1 className="text-xl text-recipe-orange"><i>Click a recipe to edit.</i></h1>
            </div>
          <div>
            <div className="hidden sm:inline">
              <AddRecipeButton />
            </div>
              
            <SignOutButton signOut={signOut}/>
          </div>
          
        </div>
        
        
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-screen px-6 pb-6 no-scrollbar">
          <div className="inline sm:hidden">
            <AddRecipeCard />
          </div>
          
          {recipes && recipes.reverse().map((entry) => (
            <div>
              <Link href={"edit/" + entry.id} key={entry.id}>
                <RecipeItem auth={auth} entry={entry} key={entry.id} image={entry.image}/>
              </Link>
              <ViewRecipeModal entry={entry} />
            </div>
          ))}
        </div>
        
      </div>
    );
  }

  // If a user has no recipes, instruct them to create recipes. 
  else{
    return (
      <div className="bg-recipe-tan h-auto min-h-screen w-screen">
        <div className="px-6 flex justify-between py-2">
          <h1 className="text-4xl font-bold text-recipe-orange my-auto"><i>RECIPE DROP</i></h1> 
          <div>
            <div className="hidden sm:inline">
              <AddRecipeButton />
            </div>
              
            <SignOutButton signOut={signOut}/>
          </div>
          
        </div>
          <div className="px-6 py-4">
                <h1 className="text-l font-bold text-recipe-orange"><i>No recipes found! Create one using the "Add Recipe" button.</i></h1>
          </div>

      </div>
    );
  }
}

export default withAuthGuard(Recipes);