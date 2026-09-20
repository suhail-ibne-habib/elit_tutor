# Elite API

Tuition board backend. Auth is Better Auth (email/password) with roles `parent`, `teacher`, and `admin`.

## Run

```bash
cd server
npm start
```

API: `http://localhost:8000`

Put your admin email in `ADMIN_EMAILS` in `.env` so that account is created as admin.

## Auth

Sign up with Better Auth at `/api/auth/sign-up/email` and include `role`:

- `parent` — can post tuitions
- `teacher` — can open a profile and apply
- admin is assigned from `ADMIN_EMAILS`, not from signup

## Endpoints

| Method | Path | Who |
| --- | --- | --- |
| GET | `/api/session/me` | signed in |
| GET | `/api/tuitions` | public |
| POST | `/api/tuitions` | parent, admin |
| GET | `/api/tuitions/mine` | parent, admin |
| PATCH/DELETE | `/api/tuitions/:id` | owner or admin |
| POST | `/api/tuitions/:id/applications` | teacher |
| GET | `/api/tuitions/:id/applications` | owner or admin |
| GET | `/api/applications/me` | teacher |
| PATCH | `/api/applications/:id` | owner or admin |
| GET | `/api/teachers` | public |
| GET/PUT | `/api/teachers/me` | teacher |
| GET | `/api/teachers/:userId` | public |
