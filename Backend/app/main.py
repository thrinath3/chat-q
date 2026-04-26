from dotenv import load_dotenv
load_dotenv() 
from fastapi import FastAPI
from app.api import routes_chat, routes_upload
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="AI Notes Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# include routes
app.include_router(routes_chat.router)
app.include_router(routes_upload.router)


@app.get("/")
def root():
    return {"message": "Backend is running..."}