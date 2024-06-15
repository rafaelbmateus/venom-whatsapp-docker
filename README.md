# Venom WhastApp

Projeto com Venom para enviar whatsapp dockerizado.

https://github.com/orkestral/venom

Executando o projeto:

```console
make build run
```

Enviando uma mensagem:

```
curl -X POST http://localhost:3000/messages \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "5548999222771",
    "message": "Nova mensagem!"
  }'
```
