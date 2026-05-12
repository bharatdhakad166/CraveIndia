import TrendingItems from '../components/TrendingItems.jsx'
import category from '../data/category.js'
import trendingItems from '../data/trendingItems.js'
import { Link, useNavigate } from "react-router-dom"
import herobg from '../assets/Images/hero-bg.png'

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="font-['Plus_Jakarta_Sans'] bg-[#fafafa]">


      <div className="flex items-center ">
        <img src={herobg} className='relative w-[100%] h-[44vw]'/>

        <div className="text-[1vw] py-24 absolute ml-14">
          <p className="text-[#ff5f2e] bg-[#ffefea] inline-block py-1 px-3 rounded-full border border-[#ffd2c4] text-xs tracking-widest">
            Premium Culinary Experience
          </p>

          <h1 className="text-5xl font-bold mt-4 leading-tight">
            Effortless luxury, <br /> delivered fast.
          </h1>

          <p className="mt-4 text-gray-600">
            Discover curated menus from top urban chefs.  
            High-end dining meets modern speed.
          </p>

          <Link to="/MenuPage">
            <button className="mt-6 bg-[#ff5f2e] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#e14e26] transition">
              Order Now
            </button>
          </Link>
        </div>
      </div>


      <div className="mt-10">
        <h1 className="text-3xl font-semibold px-6">
          Browse By Category
        </h1>

        <div className="flex gap-4 mt-6 pl-5 overflow-x-auto no-scrollbar px-1">

  {category.map((item, idx) => (
    <div
      key={idx}
      onClick={() =>
        navigate(`/MenuPage?category=${item.name.toLowerCase()}`)
      }
      className="min-w-[110px] cursor-pointer bg-white border border-gray-100 px-4 py-3 rounded-2xl flex flex-col items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#ff5f2e] transition-all duration-200 mt-2"
    >
      <img
        src={item.categoryImgs}
        className="h-10 w-10 object-contain"
      />

      <p className="mt-2 text-sm font-medium text-gray-700">
        {item.name}
      </p>
    </div>
  ))}

</div>
      </div>


      <div className="mt-8">

        <div className="flex justify-between items-center px-6">
          <h1 className="text-3xl font-semibold">
            Trending Items
          </h1>

          <Link
            to="/MenuPage"
            className="text-[#ff5f2e] font-medium hover:border-b-2 border-[#ff5f2e] px-2"
          >
            View All
          </Link>
        </div>

        <div className="flex gap-6 px-6 overflow-x-auto no-scrollbar pb-4">
          {trendingItems.map((items) => (
            <div className="min-w-[260px] mt-16" key={items.id}>
              <TrendingItems {...items} />
            </div>
          ))}
        </div>

      </div>

    </div>
  )
}

export default HomePage