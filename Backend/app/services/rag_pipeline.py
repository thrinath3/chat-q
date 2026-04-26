from app.services.embedding_service import get_embeddings
from app.services.vector_db import query_embeddings
from app.services.gemini_service import generate_answer

def handle_query(question: str):
    # convert question to embedding
    query_embedding = get_embeddings([question])[0]
    # retrieve relevant chunks
    relevant_chunks = query_embeddings(query_embedding)
    # combine chunks into context
    context = "\n".join(relevant_chunks)
    # generate answer
    answer = generate_answer(context, question)
    return answer