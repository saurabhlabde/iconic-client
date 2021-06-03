import Head from "next/head";
import { useEffect, useState } from "react";
import { popUpMessage } from "../hooks/message";

// component
import ConfirmCard from "../components/ConfirmCard";
import { Loading } from "../components/loading";
import { Forms } from "../modules/form";
import { Cards } from "../modules/cards";
import { Messages } from "../modules/messages";
import Menu from "../components/menu";

// hooks
import { mutation } from "../hooks/mutation";
import { query } from "../hooks/quary";

// gql
import { TODOS_GQL } from "../gql/todos";
import { ADD_GQL } from "../gql/add";
import { UPDATE_GQL } from "../gql/update";
import { COMPLETE_GQL } from "../gql/completed";
import { REMOVE_GQL } from "../gql/remove";

// cache
import { addCache } from "../cache/add";
import { updateCache } from "../cache/update";
import { removeCache } from "../cache/remove";
import { completedCache } from "../cache/complete";

const Home = () => {
  const [hasLoading, setHasLoading] = useState(true);
  const [Data, setData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [todoId, setTodoId] = useState(null);
  const [valueType, setValueType] = useState({
    type: "add",
    id: null,
  });

  const [confirmPopUp, setConfirmPopUp] = useState({
    card: false,
    message: null,
    buttonText: null,
  });

  const {
    data: todosData,
    loading: todosLoading,
    error: todosError,
  } = query({ type: TODOS_GQL });

  // add

  const {
    data: addedData,
    error: addError,
    handel: addTodo,
    loading: addLoading,
    client: addClient,
  } = mutation({
    type: ADD_GQL,
    variables: {
      text: value,
    },
  });

  // update

  const {
    data: updateData,
    error: updateError,
    handel: updateTodo,
    loading: updateLoading,
    client: updateClient,
  } = mutation({
    type: UPDATE_GQL,
    variables: {
      id: valueType.id,
      text: value,
    },
  });

  // remove

  const {
    data: removeData,
    error: removeError,
    handel: removeTodo,
    loading: removeLoading,
    client: removeClient,
  } = mutation({
    type: REMOVE_GQL,
    variables: {
      id: todoId,
    },
  });

  // completed

  const {
    data: completedData,
    error: completedError,
    handel: completedTodo,
    loading: completedLoading,
    client: completedClient,
  } = mutation({
    type: COMPLETE_GQL,
    variables: {
      id: todoId,
    },
  });

  //_ todos state

  useEffect(() => {
    if (todosData?.todos) {
      setData(todosData.todos);
    }
  }, [todosData]);

  // add todo state

  useEffect(() => {
    if (addedData?.addTodo) {
      setValue("");

      if (addClient) {
        addCache({
          type: TODOS_GQL,
          client: addClient,
          resData: addedData.addTodo,
        });
      }
    }
  }, [addedData]);

  // update todo state

  useEffect(() => {
    if (updateData?.updateTodo) {
      setValue("");
      setValueType({
        type: "add",
        id: null,
      });

      popUpMessage({
        setMessage: setMessages,
        message: "Todo update successfully",
        type: "success",
      });

      if (updateClient) {
        updateCache({
          type: TODOS_GQL,
          client: updateClient,
          resData: updateData.updateTodo,
        });
      }
    }
  }, [updateData]);

  // completed todo state

  useEffect(() => {
    if (completedData?.completedTodo) {
      if (completedData?.completedTodo?.completed) {
        popUpMessage({
          setMessage: setMessages,
          message: "Todo completed remove successfully",
          type: "success",
        });
      } else {
        popUpMessage({
          setMessage: setMessages,
          message: "Todo completed added successfully",
          type: "success",
        });
      }

      if (completedClient) {
        completedCache({
          type: TODOS_GQL,
          client: completedClient,
          resData: completedData.completedTodo,
        });
      }
    }
  }, [completedData]);

  // remove todo state

  useEffect(() => {
    if (removeData?.removeTodo) {
      popUpMessage({
        setMessage: setMessages,
        message: "Todo remove successfully",
        type: "success",
      });
      if (removeClient) {
        removeCache({
          type: TODOS_GQL,
          client: removeClient,
          resData: removeData.removeTodo,
        });
      }
    }
  }, [removeData]);

  // loading state

  useEffect(() => {
    const loading: boolean = todosLoading;
    setHasLoading(loading);
  }, [todosLoading]);

  if (hasLoading) return <Loading />;

  const valueChangeHandel = (e: any): void => {
    const val: string = e.target.value;
    setValue(val);
  };

  // add or update  todo

  const addHandel = (e: any) => {
    e?.preventDefault();

    if (valueType.type === "add") {
      if (value?.trim() === "") {
        popUpMessage({
          setMessage: setMessages,
          message: "Todo can't be empty",
          type: "error",
        });
      } else {
        addTodo();
      }
    }

    if (valueType.type === "update") {
      if (valueType.id) {
        updateTodo();
      } else {
        popUpMessage({
          setMessage: setMessages,
          message: "Todo can't be competed",
          type: "error",
        });
      }
    }
  };

  // edit todo

  const editHandel = () => {
    if (todoId) {
      const findTodo = Data.find((todo) => {
        return todo._id === todoId;
      });

      if (findTodo) {
        setValue(findTodo.text);
        setValueType({
          type: "update",
          id: todoId,
        });
      }
    } else {
      popUpMessage({
        setMessage: setMessages,
        message: "Todo can't be update",
        type: "error",
      });
    }
  };

  // remove todo

  const removeHandel = () => {
    setConfirmPopUp({
      card: true,
      message: "You are want to delete this todo",
      buttonText: "Remove",
    });
  };

  // competed todo

  const competedHandel = () => {
    if (todoId) {
      completedTodo();
    } else {
      popUpMessage({
        setMessage: setMessages,
        message: "Todo can't be competed",
        type: "error",
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
    });
  };

  // confirm remove todo

  const confirmRemoveHandel = () => {
    if (todoId) {
      removeTodo();
      setConfirmPopUp({
        card: false,
        buttonText: null,
        message: null,
      });
    } else {
      popUpMessage({
        setMessage: setMessages,
        message: "Todo can't be update",
        type: "error",
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
              onSubmit={addHandel ? addHandel : undefined}
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
                setId={setTodoId}
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
