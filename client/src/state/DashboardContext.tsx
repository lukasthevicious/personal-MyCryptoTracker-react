import { createContext, useState } from "react";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import axios from "axios";
import { DashboardCryptoItem } from "../common/modelTypes";

interface AppContextInterface {
  setDashboardData: Dispatch<SetStateAction<DashboardCryptoItem[]>>;
  getDashboardData: () => void;
  dashboardData: DashboardCryptoItem[];
}

const DashboardContext = createContext<AppContextInterface | null>(null);

export const DashboardContextProvider: React.FC<{
  children: any;
}> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<DashboardCryptoItem[]>([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false&price_change_percentage=24h";

  const getDashboardData = () => {
    axios
      .get(url)
      .then((res) => {
        const rawData = res.data;
        //Uložím jen některá data z celého objektu.
        const reducedData = rawData.map((item: any) => ({
          identifier: item.id,
          name: item.name,
          ticker: item.symbol,
          imageURL: item.image,
          current_price: item.current_price,
          market_cap: item.market_cap,
          price_change_24h: item.price_change_24h,
          price_change_percentage_24h: item.price_change_percentage_24h,
          last_updated: item.last_updated,
          allTimeHigh: item.ath,
        }));
        setDashboardData(reducedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <DashboardContext.Provider
      value={{
        setDashboardData,
        getDashboardData,
        dashboardData,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardContext;
