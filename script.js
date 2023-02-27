const matchDiv = document.querySelector(".match");
const allmatchesDiv = document.querySelector(".all-matches");
const addMatchBtn = document.querySelector(".lws-addMatch");
const showValue = document.querySelector(".lws-singleResult");
const resetBtn = document.querySelector(".lws-reset");

const INCREMENT = "increment";
const DECREMENT = "decrement";
const RESET = "reset";
const NEWMATCH = "newMatch";

// action creators
const increment = (inputValue, index) => {
  return {
    type: INCREMENT,
    payload: {
      input: inputValue,
      index,
    },
  };
};

const decrement = (inputValue, index) => {
  return {
    type: DECREMENT,
    payload: {
      input: inputValue,
      index,
    },
  };
};
const reset = () => {
  return {
    type: RESET,
  };
};

const newMatch = () => {
  return {
    type: NEWMATCH,
  };
};

//initial state
const initialState = [{ id: 1, value: 0 }];

//Reducer
const reducer = (state = initialState, action) => {
  if (action.type === INCREMENT) {
    const index = action.payload.index;
    const inputValue = parseInt(action.payload.input);
    const updatedState = [...state];
    updatedState[index] = {
      id: state[index].id,
      value: state[index].value + inputValue,
    };
    return updatedState;
  } else if (action.type === DECREMENT) {
    const index = action.payload.index;
    const inputValue = parseInt(action.payload.input);
    const updatedState = [...state];
    const decrement =
      state[index].value - inputValue < 0 ? 0 : state[index].value - inputValue;
    updatedState[index] = {
      id: state[index].id,
      value: decrement,
    };

    return updatedState;
  } else if (action.type === NEWMATCH) {
    return [
      ...state,
      {
        id: state.length + 1,
        value: 0,
      },
    ];
  } else if (action.type === RESET) {
    const updatedState = state.map((item) => {
      return {
        id: item.id,
        value: 0,
      };
    });
    return updatedState;
  } else {
    return state;
  }
};

//Store
const store = Redux.createStore(reducer);

const printMatch = () => {
  const state = store.getState();
  allmatchesDiv.innerHTML = "";
  state?.forEach((item) => {
    return createMatch(item);
  });
};

const createMatch = (item) => {
  const match = document.createElement("div");
  match.classList.add("match");
  match.innerHTML = `
      <div class="wrapper">
          <button class="lws-delete">
              <img src="./image/delete.svg" alt="" />
          </button>
          <h3 class="lws-matchName">Match ${item?.id}</h3>
      </div>
      <div class="inc-dec">
          <form class="incrementForm">
              <h4>Increment</h4>
              <input
                  type="number"
                  name="increment"
                  class="lws-increment"
              />
          </form>
          <form class="decrementForm">
              <h4>Decrement</h4>
              <input
                  type="number"
                  name="decrement"
                  class="lws-decrement"
              />
          </form>
      </div>
      <div class="numbers">
          <h2 class="lws-singleResult">${item?.value}</h2>
      </div>
`;
  allmatchesDiv.appendChild(match);
};

printMatch();

store.subscribe(printMatch);

allmatchesDiv.addEventListener("click", (e) => {
  let allMatchIncrement = document.querySelectorAll(".incrementForm");

  allMatchIncrement.forEach((item, index) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();
      let value = item.children[1].value;
      store.dispatch(increment(value, index));
    });
  });
  // for decrement
  let allMatchDecrement = document.querySelectorAll(".decrementForm");

  allMatchDecrement.forEach((item, index) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();
      let value = item.children[1].value;
      store.dispatch(decrement(value, index));
    });
  });
});

addMatchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  store.dispatch(newMatch());
});

resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  store.dispatch(reset());
});
