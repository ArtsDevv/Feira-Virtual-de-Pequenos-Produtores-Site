import urllib.parse
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from pydantic import BaseModel

minha_senha_real = "arth03092002@" 
senha_codificada = urllib.parse.quote_plus(minha_senha_real)
URL_BANCO_DADOS = f"mysql+pymysql://root:{senha_codificada}@127.0.0.1:3306/feira_virtual"

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

class ProdutoCreate(BaseModel):
    nome: str
    categoria: str
    preco: float
    unidade_medida: str
    descricao: str


Base.metadata.create_all(bind=engine)

app = FastAPI(title="API Feira Virtual")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/produtos")
def listar_produtos(db: Session = Depends(get_db)):
    produtos = db.query(Produto).all()
    return produtos

@app.post("/produtos")
def criar_produto(produto: ProdutoCreate, db: Session = Depends(get_db)):
    novo_produto = Produto(
        nome=produto.nome,
        categoria=produto.categoria,
        preco=produto.preco,
        unidade_medida=produto.unidade_medida,
        descricao=produto.descricao
    )
    db.add(novo_produto)
    db.commit() 
    db.refresh(novo_produto) 
    return {"mensagem": "Produto cadastrado com sucesso!", "produto": novo_produto}