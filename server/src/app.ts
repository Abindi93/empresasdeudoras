import cors from 'cors';
import express from 'express';
import {
  findCompany,
  findStory,
  listCompanies,
  listCompanyStories,
  listSubmissions,
  listStories,
  saveSubmission,
  type StorySort,
  updateSubmissionStatus,
} from './store.js';
import { submissionSchema } from './validation.js';

const sortValues = new Set<StorySort>(['recientes', 'comentadas', 'pendientes', 'resueltas']);
const submissionStatusValues = new Set(['pending-review', 'approved', 'rejected']);

function authenticatedAdmin(request: express.Request) {
  const configuredUsername = process.env.ADMIN_USERNAME;
  const configuredPassword = process.env.ADMIN_PASSWORD;
  const header = request.header('authorization');

  if (!configuredUsername || !configuredPassword || !header?.startsWith('Basic ')) return undefined;

  try {
    const [username, password] = Buffer.from(header.slice(6), 'base64').toString('utf8').split(':');
    return username === configuredUsername && password === configuredPassword ? username : undefined;
  } catch {
    return undefined;
  }
}

function requireAdmin(request: express.Request, response: express.Response) {
  const username = authenticatedAdmin(request);
  if (username) return username;

  response.setHeader('WWW-Authenticate', 'Basic realm="Panel de revisión"');
  response.status(401).json({ error: 'Credenciales de administrador requeridas.' });
  return undefined;
}

export function createApp() {
  const app = express();
  const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.use(cors({ origin: allowedOrigins }));
  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok', service: 'empresasdeudoras-api' });
  });

  app.get('/api/stories', async (request, response, next) => {
    const sort = typeof request.query.sort === 'string' && sortValues.has(request.query.sort as StorySort)
      ? request.query.sort as StorySort
      : 'recientes';
    try {
      response.json(await listStories({
        q: typeof request.query.q === 'string' ? request.query.q : undefined,
        category: typeof request.query.category === 'string' ? request.query.category : undefined,
        country: typeof request.query.country === 'string' ? request.query.country : undefined,
        city: typeof request.query.city === 'string' ? request.query.city : undefined,
        sort,
      }));
    } catch (error) {
      next(error);
    }
  });

  app.get('/api/stories/:slug', (request, response) => {
    const story = findStory(request.params.slug);
    if (!story) return response.status(404).json({ error: 'Historia no encontrada.' });
    return response.json(story);
  });

  app.get('/api/companies', (_request, response) => {
    response.json(listCompanies());
  });

  app.get('/api/companies/:slug', (request, response) => {
    const company = findCompany(request.params.slug);
    if (!company) return response.status(404).json({ error: 'Empresa no encontrada.' });
    return response.json(company);
  });

  app.get('/api/companies/:slug/stories', (request, response) => {
    if (!findCompany(request.params.slug)) return response.status(404).json({ error: 'Empresa no encontrada.' });
    return response.json(listCompanyStories(request.params.slug));
  });

  app.post('/api/submissions', async (request, response, next) => {
    try {
      const parsed = submissionSchema.safeParse(request.body);
      if (!parsed.success) {
        return response.status(422).json({
          error: 'Revisa los datos del testimonio.',
          fields: parsed.error.flatten().fieldErrors,
        });
      }

      const submission = await saveSubmission(parsed.data);
      return response.status(201).json({
        id: submission.id,
        status: submission.status,
        receivedAt: submission.receivedAt,
      });
    } catch (error) {
      return next(error);
    }
  });

  app.get('/api/admin/submissions', async (request, response, next) => {
    const username = requireAdmin(request, response);
    if (!username) return;

    const status = typeof request.query.status === 'string' && submissionStatusValues.has(request.query.status)
      ? request.query.status as 'pending-review' | 'approved' | 'rejected'
      : undefined;
    try {
      return response.json(await listSubmissions(status));
    } catch (error) {
      return next(error);
    }
  });

  app.patch('/api/admin/submissions/:id', async (request, response, next) => {
    const username = requireAdmin(request, response);
    if (!username) return;

    const status = request.body?.status;
    if (typeof status !== 'string' || !submissionStatusValues.has(status)) {
      return response.status(422).json({ error: 'Estado de revisión inválido.' });
    }

    try {
      const submission = await updateSubmissionStatus(
        request.params.id,
        status as 'pending-review' | 'approved' | 'rejected',
        username,
      );
      if (!submission) return response.status(404).json({ error: 'Testimonio no encontrado.' });
      return response.json(submission);
    } catch (error) {
      return next(error);
    }
  });

  app.use((error: Error, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
    console.error(error);
    response.status(500).json({ error: 'No fue posible procesar la solicitud.' });
  });

  return app;
}
