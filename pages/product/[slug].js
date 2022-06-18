import React, { useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@mantine/core";
import { ShoppingCart, ArrowLeft } from "tabler-icons-react";
import Head from "next/head";
import { fetchTheProduct } from "../../utils/DatabaseFuntions";
import { useDispatch, useSelector } from "react-redux";
import {
  setTheCart,
  selectecart,
  selecteErrorMsgVal,
} from "../../Redux/features/ProductSlice";
import { AddProductToCart } from "../../utils/DatabaseFuntions";
import Cookies from "js-cookie";
import { data } from "../../utils/data";

const Slug = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector(selectecart);
  const Error = useSelector(selecteErrorMsgVal);
  const [checkVal, setCheckVal] = useState(0);
  const [imageUrlIndex, setimageUrlIndex] = useState(0);

  useEffect(() => {
    Cookies.set("cart", JSON.stringify(cart));
  }, [cart]);

  if (!product) {
    <h1>product not founded</h1>;
  }

  const CheckActiveImg = (index) => {
    if (imageUrlIndex == index) return " activeImg";
    else return "";
  };

  // useLayoutEffect(() => {
  //   const fetchData = async () => {
  //     if (checkVal > 0) {
  //       if (Error.status) {
  //         alert(Error.message);
  //       } else {
  //         let data = {
  //           ...product,
  //           productname: product.name,
  //         };

  //         await AddProductToCart(data);
  //         router.push(`${process.env.NEXT_PUBLIC_HOSTING_URL}/cart`);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [checkVal]);

  const AddToCart = async () => {
    dispatch(setTheCart(product));
    alert("added");
    // setCheckVal(checkVal + 1);
  };

  console.log("error", Error);

  return (
    <>
      <Head>
        <title>{product?.name + "-"} shopfi</title>
      </Head>
      <section className="text-gray-600 body-font overflow-hidden relative">
        <div className="fixed top-[120px] left-5 lg:left-14 z-10">
          <Button
            className="w-12 h-12 !p-0 cursor-pointer !m-0 bg-green-100 hover:bg-green-200 text-green-600 text-2xl rounded-full"
            onClick={() => router.back()}
          >
            <ArrowLeft strokeWidth={2} />
          </Button>
        </div>

        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="flex-1">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full lg:h-[400px] h-64 object-contain object-center rounded mx-auto"
                src={product?.images[imageUrlIndex].url}
              />

              <div className="flex items-center justify-center mt-5 lg:mt-0 gap-3 flex-wrap w-[100%]">
                {product?.images.map((imageUrl, index) => {
                  return (
                    <img
                      key={index}
                      alt="ecommerce"
                      className={`w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] object-cover object-center rounded hover:scale-95 transition-all duration-200 ease-out cursor-pointer ${CheckActiveImg(
                        index
                      )} `}
                      src={imageUrl.url}
                      onClick={() => setimageUrlIndex(index)}
                    />
                  );
                })}
              </div>
            </div>

            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {product?.brand}
              </h2>
              <h1 className="text-App_black_L text-3xl title-font font-medium mb-1">
                {product?.name}
              </h1>
              <div className="flex mt-3 mb-4">
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <p className="ml-1 text-sm font-bold text-App_black_L">
                    {product?.rating}
                  </p>
                  <span className="w-1 h-1 ml-2 bg-App_green_L rounded-full"></span>
                  <span className="text-App_black_L ml-3">
                    {product?.numReviews} Reviews
                  </span>
                </span>
              </div>
              <p className="leading-relaxed text-App_black_L">
                {product?.description}
              </p>
              {/* <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    <option>SM</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div> */}
              <div className="flex mt-7">
                <span className="title-font font-medium text-2xl text-App_green_L select-none">
                  ${product?.price}
                </span>
                <Button
                  radius="xl"
                  leftIcon={
                    <ShoppingCart size={22} strokeWidth={2} color={"white"} />
                  }
                  className="text-white bg-App_green_L h-12 text-lg px-6 outline-none hover:scale-110 transition-all duration-200 ease-out ml-auto hover:bg-App_green_D"
                  onClick={AddToCart}
                >
                  Add to Cart
                </Button>

                <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  const product = await fetchTheProduct(context.query.slug);
  console.log(product);

  return {
    props: { product },
  };
}

export default Slug;