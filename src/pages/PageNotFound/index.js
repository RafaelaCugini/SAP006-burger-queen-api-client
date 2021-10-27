import "./index.css"
import { useHistory } from "react-router";
import { Button } from "../../components/Button"
export function PageNotFound() {

    const history = useHistory()
    function navigateToSite() {
        history.push('/');
    }

    return (
        <div className="container-center">
            <h1 className="h1">404: Página não encontrada</h1>
            <Button className="back" onClick={navigateToSite}>Retorne para o site</Button>
        </div>
    )
}