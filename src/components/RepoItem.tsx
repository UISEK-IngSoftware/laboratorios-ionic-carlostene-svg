import {
    IonAlert, IonIcon, IonItem, IonItemOption, IonItemOptions,
    IonItemSliding, IonLabel, IonThumbnail
} from "@ionic/react";
import "./RepoItem.css";
import React from "react";
import { pencilOutline, trashOutline } from "ionicons/icons";
import { Repository } from "../interfaces/Repository";
import { useHistory } from "react-router-dom";

interface RepoItemProps {
    repository: Repository;
    onDelete: (repo: Repository) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repository, onDelete }) => {
    const history = useHistory();
    const [showAlert, setShowAlert] = React.useState(false);
    const slidingRef = React.useRef<HTMLIonItemSlidingElement>(null);

    const handleEdit = () => {
        slidingRef.current?.close();
        history.push('/tab2', { repository });
    };

    const handleDeleteClick = () => {
        slidingRef.current?.close();
        setShowAlert(true);
    };

    return (
        <>
            <IonItemSliding ref={slidingRef}>
                <IonItem>
                    <IonThumbnail slot="start">
                        <img alt={repository.name} src={repository.owner.avatar_url} />
                    </IonThumbnail>
                    <IonLabel>
                        <h2>{repository.name}</h2>
                        <p>{repository.description}</p>
                        <p>Lenguaje: {repository.language}</p>
                    </IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                    <IonItemOption onClick={handleEdit}>
                        <IonIcon icon={pencilOutline} slot="icon-only" />
                    </IonItemOption>
                    <IonItemOption color="danger" onClick={handleDeleteClick}>
                        <IonIcon icon={trashOutline} slot="icon-only" />
                    </IonItemOption>
                </IonItemOptions>
            </IonItemSliding>

            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="Eliminar repositorio"
                message={`¿Está seguro que desea eliminar "${repository.name}"? Esta acción no se puede deshacer.`}
                buttons={[
                    { text: 'Cancelar', role: 'cancel' },
                    { text: 'Eliminar', role: 'destructive', handler: () => onDelete(repository) }
                ]}
            />
        </>
    );
};

export default RepoItem;

