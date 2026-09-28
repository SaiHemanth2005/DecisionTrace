from fastapi import FastAPI

from api import decisions
from api import ask
from api import review

app = FastAPI(
    title="DecisionTrace API",
    description="AI-powered organizational decision memory system",
    version="1.0.0"
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


@app.get("/")
def root():
    return {
        "message": "DecisionTrace backend is running"
    }
