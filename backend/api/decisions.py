from fastapi import APIRouter

from models.schemas import DecisionRequest, DecisionResponse
from ai.decision_agent import DecisionAgent

router = APIRouter()

agent = DecisionAgent()

decisions = []


@router.post("/", response_model=DecisionResponse)
def create_decision(request: DecisionRequest):
    result = agent.save_decision(
        decision=request.decision,
        reason=request.reason,
        assumptions=request.assumptions,
        alternatives=request.alternatives,
        stakeholders=request.stakeholders
    )

    decisions.append({
        "decision": request.decision,
        "reason": request.reason,
        "assumptions": request.assumptions,
        "alternatives": request.alternatives,
        "stakeholders": request.stakeholders
    })

    return DecisionResponse(
        message=result["message"],
        decision=request.decision
    )


@router.get("/")
def get_decisions():
    return {
        "decisions": decisions
    }
