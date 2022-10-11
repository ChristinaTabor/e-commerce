import React, { useEffect, useState } from "react";
import ThemeSettings from "../components/customizer/theme-settings";
import "../public/assets/scss/app.scss";
import { ToastContainer } from "react-toastify";
import TapTop from "../components/common/widgets/Tap-Top";
import CartContextProvider from "../helpers/cart/CartContext";
import { WishlistContextProvider } from "../helpers/wishlist/WishlistContext";
import FilterProvider from "../helpers/filter/FilterProvider";
import SettingProvider from "../helpers/theme-setting/SettingProvider";
import { CurrencyContextProvider } from "../helpers/Currency/CurrencyContext";
import Helmet from "react-helmet";
import { getUser } from "../services/api/user.service";
import { getAll, buckets, CAT_ID } from "../services/api/data.service";
import UserContext from "../helpers/user/UserContext";
import CommonContext from "../helpers/common/CommonContext";
import FilterDataContext from "../helpers/filter-data/FilterDataContext";
import {
  getBrands,
  getColors,
  getProducts,
  getSizes,
} from "../services/api/shop.service";

export default function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [commonData, setCommonData] = useState();
  const [filterData, setFilterData] = useState();

  useEffect(async () => {
    let common = await getAll(buckets.COMMON, {
      queryParams: {
        filter: { "category._id": CAT_ID },
      },
    })
      .catch((err) => {
        localStorage.clear();
        router.push('');
      })
      .then((res) => {
        return res[0];
      });

    if (common.theme) {
      let element = document.getElementsByTagName("body")[0];
      element.classList.add(common.theme);
    }

    setCommonData(common);

    let userId = localStorage.getItem("userId");

    if (userId) {
      let userData = await getUser(userId, {
        queryParams: { relation: ["orders.products.product", "addresses"] },
      }).catch((err) => {
        console.log(err);
      });
      setUser(userData);
    }

    let timer = setTimeout(function () {
      setIsLoading(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(async () => {
    const colors = await getColors();
    const sizes = await getSizes();
    const brands = await getBrands();
    const newProducts = await getProducts({
      queryParams: {
        relation: true,
        filter: { new: true, "category._id": CAT_ID },
      },
    });

    setFilterData({ colors, sizes, brands, newProducts });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader-wrapper">
          <div className="loader"></div>
        </div>
      ) : (
        <CommonContext.Provider
          value={{
            commonData,
            setCommonData,
          }}
        >
          <FilterDataContext.Provider
            value={{
              filterData,
            }}
          >
            <UserContext.Provider
              value={{
                user,
                setUser,
              }}
            >
              <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>E-commerce React Template</title>
              </Helmet>
              <div>
                <SettingProvider>
                  <CurrencyContextProvider>
                    <CartContextProvider>
                      <WishlistContextProvider>
                        <FilterProvider>
                          <Component {...pageProps} />
                        </FilterProvider>
                      </WishlistContextProvider>
                    </CartContextProvider>
                  </CurrencyContextProvider>
                  {/* <ThemeSettings /> */}
                </SettingProvider>
                <ToastContainer />
                <TapTop />
              </div>
            </UserContext.Provider>
          </FilterDataContext.Provider>
        </CommonContext.Provider>
      )}
    </>
  );
}
