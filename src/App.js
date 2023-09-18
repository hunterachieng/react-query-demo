import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './App.css';
import Posts from './components/Posts';

const queryClient = new QueryClient()
function App() {
  return (
   <QueryClientProvider client={queryClient}>
<Posts/>
   </QueryClientProvider>
 );
}

export default App;
