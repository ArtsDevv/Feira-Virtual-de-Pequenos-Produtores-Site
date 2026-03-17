import requests

# A URL da sua API que já deve estar rodando (uvicorn)
URL_API = "http://127.0.0.1:8000/produtos"

# 36 Produtos Testes
produtos_para_migrar = [
    {"nome": "Pêssego", "categoria": "hortifruti", "preco": 4.00, "unidade_medida": "un", "descricao": "Pêssego.", "imagem_url": "../assets/Pessego.jpg"},
    {"nome": "Pêra", "categoria": "hortifruti", "preco": 2.00, "unidade_medida": "un", "descricao": "Pera.", "imagem_url": "../assets/pera.jpg"},
    {"nome": "Uva", "categoria": "hortifruti", "preco": 3.00, "unidade_medida": "un", "descricao": "Uva.", "imagem_url": "../assets/uva.jpg"},
    {"nome": "Pera", "categoria": "hortifruti", "preco": 3.00, "unidade_medida": "un", "descricao": "Pera.", "imagem_url": "../assets/pera.jpg"},
    {"nome": "Caju", "categoria": "hortifruti", "preco": 3.00, "unidade_medida": "un", "descricao": "Caju.", "imagem_url": "../assets/caju.jpg"},
    {"nome": "Limão", "categoria": "hortifruti", "preco": 0.10, "unidade_medida": "un", "descricao": "Limão.", "imagem_url": "../assets/limao.jpeg"},
    {"nome": "Milho Verde", "categoria": "hortifruti", "preco": 0.80, "unidade_medida": "un", "descricao": "Milho Verde.", "imagem_url": "../assets/corn.png"},
    {"nome": "Goiaba", "categoria": "hortifruti", "preco": 3.00, "unidade_medida": "un", "descricao": "Goiaba.", "imagem_url": "../assets/goiaba.png"},
    {"nome": "Banana Prata", "categoria": "hortifruti", "preco": 3.00, "unidade_medida": "un", "descricao": "Banana Prata.", "imagem_url": "../assets/banana_prata.jpg"},
    {"nome": "Acerola", "categoria": "hortifruti", "preco": 3.80, "unidade_medida": "un", "descricao": "Acerola.", "imagem_url": "../assets/acerola.png"},
    {"nome": "Laranja", "categoria": "hortifruti", "preco": 3.00, "unidade_medida": "un", "descricao": "Laranja.", "imagem_url": "../assets/laranja.jpeg"},
    {"nome": "Mamão", "categoria": "hortifruti", "preco": 6.00, "unidade_medida": "un", "descricao": "Mamão.", "imagem_url": "../assets/mamao.jpg"},
    {"nome": "Doce de Leite Caseiro", "categoria": "mercearia", "preco": 15.00, "unidade_medida": "un", "descricao": "Doce de Leite.", "imagem_url": "../assets/pagina-padrao/Pagina-Mercearia/doce-de-leite1.jpg"},
    {"nome": "Doce de Leite Cremoso", "categoria": "mercearia", "preco": 11.00, "unidade_medida": "un", "descricao": "Doce de Leite.", "imagem_url": "../assets/pagina-padrao/Pagina-Mercearia/doce-de-leite2.jpg"},
    {"nome": "Doce de Leite no Pote", "categoria": "mercearia", "preco": 13.50, "unidade_medida": "un", "descricao": "Doce de Leite.", "imagem_url": "../assets/pagina-padrao/Pagina-Mercearia/doce-de-leite3.jpg"},
    {"nome": "Doce de Leite dos deuses", "categoria": "mercearia", "preco": 11.00, "unidade_medida": "un", "descricao": "Doce de Leite.", "imagem_url": "../assets/pagina-padrao/Pagina-Mercearia/doce-de-leite3.jpg"},
    {"nome": "Manteiga Fresca", "categoria": "mercearia", "preco": 11.50, "unidade_medida": "un", "descricao": "Manteiga.", "imagem_url": "../assets/pagina-padrao/Pagina-Mercearia/manteiga.jpg"},
    {"nome": "Manteiga Cremosa", "categoria": "mercearia", "preco": 9.50, "unidade_medida": "un", "descricao": "Manteiga.", "imagem_url": "../assets/pagina-padrao/Pagina-Mercearia/manteiga-cremosa.jpg"},
    {"nome": "Manteiga em Cubo", "categoria": "mercearia", "preco": 14.00, "unidade_medida": "un", "descricao": "Manteiga.", "imagem_url": "../assets/pagina-padrao/Pagina-Mercearia/manteiga-em-cubo.jpg"},
    {"nome": "Manteiga Caseira", "categoria": "mercearia", "preco": 8.50, "unidade_medida": "un", "descricao": "Manteiga.", "imagem_url": "../assets/pagina-padrao/Pagina-Mercearia/manteiga1.jpg"},
    {"nome": "Pão Caseiro", "categoria": "mercearia", "preco": 10.00, "unidade_medida": "un", "descricao": "Pão.", "imagem_url": "../assets/pagina-padrao/Pagina-Mercearia/pao-caseiro.jpg"},
    {"nome": "Pão Salgado", "categoria": "mercearia", "preco": 15.50, "unidade_medida": "un", "descricao": "Pão.", "imagem_url": "../assets/pagina-padrao/Pagina-Mercearia/pao-caseiro1.jpg"},
    {"nome": "Pão Doce", "categoria": "mercearia", "preco": 8.50, "unidade_medida": "un", "descricao": "Pão.", "imagem_url": "../assets/pagina-padrao/Pagina-Mercearia/pao-doce.jpg"},
    {"nome": "Pão Doce Cremoso", "categoria": "mercearia", "preco": 15.00, "unidade_medida": "un", "descricao": "Pão.", "imagem_url": "../assets/pagina-padrao/Pagina-Mercearia/pao-caseiro2.jpg"},
    {"nome": "Boneca de Pano", "categoria": "artesanato", "preco": 28.00, "unidade_medida": "un", "descricao": "Boneca.", "imagem_url": "../assets/boneca-de-pano.webp"},
    {"nome": "Cesta de Palha", "categoria": "artesanato", "preco": 22.00, "unidade_medida": "un", "descricao": "Cesta.", "imagem_url": "../assets/cesta-de-palha.jpg"},
    {"nome": "Vaso de Cerâmica", "categoria": "artesanato", "preco": 18.50, "unidade_medida": "un", "descricao": "Vaso.", "imagem_url": "../assets/pagina-padrao/Pagina-Mercearia/pao-caseiro2.jpg"},
    {"nome": "Porta Treco", "categoria": "artesanato", "preco": 9.00, "unidade_medida": "un", "descricao": "Porta Treco.", "imagem_url": "../assets/porta-treco.webp"},
    {"nome": "Jogo de Tecido", "categoria": "artesanato", "preco": 15.00, "unidade_medida": "un", "descricao": "Jogo.", "imagem_url": "../assets/jogo-americano-em-tecido.webp"},
    {"nome": "Caixote para Jardim", "categoria": "artesanato", "preco": 25.00, "unidade_medida": "un", "descricao": "Caixote.", "imagem_url": "../assets/caixote-para-jardim-vertical.webp"},
    {"nome": "Pulseira de Croche", "categoria": "artesanato", "preco": 5.00, "unidade_medida": "un", "descricao": "Pulseira.", "imagem_url": "../assets/pulseira-de-croche.jpg"},
    {"nome": "Filtro de Barro", "categoria": "artesanato", "preco": 32.00, "unidade_medida": "un", "descricao": "Filtro.", "imagem_url": "../assets/filtrodebarro.jpeg"},
    {"nome": "Pano de Prato", "categoria": "artesanato", "preco": 6.00, "unidade_medida": "un", "descricao": "Pano.", "imagem_url": "../assets/panodeprato.jpg"},
    {"nome": "Prateleiro", "categoria": "artesanato", "preco": 18.00, "unidade_medida": "un", "descricao": "Prateleiro.", "imagem_url": "../assets/prateleiro.webp"},
    {"nome": "Passarinho", "categoria": "artesanato", "preco": 5.00, "unidade_medida": "un", "descricao": "Enfeite.", "imagem_url": "../assets/passarinho.webp"},
    {"nome": "Mini Tábua de Corte", "categoria": "artesanato", "preco": 16.00, "unidade_medida": "un", "descricao": "Tábua.", "imagem_url": "../assets/minitabuadecorte.webp"}
]

def migrar():
    print(f"Iniciando a migração de {len(produtos_para_migrar)} produtos...")
    for item in produtos_para_migrar:
        try:
            response = requests.post(URL_API, json=item)
            if response.status_code == 200:
                print(f"✅ Sucesso: {item['nome']}")
            else:
                print(f"❌ Erro ao cadastrar {item['nome']}: {response.text}")
        except Exception as e:
            print(f"❗ Falha de conexão: {e}")

if __name__ == "__main__":
    migrar()