import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Decisions from "./pages/Decisions";
import DecisionDetails from "./pages/DecisionDetails";
import ReviewAlerts from "./pages/ReviewAlerts";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import NewDecision from "./pages/NewDecision";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import { decisions as initialDecisions } from "./data/decisions";
import { projects } from "./data/projects";

import "./App.css";


/* =========================================
   MAIN APPLICATION LAYOUT
========================================= */

function AppLayout({ children, decisions, projects }) {
  return (
    <div className="app-shell">

      <Sidebar />

      <div className="main-area">

        <Topbar
          decisions={decisions}
          projects={projects}
        />

        <main>
          {children}
        </main>

      </div>

    </div>
  );
}


/* =========================================
   APP
========================================= */

function App() {

  /* =========================================
     LOAD SAVED THEME
  ========================================= */

  useEffect(() => {
    const savedTheme =
      localStorage.getItem("decisiontrace-theme") || "dark";

    document.documentElement.setAttribute(
      "data-theme",
      savedTheme
    );
  }, []);


  /* =========================================
     DECISION DATA
  ========================================= */

  const [decisions, setDecisions] = useState(() => {

    try {

      const stored = localStorage.getItem(
        "decisiontrace-decisions"
      );

      if (stored) {

        const parsed = JSON.parse(stored);

        if (Array.isArray(parsed)) {
          return parsed;
        }

      }

    } catch (error) {

      console.error(
        "Could not load saved decisions:",
        error
      );

    }

    return initialDecisions;
  });


  /* =========================================
     ADD NEW DECISION
  ========================================= */

  function addDecision(newDecision) {

    const existingIds = decisions
      .map((decision) => Number(decision.id))
      .filter(Number.isFinite);


    const nextId = String(
      Math.max(0, ...existingIds) + 1
    ).padStart(3, "0");


    const savedDecision = {
      ...newDecision,
      id: nextId,
    };


    const updatedDecisions = [
      savedDecision,
      ...decisions,
    ];


    setDecisions(updatedDecisions);


    localStorage.setItem(
      "decisiontrace-decisions",
      JSON.stringify(updatedDecisions)
    );


    return savedDecision;
  }


  /* =========================================
     ROUTES
  ========================================= */

  return (
    <BrowserRouter>

      <Routes>

        {/* =================================
            AUTHENTICATION
        ================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


        {/* =================================
            MAIN APPLICATION
        ================================= */}

        <Route
          path="*"
          element={
            <AppLayout
              decisions={decisions}
              projects={projects}
            >

              <Routes>

                {/* =========================
                    DASHBOARD
                ========================= */}

                <Route
                  path="/"
                  element={
                    <Dashboard
                      decisions={decisions}
                      projects={projects}
                    />
                  }
                />


                {/* =========================
                    ALL DECISIONS
                ========================= */}

                <Route
                  path="/decisions"
                  element={
                    <Decisions
                      decisions={decisions}
                      projects={projects}
                    />
                  }
                />


                {/* =========================
                    NEW DECISION
                ========================= */}

                <Route
                  path="/decisions/new"
                  element={
                    <NewDecision
                      onAddDecision={addDecision}
                      projects={projects}
                    />
                  }
                />


                {/* =========================
                    DECISION DETAILS
                ========================= */}

                <Route
                  path="/decisions/:id"
                  element={
                    <DecisionDetails
                      decisions={decisions}
                    />
                  }
                />


                {/* =========================
                    REVIEW ALERTS
                ========================= */}

                <Route
                  path="/review-alerts"
                  element={
                    <ReviewAlerts
                      decisions={decisions}
                    />
                  }
                />


                {/* =========================
                    PROJECTS
                ========================= */}

                <Route
                  path="/projects"
                  element={
                    <Projects
                      projects={projects}
                      decisions={decisions}
                    />
                  }
                />


                {/* =========================
                    PROJECT DETAILS
                ========================= */}

                <Route
                  path="/projects/:id"
                  element={
                    <ProjectDetails
                      projects={projects}
                      decisions={decisions}
                    />
                  }
                />


                {/* =========================
                    SETTINGS
                ========================= */}

                <Route
                  path="/settings"
                  element={
                    <Settings />
                  }
                />


                {/* =========================
                    PROFILE
                ========================= */}

                <Route
                  path="/profile"
                  element={
                    <Profile />
                  }
                />

              </Routes>

            </AppLayout>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;