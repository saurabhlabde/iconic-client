import Head from "next/head";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useQuery } from "@apollo/client";
import { TODOS_GQL } from "../gql/todos";

// component
import { Forms } from "../modules/form";
import { Cards } from "../modules/cards";
import { Messages } from "../modules/messages";

interface ITodo {
  id: string;
  text: string;
}

const Home = () => {
  const [Data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  const {
    data: todosData,
    loading: todosLoading,
    error: todosError,
  } = useQuery(TODOS_GQL);

  useEffect(() => {
    if (todosData?.todos) {
      setData(todosData.todos);
    }
  }, [todosData]);

  if (todosLoading) return <h1>Loding...</h1>;
  if (todosError) return <h1>Error :[ </h1>;

  const valueChangeHandel = (e: any): void => {
    const val: string = e.target.value;
    setValue(val);
  };

  const editHandel = (id: string) => {};

  const removeHandel = (id: string) => {};

  const addHandel = (e: any) => {
    e.preventDefault();

    if (value?.trim() === "") {
      setMessages((preMessage) => {
        return [
          ...preMessage,
          {
            id: nanoid(),
            message: "Todo can't be empty",
          },
        ];
      });
      return;
    }
  };

  const messageCloseHandel = (id: string) => {
    if (id) {
      const filterMessages = messages.filter((message) => {
        return message.id.toString() !== id.toString();
      });

      setMessages(filterMessages);
    }
  };

  const dataLength = Data.length >= 1;
  const messageLength = messages.length >= 1;

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
            <h1 className="top-heading">Add todo</h1>
          </div>

          <div className="add-input-section">
            <Forms
              value={value}
              onValueChange={valueChangeHandel}
              onSubmit={addHandel}
            />
          </div>

          {dataLength && (
            <div className="cards-section">
              <div className="tc-heading-section">
                <h1 className="tc-heading">Added todo</h1>
              </div>

              <Cards
                props={Data}
                onEditClick={editHandel}
                onRemoveClick={removeHandel}
              />
            </div>
          )}
        </div>

        {messageLength && <div className="messages-section"></div>}
      </main>
    </div>
  );
};

export default Home;
