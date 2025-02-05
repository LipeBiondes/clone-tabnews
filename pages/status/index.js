import useSWR from "swr";

async function fetchApi(key){
    const response = await fetch(key);
    return await response.json();
}

export default function statusPage() {
    return (
      <>
        <h1>Status</h1>
        <UpdatedAt />
      </>
    );
}

function UpdatedAt() {
    const {isLoading, data}= useSWR("/api/v1/status", fetchApi, {
        refreshInterval: 2000,
    })
    let updatedAtText = "Carregando...";
    let version = "Carregando...";
    let maxConnections = "Carregando...";
    let openedConnections = "Carregando...";

    if (!isLoading && data) {
        updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
        version = data.dependencies.database.version;
        maxConnections = data.dependencies.database.max_connections;
        openedConnections = data.dependencies.database.opened_connections;
    }
    return(
        <div>
            <p>Status de conexão com o banco de dados ao realizar o fetch contra a rota: &#39;/api/v1/status &#39;</p>
            <ul>
                <li>
                    Última atualização em: {updatedAtText}
                </li>
                <li>Versão do Postgres: {version}</li>
                <li>Número máximo de conexões: {maxConnections}</li>
                <li>Conexões abertas: {openedConnections}</li>
            </ul>
        </div>
    )
}