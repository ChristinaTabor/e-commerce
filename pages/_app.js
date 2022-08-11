import React, { useEffect, useState, useContext } from "react";
import ThemeSettings from "../components/customizer/theme-settings";
import "../public/assets/scss/app.scss";
import { ToastContainer } from "react-toastify";
import TapTop from "../components/common/widgets/Tap-Top";
import CartContextProvider from "../helpers/cart/CartContext";
import { WishlistContextProvider } from "../helpers/wishlist/WishlistContext";
import FilterProvider from "../helpers/filter/FilterProvider";
import SettingProvider from "../helpers/theme-setting/SettingProvider";
import { CompareContextProvider } from "../helpers/Compare/CompareContext";
import { CurrencyContextProvider } from "../helpers/Currency/CurrencyContext";
import Helmet from "react-helmet";
import Router from "next/router";
import { getUser } from "../services/api/user.service";
import { getAll, buckets, FASHION_CAT_ID } from "../services/api/data.service";
import UserContext from "../helpers/user/UserContext";
import CommonContext from "../helpers/common/CommonContext";

export default function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [commonData, setCommonData] = useState();
  // Router.events.on('routeChangeStart', (url) => {
  //   console.log("START")
  //   setIsLoading(true)
  // })

  // Router.events.on('routeChangeComplete', (url) => {
  //   console.log("END")
  //   setIsLoading(false)
  // })

  useEffect(async () => {
    let common = await getAll(buckets.COMMON, {
      queryParams: {
        filter: { "category._id": FASHION_CAT_ID },
      },
    }).then((res) => {
      return res[0];
    });

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
          <UserContext.Provider
            value={{
              user,
              setUser,
            }}
          >
            <Helmet>
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Multikart - Multi-purpopse E-commerce React Template</title>
            </Helmet>
            <div>
              <SettingProvider>
                <CompareContextProvider>
                  <CurrencyContextProvider>
                    <CartContextProvider>
                      <WishlistContextProvider>
                        <FilterProvider>
                          <Component {...pageProps} />
                        </FilterProvider>
                      </WishlistContextProvider>
                    </CartContextProvider>
                  </CurrencyContextProvider>
                  <ThemeSettings />
                </CompareContextProvider>
              </SettingProvider>
              <ToastContainer />
              <TapTop />
            </div>
          </UserContext.Provider>
        </CommonContext.Provider>
      )}
    </>
  );
}
