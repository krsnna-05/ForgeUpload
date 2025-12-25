# ForgeUpload

## Overview

ForgeUpload is a **learning-focused file upload system** that explores how production applications handle uploads without blocking the backend.
The project is intentionally scoped to **Phase 1**, focusing on correctness, clarity, and system design fundamentals.

The goal is to build a reliable **local upload pipeline** with background processing and clear progress visibility.

---

## Phase 1 — Local Upload Pipeline (Current Scope)

In Phase 1, ForgeUpload allows a single user to upload files and manage them through a simple interface.

### What the system does

- Files are uploaded from the client to the server
- Files are stored temporarily on the local filesystem
- Each file upload creates an independent background job
- A worker processes uploads asynchronously
- Upload progress and status are tracked per file
- Uploaded files are listed with basic metadata
- Files can be viewed or deleted

### Key characteristics

- Upload requests return immediately
- Long-running work is handled outside the API
- Multiple files can be uploaded concurrently
- Each upload is isolated and independently tracked

This phase validates the **core mental model**:
uploads should be observable, non-blocking, and resilient.

---

## Architecture (Phase 1)

- API server handles HTTP requests and metadata
- Background worker processes upload jobs
- Redis is used for job queuing and progress tracking
- PostgreSQL stores durable upload metadata
- Files are stored locally on the server

The frontend is intentionally minimal and exists only to demonstrate the workflow.

---

## Future Direction (Phase 2 — Concept Only)

The architecture is designed to evolve toward external storage and production-style uploads without changing the user experience.
This future phase is **planned**, not implemented, and documented only at a high level.

---

## Project Intent

ForgeUpload is not a feature-heavy application.
It is a **systems-oriented project** focused on understanding and learning:

- asynchronous workflows
- background job processing
- concurrent uploads
- clean separation of responsibilities
