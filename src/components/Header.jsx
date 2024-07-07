import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();

  const { user, isAuthenticated, isLoading } = useAuth0();

  const handleSign = () => {
    alert("Currently Under Developement");
  };

  return (
    <nav className="container mx-auto shadow-lg my-3">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-xl flex items-center space-x-5 font-bold">
            <svg
              width="50"
              height="50"
              className="fill-white"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>ai-solid</title>
              <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                  <rect width="48" height="48" fill="none" />
                </g>
                <g id="Q3_icons" data-name="Q3 icons">
                  <g>
                    <path d="M17.9,2h-.4L7.6,6.6a1,1,0,0,0-.6.9v7.4l-.6.5-4,3.3a.8.8,0,0,0-.4.8v9a.9.9,0,0,0,.4.8l4,3.3.6.5v7.4a1,1,0,0,0,.6.9l9.9,4.5h.4l.6-.2,4-2.7V25.5H21a1.5,1.5,0,0,1,0-3h1.5V4.9l-4-2.7ZM9,13.5l2.8,1.9a1.5,1.5,0,0,1,.4,2.1,1.4,1.4,0,0,1-1.2.7,1.1,1.1,0,0,1-.8-.3L9,17.1Zm-5,9H7.5a1.5,1.5,0,0,1,0,3H4Zm5,8.4,1.2-.8a1.4,1.4,0,0,1,2,.4,1.5,1.5,0,0,1-.4,2.1L9,34.5ZM19.5,18.6l-4,4v2.8l4,4v5.2l-3.4,3.5a2.1,2.1,0,0,1-1.1.4,2.1,2.1,0,0,1-1.1-.4,1.6,1.6,0,0,1,0-2.2l2.6-2.5V30.6l-4-4V21.4l4-4V14.6l-2.6-2.5a1.6,1.6,0,1,1,2.2-2.2l3.4,3.5Z" />
                    <path d="M45.6,18.7l-4-3.3-.6-.5V7.5a1,1,0,0,0-.6-.9L30.5,2.1h-.4l-.6.2-4,2.7V22.5H27a1.5,1.5,0,0,1,0,3H25.5V43.1l4,2.7.6.2h.4l9.9-4.5a1,1,0,0,0,.6-.9V33.1l.6-.5,4-3.3a.9.9,0,0,0,.4-.8v-9A.8.8,0,0,0,45.6,18.7ZM39,17.1l-1.2.8a1.1,1.1,0,0,1-.8.3,1.4,1.4,0,0,1-1.2-.7,1.5,1.5,0,0,1,.4-2.1L39,13.5ZM28.5,29.4l4-4V22.6l-4-4V13.4l3.4-3.5a1.6,1.6,0,0,1,2.2,2.2l-2.6,2.5v2.8l4,4v5.2l-4,4v2.8l2.6,2.5a1.6,1.6,0,0,1,0,2.2,1.7,1.7,0,0,1-2.2,0l-3.4-3.5ZM39,34.5l-2.8-1.9a1.5,1.5,0,0,1-.4-2.1,1.4,1.4,0,0,1,2-.4l1.2.8Zm5-9H40.5a1.5,1.5,0,0,1,0-3H44Z" />
                  </g>
                </g>
              </g>
            </svg>
            <p>IntelliScrape</p>
          </a>
        </div>
        <div className="hidden md:flex md:justify-center md:items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div>
                <div className="flex space-x-6 justify-center items-center">
                  <img
                    className="rounded-full h-14"
                    src={user.picture}
                    alt={user.name}
                  />
                  <h2>{user.name}</h2>
                </div>
              </div>{" "}
              <a
                href="#"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                className="md:flex md:justify-center md:items-center hover:bg-violet-200 hover:text-black text-violet-100 border border-violet-100 h-10 font-medium py-6 px-8 rounded-md transition-all duration-150"
              >
                Log Out
              </a>
            </>
          ) : (
            <a
              href="#"
              onClick={() => loginWithRedirect()}
              className="md:flex md:justify-center md:items-center hover:bg-violet-200 hover:text-black text-violet-100 border border-violet-100 h-10 font-medium py-6 px-8 rounded-md transition-all duration-150"
            >
              Login
            </a>
          )}
        </div>

        <button className="md:hidden" onClick={handleToggle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden shadow-lg px-4 py-3">
          <div className="flex flex-col space-y-4 mt-5 justify-center items-center">
            {isAuthenticated ? (
              <>
                <div>
                  <div className="flex flex-col space-x-6 justify-center items-center">
                    <img
                      className="rounded-full h-14"
                      src={user.picture}
                      alt={user.name}
                    />
                    <h2>{user.name}</h2>
                  </div>
                </div>{" "}
                <a
                  href="#"
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                  className="flex justify-center items-center hover:bg-violet-200 hover:text-black text-violet-100 border border-violet-100 h-10 font-medium py-6 px-8 rounded-md transition-all duration-150"
                >
                  Log Out
                </a>
              </>
            ) : (
              <a
                href="#"
                onClick={() => loginWithRedirect()}
                className="flex justify-center items-center hover:bg-violet-200 hover:text-black text-violet-100 border border-violet-100 h-10 font-medium py-6 px-8 rounded-md transition-all duration-150"
              >
                Login
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
