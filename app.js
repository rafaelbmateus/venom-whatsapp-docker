const express = require('express');
const venom = require('venom-bot');

const app = express();
const port = 3000;

app.use(express.json());

venom
  .create(
    'session',
    () => {},
    () => {},
    {
      browserArgs: ['--no-sandbox'],
    }
  )
  .then((client) => {
    app.post('/messages', async (req, res) => {
      const { phoneNumber, message } = req.body;

      if (!phoneNumber || !message) {
        return res.status(400).send({ error: 'Número de telefone e mensagem são obrigatórios' });
      }

      try {
        const result = await client.sendText(phoneNumber + '@c.us', message);
        res.send({ status: 'Mensagem enviada com sucesso', result });
      } catch (error) {
        console.error('Erro ao enviar mensagem: ', error);
        res.status(500).send({ error: 'Erro ao enviar mensagem', details: error });
      }
    });

    client.onMessage(async (message) => {
      console.log(`received ${message.body}`);
      try {
        if (message.body === 'Hi') {
          const result = await client.sendText(
            message.from,
            `Hi ${message.sender.shortName}`
          );
          console.log(result.status);
        }
      } catch (error) {
        console.log(error);
      }
    });

    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
