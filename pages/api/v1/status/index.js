import database from "infra/database.js";

async function status(req, resp) {
  const updatedAt = new Date().toISOString();
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseMaxConectionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseName = process.env.POSTGRES_DB;
  const databaseOpenedConnectionsResult = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseVersionValue = databaseVersionResult.rows[0].server_version;
  const databaseMaxConnectionsValue = parseInt(
    databaseMaxConectionsResult.rows[0].max_connections,
  );
  const databaseOpenedConnectionsValue =
    databaseOpenedConnectionsResult.rows[0].count;

  resp.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        opened_connections: databaseOpenedConnectionsValue,
        max_connections: databaseMaxConnectionsValue,
        version: databaseVersionValue,
      },
    },
  });
}

export default status;
