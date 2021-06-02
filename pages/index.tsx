import Head from "next/head";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { client } from "./_app";
import { useQuery } from "@apollo/client";
import { TODOS_GQL } from "../gql/todos";

// component
import { Input } from "../components/input";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { MessageCard } from "../components/message";

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

  const editClickHandel = (id: string) => {};

  const removeClickHandel = (id: string) => {};

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

    // setCurrency("");
    // setRate("");
    // setMessages([]);
  };

  const messageCloseHandel = (id: string) => {
    if (id) {
      const filterMessages = messages.filter((message) => {
        return message.id.toString() !== id.toString();
      });

      setMessages(filterMessages);
    }
  };

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
            <form className="form-add" onSubmit={addHandel}>
              <Input
                value={value}
                inputName="value"
                placeHolder={"Add what's in your mind"}
                onChange={valueChangeHandel}
              />
              <Button buttonName="add" />
            </form>
          </div>

          <div className="cards-section">
            <div className="tc-heading-section">
              <h1 className="tc-heading">Added todo</h1>
            </div>
            {Data?.map((val, i) => {
              return (
                <Card
                  key={i}
                  props={val}
                  count={i}
                  onEditClick={editClickHandel}
                  onRemoveClick={removeClickHandel}
                />
              );
            })}
          </div>
        </div>

        {messages.length >= 1 && (
          <div className="messages-section">
            {messages?.map((message) => {
              return (
                <MessageCard
                  key={message.id}
                  id={message.id}
                  message={message.message}
                  onClose={messageCloseHandel}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
