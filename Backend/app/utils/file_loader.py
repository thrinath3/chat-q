from fastapi import UploadFile
from pypdf import PdfReader
import io

async def read_file(file: UploadFile):
    content = await file.read()
    # TXT files
    if file.filename.endswith(".txt"):
        return content.decode("utf-8")
    # PDF files
    elif file.filename.endswith(".pdf"):
        pdf = PdfReader(io.BytesIO(content))
        text = ""
        for page in pdf.pages:
            text += page.extract_text() or ""
        return text
    else:
        raise ValueError("Unsupported file type. Only .txt and .pdf allowed.")