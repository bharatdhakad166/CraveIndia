import { useNavigate } from "react-router-dom";

function Category({ img, name }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/MenuPage?category=${name.toLowerCase()}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer flex flex-col items-center p-4 rounded-xl hover:bg-orange-50 hover:scale-105 transition"
    >
      <img src={img} alt={name} className="h-16 w-16" />
      <p className="mt-2 font-medium">{name}</p>
    </div>
  );
}

export default Category;