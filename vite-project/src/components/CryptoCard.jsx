import { Card } from 'antd';

function CryptoCard(props) {

  const { currency } = props

  return (
        <Card
            title={
                <div className="flex items-center">
                    <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`} hspace="15px"/>
                    <span>{currency.name}</span>
                </div>
            }
            style={{
                width: 300,
            }}
        >

              <p>Текущая цена: {Math.round(currency.price)} $</p>
              <p>Текущий ID: {currency.id}</p>
              <p>Последнее обновление: {new Date(currency.last_updated).toLocaleString()} </p>

        </Card>
  )
}

export default CryptoCard
