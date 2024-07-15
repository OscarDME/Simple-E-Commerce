import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { ProductsContext } from "../components/ProductsContext";

const CheckoutPage = () => {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);

  const [productsInfo, setProductsInfo] = useState([]);

  useEffect(() => {
    const uniqueIds = [...new Set(selectedProducts)];

    fetch("/api/products?ids=" + uniqueIds.join(","))
      .then((res) => res.json())
      .then((json) => setProductsInfo(json));
  }, [selectedProducts]);

  const moreOfThisProduct = (id) => {
    setSelectedProducts(prev => [...prev, id])
  } 

  const lessOfThisProduct = (id) => {
    const pos = selectedProducts.indexOf(id);
    if(pos !== -1){
      setSelectedProducts(prev => {
        return prev.filter((value, index) => index!== pos);
      });
    }
  }


  return (
    <Layout>
      {!productsInfo.length && <div>No products in your shopping cart</div>}
      {productsInfo.length &&
        productsInfo.map((productsInfo) => (
          <div className="flex mb-5">
            <div className="bg-gray-100 p-3 rounded-xl shrink-0">
              <img
                className="w-24 h-24"
                src={productsInfo.picture}
                alt="product"
              />
            </div>
            <div className="pl-4">
              <h2 className="font-bold text-lg">{productsInfo.name}</h2>
              <p className="text-sm leading-4 text-gray-600">
                {productsInfo.description}
              </p>
              <div className="flex mt-3">
                <div className="grow">${productsInfo.price}</div>
                <div>
                  <button onClick = {() => lessOfThisProduct(productsInfo._id)} className="border border-emerald-500 px-2 rounded-lg text-emerald-500">
                    -
                  </button>
                  <span className = "px-2">
                    {
                      selectedProducts.filter((id) => id === productsInfo._id)
                        .length
                    }
                  </span>
                  <button onClick = {() => moreOfThisProduct(productsInfo._id)} className="bg-emerald-500 px-2 rounded-lg text-white">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
    </Layout>
  );
};

export default CheckoutPage;
