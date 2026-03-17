from fastapi import FastAPI
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, sessionmaker

# 1. Configurando a conexão com o MySQL
# Formato: mysql+pymysql://usuario:senha@servidor:porta/nome_do_banco
URL_BANCO_DADOS = "mysql+pymysql://root:arth03092002@@localhost:3306/feira_virtual"

# Criando o motor de conexão (sem as travas do SQLite)
engine = create_engine(URL_BANCO_DADOS)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 2. A "Mágica" do ORM: Transformando Classe em Tabela SQL
class Produto(Base):
    __tablename__ = "produtos" # Nome da tabela no MySQL

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String, index=True)
    categoria = Column(String)
    preco = Column(Float)
    unidade_medida = Column(String)
    descricao = Column(String)
    imagem_url = Column(String)

# 3. Comando que avisa o Python para ir no MySQL e criar as tabelas
Base.metadata.create_all(bind=engine)

# 4. Iniciando a nossa API
app = FastAPI(title="API Feira Virtual - Produtos")

@app.get("/")
def ler_raiz():
    return {"mensagem": "Servidor de Produtos rodando e conectado ao MySQL!"}