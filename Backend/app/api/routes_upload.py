# from fastapi import APIRouter, UploadFile, File
# from app.utils.file_loader import read_file
# from app.utils.text_splitter import split_text
# from app.services.embedding_service import get_embeddings
# from app.services.vector_db import store_embeddings

# router = APIRouter()
# @router.post("/upload")
# async def upload_file(file: UploadFile = File(...)):
#     text = await read_file(file)
#     chunks = split_text(text)
#     embeddings = get_embeddings(chunks)
#     store_embeddings(chunks, embeddings)
#     return {
#         "filename": file.filename,
#         "chunks_stored": len(chunks)
#     }

from fastapi import APIRouter, UploadFile, File
from app.utils.file_loader import read_file
from app.utils.text_splitter import split_text
from app.services.embedding_service import get_embeddings
from app.services.vector_db import reset_collection, store_embeddings

router = APIRouter()
@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    reset_collection()                      # 1. reset old file on upload
    text = await read_file(file)            # 2. read new file
    chunks = split_text(text)               # 3. splitting into chunks
    embeddings = get_embeddings(chunks)     # 4. create embeddings
    store_embeddings(chunks, embeddings)    # 5. storing current file data
    return {
        "filename": file.filename,
        "chunks_stored": len(chunks),
        "message": "File uploaded and indexed successfully (old data cleared)"
    }