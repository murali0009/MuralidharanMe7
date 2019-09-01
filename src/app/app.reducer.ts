export function reducer(state: any, action: { type: any; payload: any }) {
  switch (action.type) {
    case 'TOGGLE_THEME': {
      return {
        ...state,
        applicationTheme: action.payload
      };
    }
    default:
      return state;
  }
}
