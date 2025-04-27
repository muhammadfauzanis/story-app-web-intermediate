import { loginUser } from '../../../data/api';

export default class LoginPresenter {
  #view;

  constructor({ view }) {
    this.#view = view;
  }

  async login({ email, password }) {
    this.#view.showLoading();
    try {
      const result = await loginUser({ email, password });

      const { token } = result.loginResult;
      localStorage.setItem('token', token);

      this.#view.loginSuccess('Login berhasil!');
    } catch (error) {
      this.#view.loginFailed(`Login gagal: ${error.message}`);
    } finally {
      this.#view.hideLoading();
    }
  }
}
