from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api import decisions
from api import ask
from api import review
app = FastAPI(
    title="DecisionTrace API",
    description="AI-powered organizational decision memory system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    decisions.router,
    prefix="/decisions",
    tags=["Decisions"]
)

app.include_router(
    ask.router,
    prefix="/ask",
    tags=["Ask"]
)

app.include_router(
    review.router,
    prefix="/review",
    tags=["Review"]
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "DecisionTrace backend"
    }
