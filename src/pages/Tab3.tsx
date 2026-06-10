import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
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
          <IonCard className="card">
            <img alt="Avatar"  src="https://avatars.githubusercontent.com/u/235896503?v=4"/>
            <IonCardHeader>
              <IonCardTitle>Carlos Alejandro Tene Mora</IonCardTitle>
              <IonCardSubtitle>CarlosTene2006</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Desarrollador de software apasionado por la tecnología y el 
                aprendizaje continuo. Con experiencia en desarrollo web y móvil, 
                siempre buscando nuevas formas de mejorar mis habilidades y contribuir 
                a proyectos innovadores.</p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
