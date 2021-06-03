import Head from "next/head";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useQuery, useMutation } from "@apollo/client";

// gql
import { TODOS_GQL } from "../gql/todos";
import { TODO_GQL } from "../gql/todo";
import { ADD_GQL } from "../gql/add";
import { UPDATE_GQL } from "../gql/update";
import { COMPLETED_GQL } from "../gql/completed";
import { REMOVE_GQL } from "../gql/remove";

// component
import { Loading } from "../components/loading";
import { ConfirmCard } from "../components/ConfirmCard";
import { Forms } from "../modules/form";
import { Cards } from "../modules/cards";
import { Messages } from "../modules/messages";

interface ITodo {
  id: string;
  text: string;
}

const Home = () => {
  const [hasLoading, setHasLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");

  const {
    data: todosData,
    loading: todosLoading,
    error: todosError,
  } = useQuery(TODOS_GQL);

  const [addTodo, { data: addedData }] = useMutation(ADD_GQL);
  const [updateTodo, { data: updateData }] = useMutation(UPDATE_GQL);
  const [removeTodo, { data: removeData }] = useMutation(REMOVE_GQL);
  const [completedTodo, { data: completedDate }] = useMutation(COMPLETED_GQL);

  useEffect(() => {
    if (todosData?.todos) {
      setData(todosData.todos);
    }
  }, [todosData]);

  useEffect(() => {
    setTimeout(() => {
      setHasLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (removeData?.removeTodo) {
      location.reload();
    }
  }, [removeData]);

  useEffect(() => {
    if (addedData?.addTodo) {
      setValue("");
      location.reload();
    }
  }, [addedData]);

  if (hasLoading) return <Loading />;

  const valueChangeHandel = (e: any): void => {
    const val: string = e.target.value;
    setValue(val);
  };

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
    }

    addTodo({
      variables: {
        text: value,
      },
    });
  };

  const editHandel = (id: string) => {};

  const removeHandel = (id: string) => {
    console.log(id, "id");

    if (id) {
      removeTodo({
        variables: {
          id: id,
        },
      });
    } else {
      setMessages((preMessage) => {
        return [
          ...preMessage,
          {
            id: nanoid(),
            message: "Todo can't be update",
          },
        ];
      });
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

        {messageLength && (
          <div className="messages-section">
            <Messages messages={messages} onMessageClose={messageCloseHandel} />
          </div>
        )}
        {/* <ConfirmCard
          message={"You want to remove this todo"}
          confirmButtonText="Remove"
          onCancel={() => {}}
          onConfirm={() => {}}
        /> */}
      </main>
    </div>
  );
};

export default Home;
