import { combineReducers } from 'redux';
import uuid from 'uuid';

const rootReducer = combineReducers({
  authors: authorsReducer,
  books: booksReducer
})

function booksReducer(state = [], action) {
  let idx

  switch (action.type) {
    case 'ADD_BOOK':
      return [...state, action.book];

    case 'REMOVE_BOOK':
      idx = state.findIndex(book => book.id === action.id)
      return [...state.slice(0, idx), state.slice(idx + 1)];

    default:
      return state
  }
}

function authorsReducer(state = [], action) {
  let idx

  switch (action.type) {
    case 'ADD_BOOK':
      let existingAuthor = state.filter(
        author => author.authorName === action.book.authorName
      )

      if (existingAuthor.length > 0) {
        // if author exists just return the state
        return state
      } else {
        // return the new state with the new author added to it
        return [...state, { authorName: action.book.authorName, id: uuid() }];
      }

    case 'ADD_AUTHOR':
      return [...state, action.author]

    case 'REMOVE_AUTHOR':
      idx = state.findIndex(author => author.id === action.id)
      return [...state.slice(0, idx), ...state.slice(idx + 1)]

    default:
      return state
  }
}

export default rootReducer;
