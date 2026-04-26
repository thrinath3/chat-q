from fastapi import APIRouter
from pydantic import BaseModel
from app.services.rag_pipeline import handle_query
router = APIRouter()

class ChatRequest(BaseModel):
    question: str

@router.post("/chat")
def chat(request: ChatRequest):
    answer = handle_query(request.question)

    return {
        "question": request.question,
        "answer": answer
    }