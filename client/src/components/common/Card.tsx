import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div className="card w-full bg-white shadow-xl">
      <figure>
        <img
          src="https://ik.imagekit.io/tvlk/blog/2021/01/Rendang-shutterstock_1688672800-1024x682.jpeg?tr=dpr-2,w-675"
          alt="Image"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Rendang</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <Link to={'/recipe/1/detail'} className="btn btn-warning">Take a Look</Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
