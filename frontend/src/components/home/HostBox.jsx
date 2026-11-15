import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { useCreateSession } from "../../hooks/useSession";

// Teacher entry point, driven by AuthContext:
//   logged out -> username / password form (AuthContext.login)
//   logged in  -> start a new session (saved with saveHostSession) or resume the last one
export default function HostBox() {
  const { isAuthenticated, login, logout, hostSession, saveHostSession } = useAuth();
  const navigate = useNavigate();
  const createSession = useCreateSession();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);
    try {
      await login({ username, password });
      setPassword("");
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoggingIn(false);
    }
  };

  const handleStart = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    createSession.mutate(
      { title: title.trim() },
      {
        onSuccess: (data) => {
          saveHostSession(data);
          navigate("/teacher");
        },
      },
    );
  };

  if (!isAuthenticated) {
    return (
      <form onSubmit={handleLogin} className="flex flex-col items-center space-y-3">
        <h2 className="text-2xl font-bold">Host</h2>
        <p className="text-sm opacity-75">Log in to make a Room</p>
        <div className="flex flex-col gap-2 w-full max-w-xs">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="username"
            className="input input-bordered input-sm"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="input input-bordered input-sm"
          />
          <button type="submit" className="btn btn-primary" disabled={loggingIn}>
            {loggingIn ? "Logging in..." : "Host Login"}
          </button>
        </div>
        {loginError && <p className="text-error text-xs">{loginError}</p>}
      </form>
    );
  }

  return (
    <form onSubmit={handleStart} className="flex flex-col items-center space-y-3">
      <h2 className="text-2xl font-bold">Host</h2>
      <p className="text-sm opacity-75">Start a new Room</p>
      <div className="flex gap-2 w-full max-w-xs">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Class title"
          className="input input-bordered flex-1"
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={createSession.isPending || !title.trim()}
        >
          Start
        </button>
      </div>
      {createSession.isError && (
        <p className="text-error text-xs">
          {createSession.error.message || "Could not start the session"}
        </p>
      )}
      <div className="flex gap-2">
        {hostSession && (
          <button type="button" className="btn btn-sm btn-outline" onClick={() => navigate("/teacher")}>
            Resume #{hostSession.code}
          </button>
        )}
        <button type="button" className="btn btn-sm btn-ghost" onClick={logout}>
          Log out
        </button>
      </div>
    </form>
  );
}
