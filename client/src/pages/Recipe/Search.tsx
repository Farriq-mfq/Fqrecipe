const SearchRecipe = () => {
  return (
    <div className="px-2 flex items-center mt-3 space-x-2">
      <input type="text" className="input w-full input-bordered lg:max-w-lg border flex-1 float-right relative" placeholder="Search Recipe here" />
      <button className="btn btn-warning">Search</button>
    </div>
  );
};

export default SearchRecipe;
