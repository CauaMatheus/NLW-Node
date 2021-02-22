import express from 'express';

const app = express();
app.use(express.json());

app.get('/users', (request, response) => response.json({ message: 'Hello World!' }));

app.post('/', (request, response) => {
  const { name } = request.body;
  return response.json({
    message: `Olá ${name}, Os dados foram salvos com sucesso :D`,
  });
});

app.listen(3333, () => {
  console.log('Server is running');
});
