import onResourceError from "./resource";
import onPromiseError from "./promise";
import onVueError from "./vue";
import onJsError from "./js";

export default function error() {
  onResourceError();
  onPromiseError();
  onVueError();
  onJsError();
}
