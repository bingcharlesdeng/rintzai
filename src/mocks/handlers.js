import { rest } from 'msw'

export const handlers = [
  rest.get('/api/profile', (req, res, ctx) => {
    return res(
      ctx.json({
        name: 'John Doe',
        tagline: 'Mental health enthusiast',
        avatarUrl: 'https://example.com/avatar.jpg',
      })
    )
  }),

  rest.post('/api/journal-entry', (req, res, ctx) => {
    return res(
      ctx.json({
        id: '123',
        title: req.body.title,
        content: req.body.content,
        date: new Date().toISOString(),
      })
    )
  }),
]