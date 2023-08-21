import Cooking from "../../assets/cooking.svg";
const Banner = () => {
  return (
    <div className="bg-warning rounded-box h-44 lg:h-96">
      <div className="flex justify-between lg:justify-around items-center">
        <div className="lg:space-y-6 space-y-2">
          <p className="lg:text-lg text-xs ml-5 mb-2 uppercase">Save and learn</p>
          <h1 className="lg:text-4xl text-xs ml-5 font-semibold uppercase">
            Search For Recipes Easily with FqRecipe
          </h1>
          <button className="btn lg:btn-sm btn-xs  ml-4 btn-warning border border-neutral">
            Search Recipe
          </button>
        </div>
        <img src={Cooking} className="lg:h-96 h-44 lg:w-96 w-44" />
      </div>
    </div>
  );
};

export default Banner;
