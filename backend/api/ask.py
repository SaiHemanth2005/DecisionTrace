from fastapi import APIRouter

from models.schemas import AskRequest, AskResponse
from services.hindsight_service import HindsightService

router = APIRouter()

hindsight_service = HindsightService()


@router.post("/", response_model=AskResponse)
def ask_question(request: AskRequest):

    answer = hindsight_service.reflect(
        request.question
    )

    return AskResponse(
        answer=str(answer)
    )
