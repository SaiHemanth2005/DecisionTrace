from fastapi import APIRouter

from models.schemas import AskRequest, AskResponse

router = APIRouter()


@router.post("/", response_model=AskResponse)
def ask_question(request: AskRequest):
    return AskResponse(
        answer=f"Mock response for question: {request.question}"
    )
