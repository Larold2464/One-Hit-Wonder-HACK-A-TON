export default function HomePage() {
  return (
    <div className="min-vh-100 bg-light text-dark">
      <header className="bg-white border-bottom shadow-sm">
        <div className="container py-3 d-flex justify-content-between align-items-center">
          <span className="fs-3 fw-bold text-primary">Feedy</span>
          <button
            type="button"
            className="btn btn-outline-primary"
            id="signup-button"
          >
            Sign up
          </button>
        </div>
      </header>

      <main className="container py-5">
        <div className="row align-items-center g-5">
          <section className="col-12 col-lg-6" aria-labelledby="home-title">
            <h1 id="home-title" className="display-5 fw-bold mb-4">
              Ask Freely, Learn Together
            </h1>
            <p className="lead text-secondary">
              Join your classroom session to ask questions and let your
              teacher know when you need a little more explanation.
            </p>
          </section>

          <section className="col-12 col-lg-6" aria-labelledby="join-title">
            <div className="card shadow-sm">
              <div className="card-body p-4 p-md-5">
                <h2 id="join-title" className="h3">Join a room</h2>
                <p className="text-secondary">
                  Enter the room code shared by your teacher.
                </p>

                <label htmlFor="room-code" className="form-label mt-3">Room code</label>
                <input
                  id="room-code"
                  name="roomCode"
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter room code"
                  spellCheck={false}
                />
                <button
                  type="button"
                  className="btn btn-primary btn-lg w-100 mt-3"
                  id="join-button"
                >
                  Join room
                </button>

                <div className="border-top mt-4 pt-4">
                  <h2 className="h5">Hosting a session?</h2>
                  <p className="text-secondary">Log in to manage your classroom.</p>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    id="host-login-button"
                  >
                    Host login
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
