import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useAuth = () => {
	const { currentUser } = useSelector((state) => state.user);
	const history = useHistory();

	useEffect(() => {
		if (!currentUser) {
			history.push('/login');
		}
	}, [currentUser]);

	return currentUser;
};

export default useAuth;

/*

first we destruture  the current user from the store using the useSelector hook
and inside the useEffect we check if no user then push them to login route
else just return the current user
Basically the functionality of this hook is if user persent return the user if not redirect them to the login route
*/
