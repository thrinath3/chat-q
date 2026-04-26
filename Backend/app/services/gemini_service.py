from google import genai
import os

# create client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def generate_answer(context: str, question: str):
    prompt = f"""
You are an AI assistant. Answer ONLY from the provided context.
If answer is not in context, say "I don't know".

Context:
{context}

Question:
{question}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )

    return response.text