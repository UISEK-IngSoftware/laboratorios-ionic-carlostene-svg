import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, useIonViewWillEnter, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonButton, IonIcon } from '@ionic/react';
import './Tab3.css';
import React from 'react';
import { GithubUser } from '../interfaces/GithubUser';
import { getUserInfo } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';
import { useHistory } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { logOutOutline } from 'ionicons/icons';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = React.useState<GithubUser | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [errorMsg, setErrorMsg] = React.useState("");
  const history = useHistory();

  const laodUserInfo = async () => {
    setLoading(true);
    getUserInfo()
      .then((userData) => setUserInfo(userData))
      .catch((error) => setErrorMsg("Error al cargar la información del usuario: " + error.message))
      .finally(() => setLoading(false));
  };

  const handleLogout = () => {
    AuthService.logout();
    history.push('/login');
  }

  useIonViewWillEnter(() => {
    laodUserInfo();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>


        <div className="card-container">
          {userInfo && (
            <IonCard className="card">
              <img alt={userInfo.name} src={userInfo.avatar_url} />
              <IonCardHeader>
                <IonCardTitle>{userInfo.name}</IonCardTitle>
                <IonCardSubtitle>{userInfo.login}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{userInfo?.bio}</p>
              </IonCardContent>
            </IonCard>
          )}
          <IonButton expand="block" color="danger"  onClick={handleLogout}>
            <IonIcon icon={logOutOutline} slot="start" />
            Salir
          </IonButton>
        </div>

        {errorMsg !== "" && <IonText color="danger">{errorMsg}</IonText>}
        <LoadingSpinner isOpen={loading} />

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
