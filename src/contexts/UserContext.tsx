import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { fetchUserService } from "@/services/UserService";

export type User = {
  email: string;
  password: string;
  name: string;
};

type UserContextValue = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  userLoading: boolean;
  setUserLoading: Dispatch<SetStateAction<boolean>>;
  fetchUser: () => void;
};

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
  userLoading: false,
  setUserLoading: () => {},
  fetchUser: () => {},
});

export const UserContextProvider: React.FC<UserProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(false);

  const fetchUser = async () => {
    setUserLoading(true);
    const userResponse = fetchUserService();
    userResponse && setUser(userResponse as unknown as User);
    setUserLoading(false);
  };

  const userContextValue: UserContextValue = {
    user,
    setUser,
    userLoading,
    setUserLoading,
    fetchUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUserContext = () => useContext(UserContext);
