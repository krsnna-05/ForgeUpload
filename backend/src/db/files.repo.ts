import pool from ".";

export interface BasicFileRecord {
  id: string;
  originalName: string;
  storedPath: string;
  mimeType: string;
  size: number;
  createdAt?: Date;
}

class FilesRepo {
  // CREATE
  async create(file: BasicFileRecord): Promise<void> {
    await pool.query(
      `
      INSERT INTO files (id, original_name, stored_path, mime_type, size)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [file.id, file.originalName, file.storedPath, file.mimeType, file.size]
    );
  }

  // READ (single)
  async getById(id: string): Promise<BasicFileRecord | null> {
    const result = await pool.query(
      `
      SELECT
        id,
        original_name AS "originalName",
        stored_path AS "storedPath",
        mime_type AS "mimeType",
        size,
        created_at AS "createdAt"
      FROM files
      WHERE id = $1
      `,
      [id]
    );

    return result.rows[0] ?? null;
  }

  // READ (paginated)
  async list(page: number, limit: number): Promise<BasicFileRecord[]> {
    const safeLimit = Math.min(Math.max(limit, 1), 50);
    const safePage = Math.max(page, 1);
    const offset = (safePage - 1) * safeLimit;

    const result = await pool.query(
      `
      SELECT
        id,
        original_name AS "originalName",
        stored_path AS "storedPath",
        mime_type AS "mimeType",
        size,
        created_at AS "createdAt"
      FROM files
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
      `,
      [safeLimit, offset]
    );

    return result.rows;
  }

  // DELETE (DB only)
  async deleteById(id: string): Promise<void> {
    await pool.query("DELETE FROM files WHERE id = $1", [id]);
  }
}

export default new FilesRepo();
