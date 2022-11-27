import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";

import AppRouter from "./AppRouter";

function App() {
  const queryClient = new QueryClient();
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
