# MetabaseEmbedding
Neste exemplo, subimos um docker compose contendo a imagem docker oficial do Metabase e também do PostgreSql.
Por padrão, a interface web fica disponivel da porta 3000.

```bash
docker compose up
```

Depois disso, basta configurar o metabase para permitir o Static Embedding e pegar a SecretKey para usar na ASP.NET Core Web API para gerar o token JWT que vai compor a URL.

O token JWT guarda nas Claims a informação de qual Dashboard ou Question será usada.

Essa URL utilza o endereço do metabase, com o dashboard ou a questions, o token JWT para autenticação e os parametros de personalização de estilo, como mostrado no exemplo abaixo:

```
http://localhost:3000/embed/dashboard/eyJhb...Gt3o#theme=night&bordered=true&titled=true
```

Por final, basta subir a aplicação front end em React e consumir o endpoint da API para obter a URL e utilizar no iframe.

```js
useEffect(() => {
    fetch("https://localhost:7292/api/metabase/signed-url")
      .then(res => {
        return res.json();
      });
  }, []);

  return (
    <iframe
      src={url}
      frameBorder="0"
      style={{ width: "100vw", height: "100vh" }}
      allowTransparency
    />
  );
```