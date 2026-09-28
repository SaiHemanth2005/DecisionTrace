from fastapi import APIRouter
from models.schemas import DecisionRequest, DecisionResponse

router = APIRouter()


@router.post("/", response_model=DecisionResponse)
def create_decision(request: DecisionRequest):
    return DecisionResponse(
        message="Decision received successfully",
        decision=request.content
    )
