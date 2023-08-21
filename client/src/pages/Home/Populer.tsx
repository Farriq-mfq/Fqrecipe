import Card from "../../components/common/Card";

const Populer = () => {
  return (
    <div className="px-2">
      <div className="flex justify-between items-center h-12">
        <h3 className="text-lg font-bold uppercase">Populer</h3>
        <a href="" className="text-warning text-sm">
          View more
        </a>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mt-3">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Populer;
