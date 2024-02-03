import { AdminPage } from './components/admin-page/adminPage';
import './styles/main.scss';

export const App = () => {
  return (
    <div className="mainPage" data-testid="main-page">
      <div className="mainPage-header" data-testid="page-header"></div>
      <div className="mainPage-content" data-testid="page-content">
        <AdminPage />
      </div>
    </div>
  );
};

export default App;
