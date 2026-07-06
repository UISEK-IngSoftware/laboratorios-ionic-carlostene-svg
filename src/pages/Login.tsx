import React, { useState } from "react";
import "./Login.css";
import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonPage, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { logoGithub } from "ionicons/icons";
import AuthService from "../services/AuthService";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        if (username.trim() === "" || token.trim() === "") {
            setErrorMsg("Por favor, ingrese su nombre de usuario y token.");
            return;
        }
        if (AuthService.login(username, token)) {
            window.location.href = "/tab1";
        }else{
            setErrorMsg("Error al iniciar sesión.");
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Iniciar sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Iniciar sesión</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="login-container" onSubmit={handleLogin}>
                    <form className="login-form">
                        <IonIcon icon={logoGithub} className="login-logo" />
                        <IonInput
                            className="login-field"
                            label="Nombre de usuario"
                            labelPlacement="floating"
                            fill="outline"
                            type="text"
                            value={username}
                            onIonChange={(e) => setUsername(e.detail.value!)}
                        />
                        <IonInput
                            className="login-field"
                            label="Contraseña"
                            labelPlacement="floating"
                            fill="outline"
                            type="password"
                            value={token}
                            onIonChange={(e) => setToken(e.detail.value!)}
                        />
                        {errorMsg !== "" && <IonText color="danger"><p>{errorMsg}</p></IonText>}
                        <IonButton
                            className="login-button"
                            expand="block"
                            type="submit"
                            
                        >
                            Iniciar sesión
                        </IonButton>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default Login;