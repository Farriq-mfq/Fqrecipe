import { useInfiniteQuery, useQuery } from "react-query";
import Card from "../../components/common/Card";
import FloatingButton from "../../components/common/FloattingButton";
import Grid from "../../components/common/Grid";
import SearchRecipe from "./Search";
import { PlusIcon } from "@heroicons/react/24/solid";
import { getRecipes } from "../../requests/recipe.request";

const Recipe = () => {
  const {} = useInfiniteQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });
  return (
    <Grid>
      <SearchRecipe />
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-3 px-2">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <FloatingButton Icon={PlusIcon} onPress={() => alert("ok")} />
    </Grid>
  );
};

export default Recipe;
