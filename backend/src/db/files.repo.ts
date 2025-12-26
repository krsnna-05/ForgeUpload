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
  async createFileRecord(file: BasicFileRecord): Promise<void> {
    const query = `
      INSERT INTO files (id, original_name, stored_path, mime_type, size)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [
      file.id,
      file.originalName,
      file.storedPath,
      file.mimeType,
      file.size,
    ];

    const res = await pool.query(query, values);

    console.log("File record created:", res);
  }

  async getFileById(id: string): Promise<BasicFileRecord | null> {
    const query = `
      SELECT id, original_name, stored_path, mime_type, size
      FROM files
      WHERE id = $1
    `;
    const values = [id];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0] as BasicFileRecord;
  }

  async getFiles(page: number, limit: number): Promise<BasicFileRecord[]> {
    const offset = (page - 1) * limit;
    const query = `
      SELECT id, original_name, stored_path, mime_type, size
      FROM files
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;
    const values = [limit, offset];

    const result = await pool.query(query, values);

    return result.rows as BasicFileRecord[];
  }

  async deleteFileById(id: string): Promise<void> {
    const query = `
        DELETE FROM files
        WHERE id = $1
    `;
    const values = [id];

    await pool.query(query, values);
  }
}

export default new FilesRepo();
