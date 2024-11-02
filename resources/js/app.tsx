import "./bootstrap";
import "../css/app.css";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import Layout from "./Pages/Layout";

const appName = import.meta.env.VITE_APP_NAME || "Gladiator";

createInertiaApp({
	title: (title) => `${title} - ${appName}`,
	resolve: (name) =>
		resolvePageComponent(
			`./Pages/${name}.tsx`,
			import.meta.glob("./Pages/**/*.tsx"),
		),
	setup({ el, App, props }) {
		const root = createRoot(el);

		root.render(
			<Layout>
				<App {...props} />
			</Layout>,
		);
	},
	progress: {
		color: "#4B5563",
	},
});
