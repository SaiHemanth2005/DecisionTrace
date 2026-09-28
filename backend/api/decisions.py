from fastapi import APIRouter

from models.schemas import DecisionRequest, DecisionResponse
from services.decision_agent import DecisionAgent
from services.hindsight_service import HindsightService

router = APIRouter()

decision_agent = DecisionAgent()
hindsight_service = HindsightService()


@router.post("/", response_model=DecisionResponse)
def create_decision(request: DecisionRequest):

    processed_decision = decision_agent.process_decision(
        request.content
    )

    hindsight_service.store_decision(
        request.content
    )

    return DecisionResponse(
        message="Decision stored successfully",
        decision=processed_decision["decision"]
    )
