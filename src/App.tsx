import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import AppErrorBoundary from './components/ui/AppErrorBoundary';
import GroupStagePage from './pages/GroupStagePage';
import MatchesPage from './pages/MatchesPage';
import KnockoutPage from './pages/KnockoutPage';
import ScorersPage from './pages/ScorersPage';
function NotFoundPage() {
  return (
    <section className="panel p-6">
      <p className="panel-title">404</p>
      <h2 className="mt-2 text-xl font-bold text-text-primary">Page not found</h2>
      <p className="mt-2 text-sm text-text-secondary">
        The route does not exist. Use the navigation above.
      </p>
    </section>
  );
}
export default function App() {
  return (
    <AppErrorBoundary>
      <div className="min-h-screen bg-pitch text-text-primary">
        <Header />
        <Nav />
        <main className="page-wrap py-6">
          <Routes>
            <Route path="/" element={<Navigate to="/groups" replace />} />
            <Route path="/groups" element={<GroupStagePage />} />
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/bracket" element={<KnockoutPage />} />
            <Route path="/scorers" element={<ScorersPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AppErrorBoundary>
  );
}