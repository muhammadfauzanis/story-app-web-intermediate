import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import LoginPage from '../pages/auth/login/login-page';
import RegisterPage from '../pages/auth/register/register-page';
import AddStoryPage from '../pages/story/add-story/add-story-page';
import StoryListPage from '../pages/story/all-story/show-story-page';
import StoryDetailPage from '../pages/story/detail-story/detail-story-page';

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/login': new LoginPage(),
  '/register': new RegisterPage(),
  '/add-story': new AddStoryPage(),
  '/stories': new StoryListPage(),
  '/stories/:id': new StoryDetailPage(),
};

export default routes;
