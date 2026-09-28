import { useEffect, useRef, useState } from "react";
import {
  Search,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

function Topbar({ decisions, projects }) {
  const navigate = useNavigate();
  const location = useLocation();

  const profileRef = useRef(null);
  const searchRef = useRef(null);

  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  /*
    Close profile menu whenever the route changes.
  */
  useEffect(() => {
    setShowProfile(false);
  }, [location.pathname]);

  /*
    Close profile menu when clicking outside it.
  */
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /*
    Close search results when clicking outside the search box.
  */
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearch("");
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const query = search.trim().toLowerCase();

  const decisionResults = decisions.filter((decision) =>
    `${decision.title} ${decision.description}`
      .toLowerCase()
      .includes(query)
  );

  const projectResults = projects.filter((project) =>
    `${project.name} ${project.description}`
      .toLowerCase()
      .includes(query)
  );

  function handleLogout() {
    setShowProfile(false);

    localStorage.removeItem(
      "decisiontrace-user"
    );

    navigate("/login");
  }

  function openProfile() {
    setShowProfile(false);
    navigate("/profile");
  }

  function openSettings() {
    setShowProfile(false);
    navigate("/settings");
  }

  function openDecision(decisionId) {
    setSearch("");
    setShowProfile(false);

    navigate(`/decisions/${decisionId}`);
  }

  function openProject(projectId) {
    setSearch("");
    setShowProfile(false);

    navigate(`/projects/${projectId}`);
  }

  return (
    <header className="topbar">

      {/* =========================
          SEARCH
      ========================= */}

      <div
        className="topbar-search"
        ref={searchRef}
      >
        <Search size={17} />

        <input
          type="text"
          placeholder="Search decisions and projects..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />

        {query && (
          <div className="search-results">

            {decisionResults.length === 0 &&
            projectResults.length === 0 ? (
              <div className="search-empty">
                No results found.
              </div>
            ) : (
              <>
                {/* DECISIONS */}

                {decisionResults.length > 0 && (
                  <div className="search-group">

                    <div className="search-group-title">
                      DECISIONS
                    </div>

                    {decisionResults
                      .slice(0, 5)
                      .map((decision) => (
                        <button
                          key={decision.id}
                          className="search-result"
                          onClick={() =>
                            openDecision(
                              decision.id
                            )
                          }
                        >
                          <div>
                            <strong>
                              {decision.title}
                            </strong>

                            <span>
                              Decision #
                              {decision.id}
                            </span>
                          </div>
                        </button>
                      ))}
                  </div>
                )}

                {/* PROJECTS */}

                {projectResults.length > 0 && (
                  <div className="search-group">

                    <div className="search-group-title">
                      PROJECTS
                    </div>

                    {projectResults
                      .slice(0, 5)
                      .map((project) => (
                        <button
                          key={project.id}
                          className="search-result"
                          onClick={() =>
                            openProject(
                              project.id
                            )
                          }
                        >
                          <div>
                            <strong>
                              {project.name}
                            </strong>

                            <span>
                              {project.id}
                            </span>
                          </div>
                        </button>
                      ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* =========================
          PROFILE
      ========================= */}

      <div className="topbar-right">

        <div
          className="profile-wrapper"
          ref={profileRef}
        >

          <button
            className="profile-button"
            onClick={() =>
              setShowProfile(
                (current) => !current
              )
            }
            aria-label="Open profile menu"
          >
            <div className="avatar">
              H
            </div>

            <div className="profile-name">
              <strong>
                Sai Hemanth
              </strong>

              <span>
                Team member
              </span>
            </div>

            <ChevronDown
              size={16}
            />
          </button>

          {/* PROFILE MENU */}

          {showProfile && (
            <div className="profile-menu">

              <button
                onClick={openProfile}
              >
                <User size={16} />
                <span>Profile</span>
              </button>

              <button
                onClick={openSettings}
              >
                <Settings size={16} />
                <span>Settings</span>
              </button>

              <div className="profile-divider" />

              <button
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Sign out</span>
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Topbar;