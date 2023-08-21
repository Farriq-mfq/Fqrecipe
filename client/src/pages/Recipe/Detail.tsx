import Grid from "../../components/common/Grid";

const DetailRecipe = () => {
  return (
    <Grid>
      <div className="flex lg:flex-row flex-col gap-5 mt-4">
        <div className="lg:w-3/5 w-full h-fit">
          <img
            className="rounded-box"
            src="https://ik.imagekit.io/tvlk/blog/2021/01/Rendang-shutterstock_1688672800-1024x682.jpeg?tr=dpr-2,w-675"
            alt="Image"
          />
        </div>
        <div className="lg:w-2/5 w-full h-fit space-y-2  p-2">
          <div className="flex">
            <div className="bg-warning uppercase px-4 py-2 rounded-box text-sm truncate">
              Junk Food
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <h1 className="font-bold text-2xl w-44 lg:w-auto flex-1 truncate">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis,
              reiciendis.
            </h1>
            <div className="bg-warning uppercase px-4 py-2 rounded-box text-sm truncate">
              Farriqmfq
            </div>
          </div>
          <p className="text-md text-gray-600">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore
            dolor, perferendis quas enim, officiis aliquid nulla expedita sed
            possimus ipsam similique deserunt fugiat eaque? Nobis fuga cumque
            aut maiores laborum. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Tempore dolor, perferendis quas enim, officiis
            aliquid nulla expedita sed possimus ipsam similique deserunt fugiat
            eaque? Nobis fuga cumque aut maiores laborum.
          </p>
          <div className="divider"></div>
          <div className="flex mt-4 space-x-4 flex-wrap">
            <div>
              <h4 className="text-gray-800 font-semibold mb-2">Dish</h4>
              <div className="bg-warning uppercase px-4 py-2 text-sm truncate">
                Breakfest
              </div>
            </div>
            <div>
              <h4 className="text-gray-800 font-semibold mb-2">Time Cook</h4>
              <div className="bg-warning uppercase px-4 py-2 text-sm truncate">
                1 Menit
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-2">
        <div className="divider"></div>
        <h3 className="text-lg font-bold uppercase -mt-3">Ingredients</h3>
        <div className="mt-2">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo,
            quibusdam.
          </p>
        </div>
        <div className="divider"></div>
        <h3 className="text-lg font-bold uppercase -mt-3">Instructions</h3>
        <div className="mt-2"   >
          <ol className="list-decimal ml-4 space-y-1">
            <li>sdfkndslkf</li>
            <li>sdfkndslkf</li>
            <li>sdfkndslkf</li>
            <li>sdfkndslkf</li>
            <li>sdfkndslkf</li>
            <li>sdfkndslkf</li>
          </ol>
        </div>
        <div className="divider"></div>
        <h3 className="text-lg font-bold uppercase -mt-3">Reviews</h3>
      </div>
    </Grid>
  );
};

export default DetailRecipe;
