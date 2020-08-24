//State
const deState = {

    claims: []
}
//Reducer & Action
export default function reducer(state = deState, action){

    switch (action.type) {

        case "LIST":
            return {
                claims: action.claims
            }

    }
    return state;
};