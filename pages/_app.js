import React, { useEffect, useState } from "react";
import "../public/assets/scss/app.scss";
import { ToastContainer } from "react-toastify";
import TapTop from "../components/common/widgets/Tap-Top";
import CartContextProvider from "../helpers/cart/CartContext";
import { WishlistContextProvider } from "../helpers/wishlist/WishlistContext";
import FilterProvider from "../helpers/filter/FilterProvider";
import SettingProvider from "../helpers/theme-setting/SettingProvider";
import CurrencyContext from "../helpers/Currency/CurrencyContext";
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
import { userLogout } from "../services/api/user.service";

export default function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [commonData, setCommonData] = useState();
  const [filterData, setFilterData] = useState();
  const [selectedCurr, selectedCurrency] = useState({
    currency: "",
    symbol: "",
    value: 1,
  });



  useEffect(async () => {
    const common = await getAll(buckets.COMMON, {
      queryParams: {
        filter: { "category._id": CAT_ID },
        relation: true
      },
    })
      .then((res) => {
        return res[0];
      })
      .catch((err) => {
        if (err.statusCode == 401) {
          userLogout();
          location.reload()
        }
      })

    if (!common) {
      return;
    }

    if (common.theme) {
      let element = document.getElementsByTagName("body")[0];
      element.classList.add(common.theme);
    }

    setCommonData(common);
    setPrimaryCurrency(common.primary_currency);

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

  function setPrimaryCurrency(primaryCurrency) {
    const currencyStr = localStorage.getItem("currency");

    if (currencyStr && currencyStr != "undefined") {
      const currencyObj = JSON.parse(currencyStr)
      const currency = {
        currency: currencyObj.currency,
        symbol: currencyObj.symbol,
        value: currencyObj.value,
      }
      selectedCurrency(currency)
      return;
    }

    const currency = {
      currency: primaryCurrency.code,
      symbol: primaryCurrency.symbol,
      value: primaryCurrency.value,
    }
    selectedCurrency(currency)
    localStorage.setItem("currency", JSON.stringify(currency))
  }

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
                <title>One Fun For All </title>
              </Helmet>
              <div>
                <SettingProvider>
                  <CurrencyContext.Provider value={{
                    selectedCurr,
                    selectedCurrency,
                  }}
                  >
                    <CartContextProvider>
                      <WishlistContextProvider>
                        <FilterProvider>
                          <Component {...pageProps} />
                        </FilterProvider>
                      </WishlistContextProvider>
                    </CartContextProvider>
                  </CurrencyContext.Provider>
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
