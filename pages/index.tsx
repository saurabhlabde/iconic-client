import Head from "next/head";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useQuery, useMutation } from "@apollo/client";

// gql
import { TODOS_GQL } from "../gql/todos";
import { ADD_GQL } from "../gql/add";
import { UPDATE_GQL } from "../gql/update";
import { COMPLETE_GQL } from "../gql/completed";
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

interface IAddHandel {
  e?: any;
  id?: string;
}

const Home = () => {
  const [hasLoading, setHasLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [valueType, setValueType] = useState({
    type: "add",
    id: null,
  });

  const [confirmPopUp, setConfirmPopUp] = useState({
    card: false,
    message: null,
    buttonText: null,
    id: null,
  });

  const {
    data: todosData,
    loading: todosLoading,
    error: todosError,
  } = useQuery(TODOS_GQL);

  const [addTodo, { data: addedData }] = useMutation(ADD_GQL, {
    update(client, { data: addData }) {
      const data: any = client.readQuery({
        query: TODOS_GQL,
      });

      const createTodo = addData?.addTodo;

      let typeName = {
        completed: createTodo.completed,
        createdAt: createTodo.createdAt,
        text: createTodo.text,
        updateAt: createTodo.updateAt,
        __typename: "Todo",
        _id: createTodo._id,
      };

      client.writeQuery({
        query: TODOS_GQL,
        data: {
          todos: [typeName, ...data.todos],
        },
      });
    },
  });

  const [updateTodo, { data: updateData }] = useMutation(UPDATE_GQL);
  const [removeTodo, { data: removeData }] = useMutation(REMOVE_GQL);
  const [completedTodo, { data: completedDate }] = useMutation(COMPLETE_GQL);

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
    if (addedData?.addTodo) {
      setValue("");
    }
  }, [addedData]);

  useEffect(() => {
    if (updateData?.updateTodo) {
      setValue("");
      setValueType({
        type: "add",
        id: null,
      });
    }
  }, [updateData]);

  if (hasLoading) return <Loading />;

  const valueChangeHandel = (e: any): void => {
    const val: string = e.target.value;
    setValue(val);
  };

  // add  todo

  const addHandel = ({ e }: IAddHandel) => {
    e?.preventDefault();

    if (valueType.type === "add") {
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
    }

    if (valueType.type === "update") {
      if (valueType.id) {
        updateTodo({
          variables: {
            id: valueType.id,
            text: value,
          },
        });
      } else {
        setMessages((preMessage) => {
          return [
            ...preMessage,
            {
              id: nanoid(),
              message: "Todo can't be competed",
            },
          ];
        });
      }
    }
  };

  // edit todo

  const editHandel = (id: string) => {
    if (id) {
      const findTodo = Data.find((todo) => {
        return todo._id === id;
      });

      if (findTodo) {
        setValue(findTodo.text);
        setValueType({
          type: "update",
          id,
        });
      }
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

  // remove todo

  const removeHandel = (id: string) => {
    setConfirmPopUp({
      card: true,
      message: "You are want to delete this todo",
      buttonText: "Remove",
      id: id,
    });
  };

  // competed todo

  const competedHandel = (id: string) => {
    if (id) {
      completedTodo({
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
            message: "Todo can't be competed",
          },
        ];
      });
    }
  };

  // message close todo

  const messageCloseHandel = (id: string) => {
    if (id) {
      const filterMessages = messages.filter((message) => {
        return message.id.toString() !== id.toString();
      });

      setMessages(filterMessages);
    }
  };

  // confrim pop up message todo

  const confirmCancelHandel = () => {
    setConfirmPopUp({
      card: false,
      buttonText: null,
      message: null,
      id: null,
    });
  };

  // confirm remove todo

  const confirmRemoveHandel = () => {
    if (confirmPopUp.id) {
      removeTodo({
        variables: {
          id: confirmPopUp.id,
        },
      });

      setConfirmPopUp({
        card: false,
        buttonText: null,
        message: null,
        id: null,
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

  // length

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
              onSubmit={(e: any) => {
                addHandel({ e });
              }}
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
                onCompetedClick={competedHandel}
              />
            </div>
          )}
        </div>

        {messageLength && (
          <div className="messages-section">
            <Messages messages={messages} onMessageClose={messageCloseHandel} />
          </div>
        )}
        {confirmPopUp.card && (
          <ConfirmCard
            message={confirmPopUp.message}
            confirmButtonText={confirmPopUp.buttonText}
            onCancel={confirmCancelHandel}
            onConfirm={confirmRemoveHandel}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
