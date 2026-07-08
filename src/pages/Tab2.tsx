import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTextarea, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import './Tab2.css';
import { useHistory, useLocation } from 'react-router-dom';
import { RepositoryPayload } from '../interfaces/RepositoryPayload';
import { Repository } from '../interfaces/Repository';
import { createRepository, updateRepository } from '../services/GithubService';
import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';

interface LocationState {
  repository?: Repository;
}

const Tab2: React.FC = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const editingRepo = location.state?.repository;
  const isEditMode = !!editingRepo;

  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [formData, setFormData] = React.useState<RepositoryPayload>({
    name: editingRepo?.name || '',
    description: editingRepo?.description || '',
  });

  React.useEffect(() => {
    setFormData({
      name: editingRepo?.name || '',
      description: editingRepo?.description || '',
    });
  }, [editingRepo]);

  const setFormName = (value: string) => {
    setFormData((prev) => ({ ...prev, name: value }));
  };

  const setFormDescription = (value: string) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const resetForm = () => setFormData({ name: '', description: '' });

  const saveRepository = async () => {
    if (formData.name.trim() === '') {
      setErrorMsg('El nombre del repositorio es obligatorio.');
      return;
    }
    setErrorMsg("");
    setLoading(true);

    const request = isEditMode && editingRepo
      ? updateRepository(editingRepo.owner.login, editingRepo.name, formData)
      : createRepository(formData);

    request
      .then((repo) => {
        if (repo) {
          resetForm();
          history.push('/tab1');
        }
      })
      .catch((error) => {
        const action = isEditMode ? 'actualizar' : 'crear';
        setErrorMsg(`Error al ${action} el repositorio: ` + error.message);
      })
      .finally(() => setLoading(false));
  }

  useIonViewDidEnter(() => {
    setErrorMsg("");
  });


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isEditMode ? 'Editar Repositorio' : 'Formulario de Repositorio'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{isEditMode ? 'Editar Repositorio' : 'Formulario de Repositorio'}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="form-container">
          <IonInput
            className='form-field'
            label='Nombre del repositorio'
            labelPlacement='floating'
            placeholder='Ingrese el nombre del repositorio'
            value={formData.name}
            onIonInput={(e) => setFormName(e.detail.value!)}
          />
          <IonTextarea
            className='form-field'
            label='Descripción'
            labelPlacement='floating'
            placeholder='Ingrese la descripción del repositorio'
            rows={6}
            value={formData.description}
            onIonInput={(e) => setFormDescription(e.detail.value!)}
          />
          {errorMsg !== "" && <IonText color="danger">{errorMsg}</IonText>}
          <IonButton
            className='form-field'
            expand='block'
            fill='solid'
            onClick={saveRepository}
          >
            {isEditMode ? 'Actualizar' : 'Guardar'}
          </IonButton>
        </div>
        <LoadingSpinner isOpen={loading} />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
