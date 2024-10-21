import { createServer } from "miragejs";

createServer({
	routes() {
		this.namespace = "api";
	}
});