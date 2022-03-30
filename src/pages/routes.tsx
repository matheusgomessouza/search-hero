import {
	Routes,
	Route,
} from 'react-router-dom';
import { Hero } from './Hero';
import { HeroInfo } from './Hero/HeroInfo';
import Home from './Home';

export function Router() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/hero' element={<Hero />}>
				<Route path=':id' element={<HeroInfo />} />
			</Route>
		</Routes>
	);
}