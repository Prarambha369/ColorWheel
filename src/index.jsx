import React, { useState } from 'react';
                          import { createRoot } from 'react-dom/client';
                          import App from './App';
                          import './style.css';

                          const Main = () => {
                            const [darkMode, setDarkMode] = useState(false);

                            const toggleDarkMode = () => {
                              setDarkMode(!darkMode);
                              document.body.classList.toggle('dark-mode', !darkMode);
                            };

                            return (
                              <div>
                                <button className="toggle-btn" onClick={toggleDarkMode}>
                                  {darkMode ? (
                                      <>
                                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                              <path
                                                  d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121z"/>
                                          </svg>
                                          Light Mode
                                      </>
                                  ) : (
                                      <>
                                          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                              <path
                                                  d="M12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12zm0-2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 3a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5z"/>
                                          </svg>
                                          Dark Mode
                                      </>
                                  )}
                                </button>
                                  <App/>
                              </div>
                            );
                          };

export default Main;

const root = createRoot(document.getElementById('root'));
                          root.render(
                            <React.StrictMode>
                              <Main />
                            </React.StrictMode>
                          );