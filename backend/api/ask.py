from fastapi import APIRouter

from models.schemas import AskRequest, AskResponse
from ai.decision_agent import DecisionAgent

router = APIRouter()

agent = DecisionAgent()


@router.post("/", response_model=AskResponse)
def ask_question(request: AskRequest):
    answer = agent.ask(request.question)

    return AskResponse(
        answer=answer
    )
