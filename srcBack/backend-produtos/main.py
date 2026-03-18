import urllib.parse
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from pydantic import BaseModel
from typing import List
from typing import Optional

minha_senha_real = "arth03092002@" 
senha_codificada = urllib.parse.quote_plus(minha_senha_real)
URL_BANCO_DADOS = f"mysql+pymysql://root:{senha_codificada}@127.0.0.1:3306/feira_virtual"

engine = create_engine(URL_BANCO_DADOS)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Produto(Base):
    __tablename__ = "produtos"
    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(100))
    categoria = Column(String(50))
    preco = Column(Float)
    unidade_medida = Column(String(20))
    descricao = Column(String(500))
    imagem_url = Column(String(255))

class ProdutoBase(BaseModel):
    nome: str
    categoria: str
    preco: float
    unidade_medida: str
    descricao: str
    imagem_url: Optional[str] = None

class ProdutoResponse(ProdutoBase):
    id: int
    class Config:
        from_attributes = True

app = FastAPI(title="API Feira Virtual")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/produtos", response_model=List[ProdutoResponse])
def listar_produtos(db: Session = Depends(get_db)):
    return db.query(Produto).all()

@app.post("/produtos", response_model=ProdutoResponse)
def criar_produto(produto: ProdutoBase, db: Session = Depends(get_db)):
    novo_produto = Produto(**produto.dict())
    db.add(novo_produto)
    db.commit()
    db.refresh(novo_produto)
    return novo_produto

@app.delete("/produtos/{produto_id}")
def deletar_produto(produto_id: int, db: Session = Depends(get_db)):
    # 1. Procura o produto no banco
    produto_para_deletar = db.query(Produto).filter(Produto.id == produto_id).first()
    
    # 2. Se não achar, avisa que deu erro
    if not produto_para_deletar:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    # 3. Se achar, deleta e salva a alteração
    db.delete(produto_para_deletar)
    db.commit()
    return {"mensagem": f"Produto com ID {produto_id} foi removido da feira!"}

