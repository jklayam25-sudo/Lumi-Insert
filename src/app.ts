import { container } from './Infrastructures/container';
import createServer from './Infrastructures/http/createServer';

(async function main() {
  createServer(container);
})();
