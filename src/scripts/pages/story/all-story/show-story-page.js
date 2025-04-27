import StoryListPresenter from './show-story-presenter';

export default class StoryListPage {
  #presenter = null;

  async render() {
    return `
      <section class="min-h-screen px-6 py-10 bg-gray-50">
        <h2 class="text-2xl font-bold mb-6 pt-10">Cerita Pengguna</h2>
        <div id="story-list" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"></div>

        <h3 class="text-xl font-semibold mb-2">Peta Lokasi Cerita</h3>
        <div id="story-map" class="h-96 w-full rounded-lg border border-gray-300"></div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new StoryListPresenter();
    await this.#presenter.init();
  }
}
