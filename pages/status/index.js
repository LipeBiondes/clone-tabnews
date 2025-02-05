import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  return await response.json();
}

export default function statusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DataBase />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });
  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }
  return (
    <div>
      <p>
        Status de conexão com o banco de dados ao realizar o fetch contra a
        rota: &#39;/api/v1/status &#39;
      </p>
      <p>
        Última atualização em: <strong>{updatedAtText}</strong>
      </p>
    </div>
  );
}

function DataBase() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });
  let version = "Carregando...";
  let maxConnections = "Carregando...";
  let openedConnections = "Carregando...";

  if (!isLoading && data) {
    version = data.dependencies.database.version;
    maxConnections = data.dependencies.database.max_connections;
    openedConnections = data.dependencies.database.opened_connections;
  }

  return (
    <div>
      <p>Informações sobre o banco de dados:</p>
      <ul>
        <li>
          Versão do Postgres: <strong>{version}</strong>
        </li>
        <li>
          Número máximo de conexões: <strong>{maxConnections}</strong>
        </li>
        <li>
          Conexões abertas: <strong>{openedConnections}</strong>
        </li>
      </ul>
    </div>
  );
}
