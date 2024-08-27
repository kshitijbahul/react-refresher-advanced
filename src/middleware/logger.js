
// Example of a curry function 
export const loggerMiddleware = (store) => (next) => (action) => {
    
    if (!action.type){
        return next(action)
    }
    console.log('Type ', action.type);
    console.log('Payload ', action.payload);
    console.log('State before ', store.getState());
    
    next(action);

    console.log('Next State after ', store.getState());


}