import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import LoginPage from '../pages/auth/login/login-page';
import RegisterPage from '../pages/auth/register/register-page';
import AddStoryPage from '../pages/story/add-story/add-story-page';
import StoryListPage from '../pages/story/all-story/show-story-page';
import StoryDetailPage from '../pages/story/detail-story/detail-story-page';
import SavedStoriesPage from '../pages/story/saved-stories-page';
import NotFoundPage from '../pages/not-found-page';

const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/login': LoginPage,
  '/register': RegisterPage,
  '/add-story': AddStoryPage,
  '/stories': StoryListPage,
  '/stories/:id': StoryDetailPage,
  '/saved-stories': SavedStoriesPage,
};

export default routes;
export { NotFoundPage };
