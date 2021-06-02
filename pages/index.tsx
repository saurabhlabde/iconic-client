import Head from "next/head";
import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { nanoid } from "nanoid";

// component
import { Input } from "../components/input";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { MessageCard } from "../components/message";

interface ITodo {
  id: string;
  text: string;
}
const EXCHANGE_RATES = gql`
  query GetExchangeRates {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const Home = () => {
  const [Data, setData] = useState([]);
  const [currency, setCurrency] = useState("");
  const [rate, setRate] = useState("");

  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  useEffect(() => {
    if (data?.rates) {
      if (data.rates.length >= 20) {
        setData(data.rates.slice(0, 20));
      } else {
        setData(data.rates);
      }
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const currencyValueChangeHandel = (e: any): void => {
    const val: string = e.target.value;
    setCurrency(val);
  };

  const rateValueChangeHandel = (e: any): void => {
    const val: string = e.target.value;
    setRate(val);
  };

  const editClickHandel = (currency: string) => {};

  const removeClickHandel = (currency: string) => {};

  const addHandel = (e: any) => {
    e.preventDefault();
    if (rate?.trim() !== "" && currency?.trim() !== "") {
      const findCurrency = Data?.find((fc) => {
        return fc.currency === currency;
      });

      if (!findCurrency) {
      } else {
      }
    }
  };

  const messageCloseHandel = () => {};

  return (
    <div>
      <Head>
        <title>Iconic Currency | Home</title>
        <meta name="description" content="Iconic Todo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="app-main-section">
        <div className="app-section">
          <div className="heading-section">
            <h1 className="top-heading">Add currency</h1>
          </div>

          <div className="add-input-section">
            <form className="form-add" onSubmit={addHandel}>
              <Input
                value={currency}
                inputName="currency"
                placeHolder={"currency"}
                onChange={currencyValueChangeHandel}
              />

              <Input
                value={rate}
                inputName="rate"
                placeHolder={"rate"}
                onChange={rateValueChangeHandel}
              />
              <Button buttonName="add" />
            </form>
          </div>

          <div className="cards-section">
            <div className="tc-heading-section">
              <h1 className="tc-heading">Top currency</h1>
            </div>
            {Data?.map((val, i) => {
              return (
                <Card
                  key={i}
                  props={val}
                  onEditClick={editClickHandel}
                  onRemoveClick={removeClickHandel}
                />
              );
            })}
          </div>
        </div>
        <div className="messages-section">
          <MessageCard message="" onClose={messageCloseHandel} />
        </div>
      </main>
    </div>
  );
};

export default Home;
