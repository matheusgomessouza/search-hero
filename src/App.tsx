import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Footer from './components/Footer';
import { Router } from './pages/routes';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<Router />
				<Footer />
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
