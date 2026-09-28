from fastapi import APIRouter

from models.schemas import ReviewRequest, ReviewResponse
from services.hindsight_service import HindsightService

router = APIRouter()


@router.post("/", response_model=ReviewResponse)
def review_decision(request: ReviewRequest):

    hindsight = HindsightService()

    prompt = f"""
You are DecisionTrace, an organizational decision-memory agent.

Review the team's historical decisions stored in Hindsight.

New information:
{request.new_information}

Analyze whether this new information conflicts with assumptions,
reasoning, or evidence behind any previous decision.

If you find a potentially affected decision, explain:

1. The original decision
2. The original reasoning or assumption
3. The new information
4. Why they may conflict
5. Whether human review should be considered

Do not automatically change or reject any decision.
Only identify potential decision decay.

If there is no meaningful conflict, explain that clearly.
"""

    result = hindsight.reflect(prompt)

    analysis = getattr(result, "text", str(result))

    return ReviewResponse(
        message="Decision review completed using Hindsight.",
        review_required=True,
        analysis=analysis
    )