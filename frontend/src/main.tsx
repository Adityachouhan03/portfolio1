import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles.css';
import AppLayout from './root/AppLayout';
import Home from './routes/Home';
import ProjectDetail from './routes/ProjectDetail';
import Blog from './routes/Blog';

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'projects/:slug', element: <ProjectDetail /> },
			{ path: 'blog', element: <Blog /> },
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	React.createElement(React.StrictMode, null, <RouterProvider router={router} />)
);


