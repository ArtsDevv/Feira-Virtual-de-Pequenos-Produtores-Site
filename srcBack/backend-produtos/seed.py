import requests

# A URL da sua API que já deve estar rodando (uvicorn)
URL_API = "http://127.0.0.1:8000/produtos"

# Lista baseada nos seus 36 produtos (complete com os outros itens)
produtos_para_migrar = [
    {
        "nome": "Pêssego",
        "categoria": "Hortifruti",
        "preco": 12.50,
        "unidade_medida": "kg",
        "descricao": "Pêssegos frescos e suculentos.",
        "imagem_url": "../assets/pessego.jpg"
    },
    {
        "nome": "Morango",
        "categoria": "Hortifruti",
        "preco": 8.00,
        "unidade_medida": "bandeja",
        "descricao": "Morangos orgânicos selecionados.",
        "imagem_url": "../assets/morango.jpg"
    },
    # ADICIONE OS OUTROS 34 ITENS AQUI SEGUINDO O MESMO PADRÃO
]

def migrar():
    print(f"Iniciando a migração de {len(produtos_para_migrar)} produtos...")
    for item in produtos_para_migrar:
        response = requests.post(URL_API, json=item)
        if response.status_code == 200:
            print(f"Sucesso: {item['nome']} cadastrado.")
        else:
            print(f"Erro ao cadastrar {item['nome']}: {response.text}")

if __name__ == "__main__":
    migrar()