import { registerUser } from '../../../data/api';

export default class RegisterPresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  async register({ name, email, password }) {
    this.#view.showLoading();
    try {
      await registerUser({ name, email, password });
      this.#view.registerSuccess('Registrasi berhasil! Silakan login.');
    } catch (error) {
      this.#view.registerFailed(`Gagal mendaftar: ${error.message}`);
    } finally {
      this.#view.hideLoading();
    }
  }
}
