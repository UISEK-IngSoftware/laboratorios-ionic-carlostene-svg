import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router-dom';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { createRepository } from '../services/GithubService';
import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const repoFormData: RepositoryPayload = {
    name: '',
    description: '',
  };

  const setFormName = (value: string) => {
    repoFormData.name = value;
  };

  const setFormDescription = (value: string) => {
    repoFormData.description = value;
  };

  const saveRepository = async () => {
    if (repoFormData.name.trim() === '') {
      setErrorMsg('El nombre del repositorio es obligatorio.');
      return;
    }
    setLoading(true);
    createRepository(repoFormData).then((newRepo) => {
      if (newRepo) {
        setFormName('');
        setFormDescription('');
        history.push('/tab1');
      }
    }).catch((error) => {
      setErrorMsg("Error al crear el repositorio: " + error.message);
    }).finally(() => {
      setLoading(false);
    });
  }

  useIonViewDidEnter(() => {
    setErrorMsg("");
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput 
          className='form-field'
          label='Nombre del repositorio'
          labelPlacement='floating'
          placeholder='Ingrese el nombre del repositorio'
          value={repoFormData.name}
          onIonChange={(e) => setFormName(e.detail.value!)}
          />
          <IonTextarea
            className='form-field'
            label='Descripción'
            labelPlacement='floating'
            placeholder='Ingrese la descripción del repositorio'
            rows={6}
            value={repoFormData.description}
            onIonChange={(e) => setFormDescription(e.detail.value!)}
          />
          {errorMsg !== "" && <IonText color="danger">{errorMsg}</IonText>}
          <IonButton 
            className='form-field' 
            expand='block'
            fill='solid'
            onClick={saveRepository}
          >
            Guardar
          </IonButton>
        </div>
        <LoadingSpinner isOpen={loading} />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
