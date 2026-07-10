import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';
import GroupStagePage from './pages/GroupStagePage';
import MatchesPage from './pages/MatchesPage';
import KnockoutPage from './pages/KnockoutPage';
import ScorersPage from './pages/ScorersPage';
export default function App() {
  return (
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}