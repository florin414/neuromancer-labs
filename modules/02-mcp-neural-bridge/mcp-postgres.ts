import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import pg from "pg";
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(__dirname, '../../.env'); 
dotenv.config({ path: envPath });

const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.POSTGRES_DB,
});

const server = new McpServer({
  name: String(process.env.MCP_SERVER_NAME),
  version: String(process.env.MCP_SERVER_VERSION),
});

server.tool(
  "list_tables",
  "return a list of all tables in the public schema of the connected PostgreSQL database.",
  {},
  async () => {
    try {
      const res = await pool.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
      );
      return {
        content: [{ type: "text", text: JSON.stringify(res.rows, null, 2) }],
      };
    } catch (err: any) {
      return { content: [{ type: "text", text: `Error: ${err.message}` }] };
    }
  }
);


server.tool(
  "get_table_schema",
  "return the schema (columns, types) for a specific table.",
  { tableName: z.string() }, 
  async ({ tableName }) => {
    try {
      const res = await pool.query(
        `SELECT column_name, data_type, is_nullable 
         FROM information_schema.columns 
         WHERE table_name = $1`,
        [tableName]
      );
      return {
        content: [{ type: "text", text: JSON.stringify(res.rows, null, 2) }],
      };
    } catch (err: any) {
      return { content: [{ type: "text", text: `Error: ${err.message}` }] };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running over stdio...");
}

main();