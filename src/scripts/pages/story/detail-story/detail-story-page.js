import StoryDetailPresenter from './detail-story-presenter';

export default class StoryDetailPage {
  #presenter = null;

  async render() {
    return `
      <section class="min-h-screen px-6 py-10 bg-gray-50">
        <div id="story-detail" class="max-w-3xl mx-auto">
          <p class="text-center text-gray-500">Memuat cerita...</p>
        </div>
      </section>
    `;
  }

  async afterRender() {
    this.#presenter = new StoryDetailPresenter();
    await this.#presenter.init();
  }
}
