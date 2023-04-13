import {
  createElem,
  createDiv,
} from '../ultilites/create-element';

class Loader {
  constructor(id) {
    this.id = id;
  }

  display() {
    const parentElem = document.getElementById(this.id);

    const newsectionTasks = createElem('section', ['loader_section']);
    newsectionTasks.id = 'loader_section';

    const containerLoader = createDiv(['container__loader']);
    const loader = createElem('span', ['loader']);
    containerLoader.append(loader);
    newsectionTasks.append(containerLoader);
    parentElem.replaceWith(newsectionTasks);
  }
}
export default Loader;
