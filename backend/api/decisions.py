from fastapi import APIRouter

from models.schemas import DecisionRequest, DecisionResponse

router = APIRouter()

decisions = []


@router.post("/", response_model=DecisionResponse)
def create_decision(request: DecisionRequest):
    decision_data = {
        "decision": request.decision,
        "reason": request.reason,
        "assumptions": request.assumptions,
        "alternatives": request.alternatives,
        "stakeholders": request.stakeholders
    }

    decisions.append(decision_data)

    return DecisionResponse(
        message="Decision created successfully",
        decision=request.decision
    )


@router.get("/")
def get_decisions():
    return {
        "decisions": decisions
    }
