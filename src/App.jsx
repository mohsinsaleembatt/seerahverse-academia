import { Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import PageTransition from './components/PageTransition.jsx'
import AdminCourses from './pages/AdminCourses';
import Profile from './pages/Profile.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home.jsx'))
const Courses = lazy(() => import('./pages/Courses.jsx'))
const CourseDetail = lazy(() => import('./pages/CourseDetail.jsx'))
const Homeschooling = lazy(() => import('./pages/Homeschooling.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const FreeLearning = lazy(() => import('./pages/FreeLearning.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Instructor = lazy(() => import('./pages/Instructor.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Register = lazy(() => import('./pages/Register.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Articles = lazy(() => import('./pages/Articles.jsx'))
const ArticleDetail = lazy(() => import('./pages/ArticleDetail.jsx'))
const WriteArticle = lazy(() => import('./pages/WriteArticle.jsx'))
const Community = lazy(() => import('./pages/Community.jsx'))

// Loading component for lazy loaded routes
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)]">
    <div className="text-center space-y-4">
      <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="text-[var(--color-text-muted)]">Loading...</p>
    </div>
  </div>
)

// Central routing map; keeps multipage navigation consistent through Layout.
const App = () => {
  const location = useLocation()

  return (
    <Layout>
      <ErrorBoundary>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <Home />
                  </PageTransition>
                </Suspense>
              }
            />
            <Route
              path="/courses"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <Courses />
                  </PageTransition>
                </Suspense>
              }
            />
            <Route
              path="/courses/:slug"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <CourseDetail />
                  </PageTransition>
                </Suspense>
              }
            />
            <Route
              path="/homeschooling"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <Homeschooling />
                  </PageTransition>
                </Suspense>
              }
            />
            <Route
              path="/services"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <Services />
                  </PageTransition>
                </Suspense>
              }
            />
            <Route
              path="/free-learning"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <FreeLearning />
                  </PageTransition>
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <About />
                  </PageTransition>
                </Suspense>
              }
            />
            <Route
              path="/instructor"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <Instructor />
                  </PageTransition>
                </Suspense>
              }
            />
            {/* Auth Routes */}
            <Route
              path="/login"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <Login />
                  </PageTransition>
                </Suspense>
              }
            />
            <Route
              path="/register"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <Register />
                  </PageTransition>
                </Suspense>
              }
            />
            {/* Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <Dashboard />
                  </PageTransition>
                </Suspense>
              }
            />
            {/* Contact Route */}
            <Route
              path="/contact"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <Contact />
                  </PageTransition>
                </Suspense>
              }
            />
            {/* Articles Routes */}
            <Route
              path="/articles"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <Articles />
                  </PageTransition>
                </Suspense>
              }
            />
            <Route
              path="/articles/:id"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <ArticleDetail />
                  </PageTransition>
                </Suspense>
              }
            />
            <Route
              path="/admin/write-article"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <WriteArticle />
                  </PageTransition>
                </Suspense>
              }
            />
            {/* Community Route */}
            <Route
              path="/community"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <Community />
                  </PageTransition>
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <NotFound />
                  </PageTransition>
                </Suspense>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/courses"
              element={
                <Suspense fallback={<LoadingSpinner />}>
                  <PageTransition>
                    <AdminCourses />
                  </PageTransition>
                </Suspense>
              }
            />
            
            {/* Profile Route */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </ErrorBoundary>
    </Layout>
  )
}

export default App
