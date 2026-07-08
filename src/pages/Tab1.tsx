import { IonContent, IonHeader, IonList, IonPage, IonText, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import React from 'react';
import { Repository } from '../interfaces/Repository';
import { deleteRepository, fetchRepositories } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  const loadRepositories = async () => {
    setLoading(true);
    fetchRepositories()
      .then((reposData) => setRepos(reposData))
      .catch((error: unknown) => {
        if (error instanceof Error) {
          setErrorMsg(error.message);
        } else {
          setErrorMsg("Error desconocido");
        }
      })
      .finally(() => setLoading(false));
  };

  const handleDeleteRepo = async (repo: Repository) => {
    setErrorMsg("");
    try {
      await deleteRepository(repo.owner.login, repo.name);
      setRepos((prev) => prev.filter((r) => r.id !== repo.id));
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg("Error desconocido");
      }
    }
  };

  useIonViewDidEnter(() => {
    loadRepositories();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {!loading && repos.length > 0 && (
          <IonList>
            {repos.map((repo) => (
              <RepoItem key={repo.id} repository={repo} onDelete={handleDeleteRepo} />
            ))}
          </IonList>
        )}

        <LoadingSpinner isOpen={loading} />
        {errorMsg !== "" && <IonText color="danger">{errorMsg}</IonText>}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;