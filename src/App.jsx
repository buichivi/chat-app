import { useContext } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
    const { currentUser } = useContext(AuthContext);

    const ProtecedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login"/>;
        }
        return children;
    };

    return (
        <>
            <BrowserRouter>
                <Routes path="/">
                    <Route
                        index
                        element={
                            <ProtecedRoute>
                                <Home />
                            </ProtecedRoute>
                        }
                    />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
