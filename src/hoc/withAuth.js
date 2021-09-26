import { useAuth } from './../customHooks';
const WithAuth = (props) => useAuth() && props.children;

export default WithAuth;

/*
This is a higher order component which is reponsibe for showing the connect it wrapped when currentuser is login
or redirect them to login page
It takes props which usually are components to display and we use the custom hook to determine whether 
currentUser is logged or not and then we render the children to this component


*/
