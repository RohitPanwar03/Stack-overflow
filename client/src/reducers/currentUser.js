export const currentuserReducer = (state = null, action) => {
    switch (action.type) {
        case "FETCH_CURRENT_USER":
            return action.payload;
        default:
            return state;
    }
}