// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { GameContextProvider } from '../gameContext/gameContext';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from '../layout/layout';
import { COOKE_ERROR } from '../const/const';
export function App() {
  const navigate = useNavigate()
 
  const queryClient = new QueryClient({
    defaultOptions: {
    
      queries: {
        // Global options for queries
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error:any) => {
         const msg =error.response?.errors[0]?.message
         if(msg === COOKE_ERROR){
          navigate("/")
         }
          // Handle specific GraphQL error here if needed
        },
      },
      mutations: {
        // Global options for mutations
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error:any) => {
          const msg =error.response?.errors[0]?.message
          if(msg === COOKE_ERROR){
           navigate("/")
          }
          // Handle specific GraphQL error here if needed
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
   <Layout />
    </QueryClientProvider>
  );
}

export default App;
