export const setCurrentuser = (data) => {
    return {
        type: "FETCH_CURRENT_USER",
        payload: data
    }
}