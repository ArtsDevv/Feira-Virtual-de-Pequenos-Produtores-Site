from fastapi import FastAPI
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, sessionmaker

import urllib.parse 
senha = urllib.parse.quote_plus("arth03092002@") 
URL_BANCO_DADOS = f"mysql+pymysql://root:{senha}@localhost:3306/feira_virtual"

engine = create_engine(URL_BANCO_DADOS)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Produto(Base):
    __tablename__ = "produtos" 

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100), index=True)
    categoria = Column(String(50))
    preco = Column(Float)
    unidade_medida = Column(String(20))
    descricao = Column(String(500))
    imagem_url = Column(String(255))

Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Feira Virtual - Produtos")

@app.get("/")
def ler_raiz():
    return {"mensagem": "Servidor de Produtos rodando e conectado ao MySQL!"}