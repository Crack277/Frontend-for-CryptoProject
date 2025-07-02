import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Spin } from 'antd';
import axios from "axios";
import { useState, useEffect } from "react";
import CryptoCard from "./components/CryptoCard.jsx";
import * as React from "react";

// Функция создает объект элемента меню
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

// Компонент приложения
function App() {

  const [currencies, setCurrencies] = useState([])
  const [currencyId, setCurrencyId] = useState(1)
  const [currencyData, setCurrencyData] = useState()


  const fetchCurrencies = () => {
      axios.get("http://127.0.0.1:8000/currencies").then(r => {
          const currenciesResponse = r.data
          const menuItems = [
              getItem("Список криптовалют", "g1", "null",
                  currenciesResponse.map(c => {
                    return {label: c.name, key: c.id}
                  }),
                  "group"
              )
          ]
          setCurrencies(menuItems)
      })
  }

  const fetchCurrency = () => {
      axios.get(`http://127.0.0.1:8000/currencies/${currencyId}`).then(r => {
          setCurrencyData(r.data)
      })
  }


  useEffect(() => {
      fetchCurrencies()
  }, []);

  useEffect(() => {
      fetchCurrency()
  }, [currencyId]);

  const onClick = (e) => {
    setCurrencyId(e.key)
  };

  return (
      <div className="flex">
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]} // Всегда раскрываем первый подраздел   // Это гарантирует, что меню не свернется автоматически
          mode="inline"
          items={currencies}
          className="h-screen overflow-scroll"
        />
        <div className="mx-auto my-auto">
                {currencyData ? <CryptoCard currency={currencyData}/> : <Spin size="large"/>}
        </div>
      </div>
  );
}

export default App;